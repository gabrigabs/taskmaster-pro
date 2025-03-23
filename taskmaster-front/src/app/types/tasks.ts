export enum Status {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
  }
  
  export enum Priority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
  }
  
  export enum Category {
    WORK = "WORK",
    PERSONAL = "PERSONAL",
    SHOPPING = "SHOPPING",
    HEALTH = "HEALTH",
    EDUCATION = "EDUCATION",
    OTHER = "OTHER"
  }
  
  export interface Task {
    id: string;
    title: string;
    description?: string;
    status: Status;
    priority: Priority;
    category: Category;
    createdAt: string;
    completedAt?: string;
  }
  
  export interface TaskDTO {
    title: string;
    description?: string;
    status: Status;
    priority: Priority;
    category: Category;
  }