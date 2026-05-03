import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, FileText, Trash2, Edit, Calendar } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import type { Resume } from "@/types/resume";

const TEMPLATE_LABELS: Record<string, string> = {
  modern: "Moderno",
  classic: "Clássico",
  minimal: "Minimalista",
};

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: resumes = [], isLoading } = useQuery({
    queryKey: ["resumes", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .eq("user_id", user!.id)
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data as Resume[];
    },
    enabled: !!user,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("resumes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      toast.success("Currículo excluído");
      setDeleteId(null);
    },
    onError: () => toast.error("Erro ao excluir o currículo"),
  });

  const createNew = async () => {
    const { data, error } = await supabase
      .from("resumes")
      .insert({
        user_id: user!.id,
        title: "Novo Currículo",
        template: "modern",
        data: {
          personalInfo: { name: "", email: "", phone: "", location: "", linkedin: "", website: "", summary: "" },
          experiences: [],
          education: [],
          skills: [],
        },
      })
      .select()
      .single();

    if (error) {
      toast.error("Erro ao criar currículo");
      return;
    }
    navigate(`/builder/${data.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Meus Currículos</h1>
          <p className="text-muted-foreground mt-1">Gerencie e edite seus currículos</p>
        </div>
        <Button onClick={createNew} size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          Novo Currículo
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : resumes.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-xl">
          <FileText className="h-14 w-14 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">Nenhum currículo ainda</h3>
          <p className="text-gray-400 mb-6">Crie seu primeiro currículo profissional agora</p>
          <Button onClick={createNew} className="gap-2">
            <Plus className="h-4 w-4" />
            Criar primeiro currículo
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resumes.map((resume) => (
            <Card key={resume.id} className="hover:shadow-md transition-shadow group">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base line-clamp-1">{resume.title}</CardTitle>
                  <Badge variant="secondary" className="text-xs shrink-0 ml-2">
                    {TEMPLATE_LABELS[resume.template] ?? resume.template}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">
                  {resume.data?.personalInfo?.name || "Nome não preenchido"}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                  <Calendar className="h-3 w-3" />
                  {new Date(resume.updated_at).toLocaleDateString("pt-BR")}
                </p>
              </CardContent>
              <CardFooter className="gap-2 pt-2">
                <Button asChild size="sm" className="flex-1 gap-1">
                  <Link to={`/builder/${resume.id}`}>
                    <Edit className="h-3.5 w-3.5" />
                    Editar
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive hover:text-destructive"
                  onClick={() => setDeleteId(resume.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir currículo?</DialogTitle>
            <DialogDescription>Esta ação não pode ser desfeita.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancelar</Button>
            <Button
              variant="destructive"
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              disabled={deleteMutation.isPending}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
