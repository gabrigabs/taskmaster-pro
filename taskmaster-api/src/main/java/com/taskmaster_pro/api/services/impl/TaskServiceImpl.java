package com.taskmaster_pro.api.services.impl;

import com.taskmaster_pro.api.dtos.TaskDTO;
import com.taskmaster_pro.api.models.Task;
import com.taskmaster_pro.api.models.enums.Status;
import com.taskmaster_pro.api.repositories.TaskRepository;
import com.taskmaster_pro.api.services.TaskService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;


@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public List<Task> findAll() {
        return taskRepository.findAll();
    }


    @Override
    public Task findById(UUID id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatusCode.valueOf(404), "Task not found"));
    }

    @Override
    public Task create(TaskDTO taskDTO) {
        Task task = new Task();
        BeanUtils.copyProperties(taskDTO, task);
        task.setCreatedAt(LocalDateTime.now());
        return taskRepository.save(task);
    }

    @Override
    public Task update(UUID id, TaskDTO taskDTO) {
        Task existingTask = findById(id);

        if (Status.DONE.equals(taskDTO.getStatus()) && !Status.DONE.equals(existingTask.getStatus())) {
            existingTask.setCompletedAt(LocalDateTime.now());
        } else if (!Status.DONE.equals(taskDTO.getStatus())) {
            existingTask.setCompletedAt(null);
        }

        BeanUtils.copyProperties(taskDTO, existingTask, "id", "createdAt");
        return taskRepository.save(existingTask);
    }

    @Override
    public void delete(UUID id) {
        Task task = findById(id);
        taskRepository.delete(task);
    }

}