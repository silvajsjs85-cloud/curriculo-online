import { useState, useEffect, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FileText, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Modelos", id: "modelos", href: "/modelos" },
  { label: "Como funciona", id: "como-funciona", href: null },
  { label: "Depoimentos", id: "depoimentos", href: null },
  { label: "Dicas", id: "dicas", href: null },
  { label: "Contato", id: null, href: "/contato" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const isDashboard = location.pathname === "/dashboard";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
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
      className={`border-b border-gray-100 sticky top-0 z-40 backdrop-blur-sm transition-shadow duration-300 ${
        isScrolled ? "shadow-[0_2px_12px_rgba(0,0,0,0.08)]" : "shadow-none"
      }`}
      style={{ backgroundColor: "rgba(247, 246, 243, 0.95)" }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6 max-w-6xl">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 font-extrabold text-xl" style={{ color: "#0F2744" }}>
          <div
            className="h-8 w-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#0D9488" }}
          >
            <FileText style={{ height: "17px", width: "17px", color: "white" }} />
          </div>
          Currículo Fácil
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={getSectionHref(l)}
              onClick={(event) => handleNavClick(event, l)}
              className="text-sm text-gray-500 hover:text-[#0F2744] transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2.5">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-[#0F2744] font-medium rounded-xl"
          >
            <Link to="/dashboard">Entrar</Link>
          </Button>
          <Button
            asChild
            variant={isDashboard ? "outline" : "default"}
            size="sm"
            className={
              isDashboard
                ? "rounded-xl border-teal-100 bg-white px-4 font-semibold text-teal-700 shadow-none hover:bg-teal-50 hover:text-teal-800"
                : `text-white rounded-xl px-5 shadow-sm font-semibold transition-opacity duration-300 ${
                    isHome && !isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`
            }
            style={isDashboard ? undefined : { backgroundColor: "#0D9488" }}
          >
            <Link to="/criar">Criar currículo grátis</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open
            ? <X className="h-5 w-5 text-gray-600" />
            : <Menu className="h-5 w-5 text-gray-600" />
          }
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t border-gray-100 px-6 py-4 space-y-1"
          style={{ backgroundColor: "#F7F6F3" }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={getSectionHref(l)}
              onClick={(event) => handleNavClick(event, l)}
              className="block text-sm text-gray-600 hover:text-[#0F2744] py-2.5 font-medium border-b border-gray-100 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <Button asChild variant="outline" className="w-full rounded-xl border-gray-200 font-medium">
              <Link to="/dashboard">Entrar</Link>
            </Button>
            <Button
              asChild
              variant={isDashboard ? "outline" : "default"}
              className={
                isDashboard
                  ? "w-full rounded-xl border-teal-100 bg-white font-semibold text-teal-700 hover:bg-teal-50 hover:text-teal-800"
                  : `w-full text-white rounded-xl font-semibold transition-opacity duration-300 ${
                      isHome && !isScrolled ? "opacity-0 pointer-events-none hidden" : "opacity-100"
                    }`
              }
              style={isDashboard ? undefined : { backgroundColor: "#0D9488" }}
            >
              <Link to="/criar">Criar currículo grátis</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
