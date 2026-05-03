# Supabase Configuration

To enable Google Authentication, you need to configure your environment variables and the Supabase dashboard.

## 1. Environment Variables

Create or update your `.env` file with the following keys:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

You can find these in your Supabase project under **Project Settings > API**.

## 2. Supabase Dashboard Settings

1. Go to **Authentication > Providers > Google**.
2. Enable the Google provider.
3. Configure your **Client ID** and **Client Secret** (obtained from the Google Cloud Console).
4. Add the following **Authorized JavaScript Origins** in Google Cloud Console:
   - `http://localhost:8080`
   - `https://id-preview--1f83d5a0-1ea3-4a8f-a3e2-ee03b26e762d.lovable.app`
   - `https://curriculos.fun`

5. Add the **Redirect URL** provided by Supabase to your Google Cloud Console project.

## 3. Lovable Cloud Integration

If using Lovable Cloud, ensure the Google provider is also enabled in the Lovable interface under **Auth Settings**.
