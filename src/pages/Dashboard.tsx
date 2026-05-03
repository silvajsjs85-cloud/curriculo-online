import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Meus Currículos</h1>
          <p className="text-muted-foreground mt-1">Gerencie e edite seus currículos</p>
        </div>
        <Button size="lg" className="gap-2" disabled>
          <Plus className="h-5 w-5" />
          Novo Currículo
        </Button>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-20 text-center">
          <FileText className="h-14 w-14 text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">Em breve</h3>
          <p className="text-gray-400 max-w-sm">
            O editor de currículos estará disponível em breve. Estamos finalizando os últimos detalhes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
