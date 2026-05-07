// supabase/functions/stripe-webhook/index.ts
// Edge Function segura para validar pagamentos do Stripe
import Stripe from "npm:stripe@14";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2024-06-20",
  httpClient: Stripe.createFetchHttpClient(),
});

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPA_SERVICE_KEY")!;
const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;

// ── Helpers ────────────────────────────────────────────────────────────────

async function upsertSubscription(
  userId: string,
  stripeCustomerId: string,
  expiresAt: Date
) {
  const res = await fetch(`${supabaseUrl}/rest/v1/subscriptions`, {
    method: "POST",
    headers: {
      apikey: supabaseServiceKey,
      Authorization: `Bearer ${supabaseServiceKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify({
      user_id: userId,
      status: "premium",
      activated_at: new Date().toISOString(),
      expires_at: expiresAt.toISOString(),
      stripe_customer_id: stripeCustomerId,
    }),
  });
  if (!res.ok) throw new Error(`Supabase upsert error: ${await res.text()}`);
}

async function findUserByCustomer(stripeCustomerId: string): Promise<string | null> {
  const res = await fetch(
    `${supabaseUrl}/rest/v1/subscriptions?stripe_customer_id=eq.${stripeCustomerId}&select=user_id`,
    {
      headers: {
        apikey: supabaseServiceKey,
        Authorization: `Bearer ${supabaseServiceKey}`,
      },
    }
  );
  const rows = await res.json();
  return rows?.[0]?.user_id ?? null;
}

async function cancelByCustomer(stripeCustomerId: string) {
  await fetch(
    `${supabaseUrl}/rest/v1/subscriptions?stripe_customer_id=eq.${stripeCustomerId}`,
    {
      method: "PATCH",
      headers: {
        apikey: supabaseServiceKey,
        Authorization: `Bearer ${supabaseServiceKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "cancelled" }),
    }
  );
}

function addOneMonth(from = new Date()) {
  const d = new Date(from);
  d.setMonth(d.getMonth() + 1);
  return d;
}

// ── Handler ────────────────────────────────────────────────────────────────

Deno.serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("❌ Webhook signature invalid:", msg);
    return new Response(`Webhook Error: ${msg}`, { status: 400 });
  }

  try {
    switch (event.type) {
      // Primeiro pagamento / assinatura nova
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id;
        const customerId = session.customer as string;

        if (!userId) {
          console.warn("⚠️ checkout.session.completed sem client_reference_id — ignorado");
          break;
        }

        await upsertSubscription(userId, customerId, addOneMonth());
        console.log(`✅ Assinatura ativada: user=${userId}`);
        break;
      }

      // Renovação mensal
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;
        const userId = await findUserByCustomer(customerId);

        if (!userId) {
          console.warn(`⚠️ invoice.payment_succeeded sem user para customer=${customerId}`);
          break;
        }

        await upsertSubscription(userId, customerId, addOneMonth());
        console.log(`✅ Assinatura renovada: customer=${customerId}`);
        break;
      }

      // Cancelamento
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await cancelByCustomer(sub.customer as string);
        console.log(`❌ Assinatura cancelada: customer=${sub.customer}`);
        break;
      }

      default:
        console.log(`ℹ️ Evento ignorado: ${event.type}`);
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("❌ Erro ao processar evento:", msg);
    return new Response(`Processing Error: ${msg}`, { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
