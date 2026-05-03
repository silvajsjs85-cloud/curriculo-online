import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

export function Navbar() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <FileText className="h-6 w-6" />
          Currículo Fácil
        </Link>
      </div>
    </header>
  );
}
