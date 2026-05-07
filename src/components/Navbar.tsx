import { useState, useEffect, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FileText, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Modelos", id: "modelos", href: "/modelos" },
  { label: "Como funciona", id: "como-funciona", href: null },
  { label: "Depoimentos", id: "depoimentos", href: null },
  { label: "Preços", id: null, href: "/precos" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getSectionHref = (link: (typeof NAV_LINKS)[0]) => {
    if (link.href) return link.href;
    return isHome ? `#${link.id}` : `/#${link.id}`;
  };

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    link: (typeof NAV_LINKS)[0],
  ) => {
    setOpen(false);
    if (link.href) return;
    if (isHome) return;

    event.preventDefault();
    navigate({
      pathname: "/",
      hash: `#${link.id}`,
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-md border-slate-200 shadow-sm py-3" 
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 max-w-7xl">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="h-10 w-10 rounded-xl bg-[#0F2744] flex items-center justify-center transition-transform group-hover:scale-105 group-hover:rotate-3 shadow-lg shadow-blue-900/10">
            <FileText className="h-5 w-5 text-teal-400" />
          </div>
          <span className="font-black text-xl tracking-tight text-[#0F2744]">
            Currículo<span className="text-[#0D9488]">Fácil</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={getSectionHref(l)}
              onClick={(event) => handleNavClick(event, l)}
              className="text-sm font-semibold text-slate-600 hover:text-[#0F2744] transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0D9488] transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            asChild
            variant="ghost"
            className="text-slate-600 hover:text-[#0F2744] font-bold text-sm"
          >
            <Link to="/dashboard">Entrar</Link>
          </Button>
          <Button
            asChild
            className="bg-[#0D9488] hover:bg-[#0f766e] text-white rounded-full px-6 font-bold text-sm shadow-lg shadow-teal-500/20 transition-all hover:-translate-y-0.5"
          >
            <Link to="/criar" className="flex items-center gap-2">
              Criar currículo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-slate-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6 text-slate-600" /> : <Menu className="h-6 w-6 text-slate-600" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 space-y-4 animate-fade-in shadow-xl">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={getSectionHref(l)}
                onClick={(event) => handleNavClick(event, l)}
                className="text-base font-bold text-slate-600 hover:text-[#0F2744]"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 flex flex-col gap-3 border-t border-slate-50">
            <Button asChild variant="outline" className="w-full rounded-full font-bold border-slate-200">
              <Link to="/dashboard">Entrar</Link>
            </Button>
            <Button asChild className="w-full bg-[#0D9488] hover:bg-[#0f766e] text-white rounded-full font-bold shadow-lg shadow-teal-500/20">
              <Link to="/criar">Criar currículo grátis</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
