import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, FileText, Trash2, Edit, Calendar } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { createResume, deleteResume, getResumes } from "@/lib/storage";
import type { Resume } from "@/types/resume";

const TEMPLATE_LABELS: Record<string, string> = {
  modern: "Moderno",
  classic: "Clássico",
  minimal: "Minimalista",
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>(() => getResumes());
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleCreate = () => {
    const resume = createResume();
    navigate(`/builder/${resume.id}`);
  };

  const handleDelete = (id: string) => {
    deleteResume(id);
    setResumes(getResumes());
    setDeleteId(null);
    toast.success("Currículo excluído");
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Meus Currículos</h1>
          <p className="text-muted-foreground mt-1">Gerencie e edite seus currículos</p>
        </div>
        <Button onClick={handleCreate} size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          Novo Currículo
        </Button>
      </div>

      {resumes.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-xl">
          <FileText className="h-14 w-14 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">Nenhum currículo ainda</h3>
          <p className="text-gray-400 mb-6">Crie seu primeiro currículo profissional agora</p>
          <Button onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            Criar primeiro currículo
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resumes.map((resume) => (
            <Card key={resume.id} className="hover:shadow-md transition-shadow">
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
            <Button variant="destructive" onClick={() => deleteId && handleDelete(deleteId)}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
