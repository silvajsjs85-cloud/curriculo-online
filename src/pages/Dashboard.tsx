import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Layout, Plus, FileText, Download, Edit, Trash2, LogOut, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [resumes, setResumes] = useState<Tables<"resumes">[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchResumes();
    }
  }, [user]);

  const fetchResumes = async () => {
    try {
      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setResumes(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar currículos",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este currículo?")) return;

    try {
      const { error } = await supabase.from("resumes").delete().eq("id", id);
      if (error) throw error;
      setResumes(resumes.filter((r) => r.id !== id));
      toast({ title: "Excluído", description: "Currículo removido com sucesso." });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao excluir",
        description: error.message,
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({ title: "Até logo!", description: "Você saiu com sucesso." });
      navigate("/auth");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao sair",
        description: error.message,
      });
    }
  };

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Usuário";
  const userAvatar = user?.user_metadata?.avatar_url;
  const userEmail = user?.email;

  return (
    <div className="min-h-screen flex flex-col bg-secondary/20">
      <header className="h-16 border-b bg-background sticky top-0 z-10">
        <div className="container h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <Layout className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">Currículo Fácil</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start leading-tight">
                <span className="text-sm font-semibold">{userName}</span>
                <span className="text-[10px] text-muted-foreground">{userEmail}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10">
              <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-12 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Meus Currículos</h1>
            <p className="text-muted-foreground">Gerencie e edite seus currículos criados, {userName}.</p>
          </div>
          <Link to="/editor">
            <Button className="gap-2 h-12 px-6">
              <Plus className="h-5 w-5" /> Criar novo currículo
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin mb-4" />
              <p>Carregando seus currículos...</p>
            </div>
          ) : (
            <>
              {resumes.map((resume) => (
                <Card key={resume.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-primary"
                          onClick={() => navigate(`/editor/${resume.id}`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDelete(resume.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-xl mt-4">{resume.title}</CardTitle>
                    <CardDescription>
                      Modelo {resume.template} • Última edição em {new Date(resume.updated_at).toLocaleDateString('pt-BR')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" size="sm" className="gap-2" onClick={() => navigate(`/editor/${resume.id}`)}>
                        Editar
                      </Button>
                      <Button size="sm" className="gap-2">
                        <Download className="h-3 w-3" /> Baixar PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}

          <Link to="/editor" className="group h-full min-h-[220px]">
            <div className="h-full border-2 border-dashed border-muted-foreground/20 rounded-xl flex flex-col items-center justify-center gap-4 group-hover:border-primary group-hover:bg-primary/5 transition-all duration-300">
              <div className="bg-secondary p-4 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                <Plus className="h-8 w-8" />
              </div>
              <span className="font-semibold text-muted-foreground group-hover:text-primary transition-colors">Novo Currículo</span>
            </div>
          </Link>
        </div>
      </main>

      <footer className="container py-8 border-t text-center text-sm text-muted-foreground">
        <p>© 2024 Currículo Fácil. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
