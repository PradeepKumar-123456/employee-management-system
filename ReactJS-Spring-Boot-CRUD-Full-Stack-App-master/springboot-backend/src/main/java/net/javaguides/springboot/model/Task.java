package net.javaguides.springboot.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    private String status; // TODO, IN_PROGRESS, DONE

    @Column(name = "due_date")
    private String dueDate;

    @Column(name = "employee_id")
    private long employeeId;

    public Task() {}

    public Task(String title, String description, String status, String dueDate, long employeeId) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.dueDate = dueDate;
        this.employeeId = employeeId;
    }

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getDueDate() { return dueDate; }
    public void setDueDate(String dueDate) { this.dueDate = dueDate; }

    public long getEmployeeId() { return employeeId; }
    public void setEmployeeId(long employeeId) { this.employeeId = employeeId; }
}
