"use client";

import { useEffect, useState } from "react";
import { Task, Status } from "@/app/types/tasks"
import { apiClient } from "@/app/services/api-client";
import TaskCard from "@/app/components/tasks/task-card";
import Link from "next/link";
import { FaPlus, FaFilter } from "react-icons/fa";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await apiClient.getTasks();
        setTasks(data);
      } catch (err) {
        setError("Failed to load tasks. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleStatusChange = async (id: string, status: Status) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      if (!taskToUpdate) return;

      const updatedTask = await apiClient.updateTask(id, {
        ...taskToUpdate,
        status
      });

      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    } catch (err) {
      console.error("Error updating task status:", err);
      alert("Failed to update task status");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiClient.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
      throw err;
    }
  };

  const filteredTasks = tasks.filter(task => {
    switch (activeFilter) {
      case "todo":
        return task.status === Status.TODO;
      case "inProgress":
        return task.status === Status.IN_PROGRESS;
      case "done":
        return task.status === Status.DONE;
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks</h1>
        <Link href="/tasks/new">
          <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
            <FaPlus className="mr-2" /> Add New Task
          </button>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center px-4 py-1">
            <FaFilter className="text-gray-400 mr-2" />
            <div className="flex overflow-x-auto space-x-1 py-2">
              {[
                { id: "all", label: "All" },
                { id: "todo", label: "To Do" },
                { id: "inProgress", label: "In Progress" },
                { id: "done", label: "Done" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-3 py-1 text-sm font-medium rounded-md whitespace-nowrap ${
                    activeFilter === filter.id
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 sm:p-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 p-4 rounded-md mb-6">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 mb-4">No tasks found</p>
                <Link href="/tasks/new">
                  <button className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                    <FaPlus className="mr-2" /> Create your first task
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}