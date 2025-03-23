"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Task } from "@/app/types/tasks";
import { apiClient } from "@/app/services/api-client";
import TaskForm from "@/app/components/tasks/task-form";

export default function EditTaskPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await apiClient.getTaskById(id);
        setTask(data);
      } catch (err) {
        setError("Falha ao carregar tarefa. Por favor, tente novamente.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 p-4 rounded-md">
        {error}
      </div>
    );
  }

  if (!task) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Tarefa não encontrada</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Editar Tarefa</h1>
      <TaskForm initialData={task} isEditing={true} />
    </div>
  );
}