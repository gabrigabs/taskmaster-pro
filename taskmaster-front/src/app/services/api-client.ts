import { Task, TaskDTO } from "@/app/types/tasks";

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
  }

  async getTasks(): Promise<Task[]> {
    const response = await fetch(`${this.baseUrl}/tasks`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.json();
  }

  async getTaskById(id: string): Promise<Task> {
    const response = await fetch(`${this.baseUrl}/tasks/${id}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.json();
  }

  async createTask(task: TaskDTO): Promise<Task> {
    const response = await fetch(`${this.baseUrl}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.json();
  }

  async updateTask(id: string, task: TaskDTO): Promise<Task> {
    const response = await fetch(`${this.baseUrl}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.json();
  }

  async deleteTask(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  }
}

export const apiClient = new ApiClient();