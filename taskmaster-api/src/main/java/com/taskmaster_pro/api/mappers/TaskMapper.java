package com.taskmaster_pro.api.mappers;

import com.taskmaster_pro.api.dtos.TaskDTO;
import com.taskmaster_pro.api.models.Task;
import org.springframework.stereotype.Component;

@Component
public class TaskMapper {

    public void mapToEntity(TaskDTO source, Task target) {
        if (source.getTitle() != null) {
            target.setTitle(source.getTitle());
        }

        target.setDescription(source.getDescription());

        if (source.getStatus() != null) {
            target.setStatus(source.getStatus());
        }

        if (source.getPriority() != null) {
            target.setPriority(source.getPriority());
        }

        if (source.getCategory() != null) {
            target.setCategory(source.getCategory());
        }
    }
    
}