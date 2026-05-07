import { lazy, Suspense, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { HelmetProvider } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
const Landing = lazy(() => import("@/pages/Landing"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Builder = lazy(() => import("@/pages/Builder"));
const CreateResume = lazy(() => import("@/pages/CreateResume"));
const Contact = lazy(() => import("@/pages/Contact"));
const Models = lazy(() => import("@/pages/Models"));
const ModelosProfissao = lazy(() => import("@/pages/ModelosProfissao"));
const PublicResume = lazy(() => import("@/pages/PublicResume"));
const TermsPage = lazy(() =>
  import("@/pages/Legal").then((m) => ({ default: m.TermsPage }))
);
const PrivacyPage = lazy(() =>
  import("@/pages/Legal").then((m) => ({ default: m.PrivacyPage }))
);
const Pricing = lazy(() => import("@/pages/Pricing"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <main
      className="grid min-h-[calc(100vh-4rem)] place-items-center px-4"
      style={{ background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 52%, #F8FAFC 100%)" }}
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-teal-100 border-t-[#0D9488]" />
    </main>
  );
}

function WithNavbar({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WithNavbar><Landing /></WithNavbar>} />
            <Route path="/criar" element={<WithNavbar><CreateResume /></WithNavbar>} />
            <Route path="/dashboard" element={<WithNavbar><Dashboard /></WithNavbar>} />
            <Route path="/modelos" element={<WithNavbar><Models /></WithNavbar>} />
            <Route path="/modelos/:slug" element={<WithNavbar><ModelosProfissao /></WithNavbar>} />
            <Route path="/p/:slug" element={<Suspense fallback={<PageLoader />}><PublicResume /></Suspense>} />
            <Route path="/precos" element={<WithNavbar><Pricing /></WithNavbar>} />
            <Route path="/contato" element={<WithNavbar><Contact /></WithNavbar>} />
            <Route path="/termos-de-uso" element={<WithNavbar><TermsPage /></WithNavbar>} />
            <Route path="/politica-de-privacidade" element={<WithNavbar><PrivacyPage /></WithNavbar>} />
            {/* Legacy redirects */}
            <Route path="/termos" element={<Navigate to="/termos-de-uso" replace />} />
            <Route path="/privacidade" element={<Navigate to="/politica-de-privacidade" replace />} />
            <Route path="/builder/:id" element={<Suspense fallback={<PageLoader />}><Builder /></Suspense>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster richColors position="top-right" />
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
