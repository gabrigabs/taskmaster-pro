import TaskForm from "@/app/components/tasks/task-form";

export default function NewTaskPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Criar Nova Tarefa</h1>
      <TaskForm />
    </div>
  );
}