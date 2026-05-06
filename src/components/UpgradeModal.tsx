import { Lock, Sparkles, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PLAN_PRICE, PLAN_PERIOD } from "@/lib/subscription";

const BENEFITS = [
  "8 templates exclusivos (Clássico, Executivo, Criativo e mais)",
  "Todos os modelos futuros incluídos",
  "Download em PDF ilimitado",
  "Compartilhamento de link público",
  "Suporte prioritário",
];

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateName?: string;
  paymentUrl?: string;
}

export function UpgradeModal({ open, onOpenChange, templateName, paymentUrl = "#" }: UpgradeModalProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] rounded-2xl p-0 overflow-hidden">
        {/* Header gradient */}
        <div className="bg-gradient-to-br from-[#0F2744] to-[#0D9488] px-6 py-8 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
            <Lock className="h-7 w-7 text-white" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold text-white">
              Template Premium
            </DialogTitle>
          </DialogHeader>
          <p className="mt-1.5 text-sm text-teal-100">
            {templateName
              ? `O template "${templateName}" é exclusivo do plano Premium.`
              : "Este template é exclusivo do plano Premium."}
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="mb-4 text-sm font-semibold text-slate-700">O que está incluído no Premium:</p>
          <ul className="space-y-2.5 mb-6">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5 text-sm text-slate-600">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100">
                  <Check className="h-3 w-3 text-teal-700" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          <div className="mb-5 rounded-2xl border border-teal-100 bg-teal-50 px-4 py-3 text-center">
            <div className="text-2xl font-extrabold text-[#0F2744]">
              {PLAN_PRICE}
              <span className="ml-1 text-sm font-semibold text-slate-500">{PLAN_PERIOD}</span>
            </div>
            <p className="mt-0.5 text-xs text-slate-500">Assinatura mensal · Cancele quando quiser</p>
          </div>

          <div className="flex flex-col gap-2.5">
            {paymentUrl !== "#" ? (
              <a
                href={paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#0D9488] font-bold text-white shadow-md transition-opacity hover:opacity-90"
                onClick={() => onOpenChange(false)}
              >
                <Sparkles className="h-4 w-4" />
                Assinar Premium
              </a>
            ) : (
              <Button
                asChild
                className="h-11 w-full rounded-xl bg-[#0D9488] font-bold text-white shadow-md hover:opacity-90"
                onClick={() => onOpenChange(false)}
              >
                <Link to="/precos">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Ver planos
                </Link>
              </Button>
            )}
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
            >
              Continuar com o plano gratuito
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
