package net.javaguides.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.javaguides.springboot.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByEmployeeId(Long employeeId);
}
