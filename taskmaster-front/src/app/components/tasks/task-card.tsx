import { Task, Priority, Status, Category } from "@/app/types/tasks"
import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { categoryLabels, priorityLabels, statusLabels } from "@/app/utils/labels";

interface TaskCardProps {
  task: Task;
  onStatusChange?: (id: string, status: Status) => void;
  onDelete?: (id: string) => Promise<void>;
}

export default function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
      setIsDeleting(true);
      try {
        await onDelete?.(task.id);
      } catch (error) {
        console.error("Error deleting task:", error);
        alert("Falha ao excluir tarefa");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const getPriorityLabel = (priority: Priority): string => {
    return priorityLabels[priority] || priority;
  };

  const getStatusLabel = (status: Status): string => {
    return statusLabels[status] || status.replace('_', ' ');
  };

  const getCategoryLabel = (category: Category): string => {
    return categoryLabels[category] || category;
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case Priority.HIGH:
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case Priority.MEDIUM:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case Priority.LOW:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case Status.TODO:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      case Status.IN_PROGRESS:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case Status.DONE:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    }
  };

  const getCategoryIcon = (category: Category) => {
    switch (category) {
      case Category.WORK:
        return "💼";
      case Category.PERSONAL:
        return "👤";
      case Category.SHOPPING:
        return "🛒";
      case Category.HEALTH:
        return "🏥";
      case Category.EDUCATION:
        return "📚";
      default:
        return "📌";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-xl">{getCategoryIcon(task.category)}</span>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{task.title}</h3>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                {getPriorityLabel(task.priority)}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                {getStatusLabel(task.status)}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                {getCategoryLabel(task.category)}
              </span>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-4 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
          >
            <svg className={`h-5 w-5 transform ${expanded ? 'rotate-180' : ''} transition-transform`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Criada {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true, locale: ptBR })}
        </div>
        
        {expanded && (
          <div className="mt-4">
            {task.description && (
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line mb-4">{task.description}</p>
            )}
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <Link href={`/tasks/edit/${task.id}`}>
                  <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded transition-colors">
                    Editar
                  </button>
                </Link>
                <button 
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-3 py-1.5 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-700 dark:text-red-300 text-sm font-medium rounded transition-colors disabled:opacity-50"
                >
                  {isDeleting ? 'Excluindo...' : 'Excluir'}
                </button>
              </div>
              
              {task.status !== Status.DONE && (
                <button
                  onClick={() => onStatusChange?.(task.id, Status.DONE)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
                >
                  Marcar como Concluída
                </button>
              )}
              
              {task.status === Status.DONE && task.completedAt && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Concluída {formatDistanceToNow(new Date(task.completedAt), { addSuffix: true, locale: ptBR })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}