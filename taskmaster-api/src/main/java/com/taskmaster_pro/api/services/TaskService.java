package com.taskmaster_pro.api.services;

import com.taskmaster_pro.api.dtos.TaskDTO;
import com.taskmaster_pro.api.models.Task;


import java.util.List;
import java.util.UUID;

public interface TaskService {
    List<Task> findAll();
    Task findById(UUID id);
    Task create(TaskDTO taskDTO);
    Task update(UUID id, TaskDTO taskDTO);
    void delete(UUID id);
}