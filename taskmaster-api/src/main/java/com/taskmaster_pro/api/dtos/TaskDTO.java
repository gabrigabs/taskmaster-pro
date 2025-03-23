package com.taskmaster_pro.api.dtos;

import com.taskmaster_pro.api.models.enums.Category;
import com.taskmaster_pro.api.models.enums.Priority;
import com.taskmaster_pro.api.models.enums.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskDTO {
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Status is required")
    private Status status;

    @NotNull(message = "Priority is required")
    private Priority priority;

    @NotNull(message = "Category is required")
    private Category category;

    private LocalDateTime createdAt;
    private LocalDateTime dueDate;
    private LocalDateTime completedAt;
    private String assignee;
}