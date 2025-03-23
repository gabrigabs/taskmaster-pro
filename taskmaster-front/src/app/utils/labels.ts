import { Status, Priority, Category } from "@/app/types/tasks";

export const statusLabels: Record<Status, string> = {
    [Status.TODO]: "A Fazer",
    [Status.IN_PROGRESS]: "Em Progresso",
    [Status.DONE]: "Concluído"
  };
  
export const priorityLabels: Record<Priority, string> = {
    [Priority.HIGH]: "Alta",
    [Priority.MEDIUM]: "Média",
    [Priority.LOW]: "Baixa"
  };
  
export const categoryLabels: Record<Category, string> = {
    [Category.WORK]: "Trabalho",
    [Category.PERSONAL]: "Pessoal",
    [Category.SHOPPING]: "Compras",
    [Category.HEALTH]: "Saúde",
    [Category.EDUCATION]: "Educação",
    [Category.OTHER]: "Outro"
  };