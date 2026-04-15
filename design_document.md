# 📄 Software Design Document
## Employee Management System
**Version:** 1.0 &nbsp;|&nbsp; **Date:** April 2026 &nbsp;|&nbsp; **Author:** Pradeep Kumar

---

## 1. Project Overview

The **Employee Management System** is a full-stack web application designed to help organizations manage their employee directory and assign tasks to individual employees. The application provides a secure login interface, complete employee CRUD operations, and an integrated task management system with visual status tracking.

### 1.1 Objectives

- Provide a modern, professional UI for managing employees
- Allow administrators to create, read, update, and delete employee records
- Enable task assignment and tracking per employee (To Do / In Progress / Done)
- Store data persistently via a RESTful backend API backed by a relational database

---

## 2. Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | ReactJS | 16.13.1 |
| **Routing** | React Router DOM | 5.2.0 |
| **HTTP Client** | Axios | 0.19.2 |
| **CSS Framework** | Bootstrap + Vanilla CSS | 4.5.0 |
| **Typography** | Google Fonts (Inter) | — |
| **Backend** | Spring Boot | 3.0.4 |
| **ORM** | Spring Data JPA (Hibernate) | — |
| **Database** | H2 In-Memory DB | — |
| **Language** | Java | 17+ |
| **Build Tool** | Maven | — |
| **Version Control** | Git / GitHub | — |

---

## 3. System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER                              │
│                                                             │
│   ┌──────────────────────────────────────────────────────┐  │
│   │              React Frontend (Port 3000)              │  │
│   │                                                      │  │
│   │  Login → Employee List → Add/Edit → Task List →     │  │
│   │                          Add/Edit Task               │  │
│   └───────────────────┬──────────────────────────────────┘  │
│                       │ HTTP (Axios)                         │
│                       │ CORS: localhost:3000 / 3001          │
└───────────────────────┼─────────────────────────────────────┘
                        │
┌───────────────────────┼─────────────────────────────────────┐
│   Spring Boot Backend (Port 8080)                           │
│                       │                                     │
│   ┌───────────────────▼──────────────────────┐             │
│   │            REST Controllers              │             │
│   │   EmployeeController  TaskController     │             │
│   └───────────────────┬──────────────────────┘             │
│                       │                                     │
│   ┌───────────────────▼──────────────────────┐             │
│   │           Spring Data JPA                │             │
│   │   EmployeeRepository  TaskRepository     │             │
│   └───────────────────┬──────────────────────┘             │
│                       │                                     │
│   ┌───────────────────▼──────────────────────┐             │
│   │           H2 In-Memory Database          │             │
│   │        employees table  tasks table      │             │
│   └──────────────────────────────────────────┘             │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Database Schema

### 4.1 `employees` Table

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT |
| `first_name` | VARCHAR | NOT NULL |
| `last_name` | VARCHAR | NOT NULL |
| `email_id` | VARCHAR | NOT NULL |

### 4.2 `tasks` Table

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT |
| `title` | VARCHAR | NOT NULL |
| `description` | VARCHAR | NULLABLE |
| `status` | VARCHAR | `TODO` \| `IN_PROGRESS` \| `DONE` |
| `due_date` | VARCHAR | NULLABLE |
| `employee_id` | BIGINT | Foreign reference to `employees.id` |

### 4.3 Entity Relationship Diagram

```
┌──────────────┐         ┌───────────────┐
│  employees   │         │     tasks     │
│──────────────│         │───────────────│
│ id (PK)      │ 1 ───── │ id (PK)       │
│ first_name   │  to     │ title         │
│ last_name    │  many   │ description   │
│ email_id     │         │ status        │
└──────────────┘         │ due_date      │
                         │ employee_id   │
                         └───────────────┘
```

---

## 5. REST API Reference

**Base URL:** `http://localhost:8080/api/v1`

### 5.1 Employee Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|-------------|----------|
| `GET` | `/employees` | Get all employees | — | `Employee[]` |
| `GET` | `/employees/{id}` | Get employee by ID | — | `Employee` |
| `POST` | `/employees` | Create new employee | `{firstName, lastName, emailId}` | `Employee` |
| `PUT` | `/employees/{id}` | Update employee | `{firstName, lastName, emailId}` | `Employee` |
| `DELETE` | `/employees/{id}` | Delete employee | — | `{deleted: true}` |

### 5.2 Task Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|-------------|----------|
| `GET` | `/tasks` | Get all tasks | — | `Task[]` |
| `GET` | `/employees/{id}/tasks` | Get tasks for an employee | — | `Task[]` |
| `GET` | `/tasks/{id}` | Get single task | — | `Task` |
| `POST` | `/employees/{id}/tasks` | Create task for employee | `{title, description, status, dueDate}` | `Task` |
| `PUT` | `/tasks/{id}` | Update task | `{title, description, status, dueDate}` | `Task` |
| `DELETE` | `/tasks/{id}` | Delete task | — | `{deleted: true}` |

### 5.3 Sample Payloads

**Create Employee**
```json
{
  "firstName": "Pradeep",
  "lastName": "Kumar",
  "emailId": "pradeep@example.com"
}
```

**Create Task**
```json
{
  "title": "Prepare Monthly Report",
  "description": "Compile sales data and prepare the Q1 report.",
  "status": "IN_PROGRESS",
  "dueDate": "2026-04-30"
}
```

---

## 6. Frontend Architecture

### 6.1 Project Structure

```
react-frontend/
└── src/
    ├── App.js                        # Root component + routing
    ├── index.js                      # ReactDOM entry point
    ├── components/
    │   ├── LoginComponent.jsx/.css   # Login page (glassmorphism)
    │   ├── HeaderComponent.js        # Navigation bar
    │   ├── FooterComponent.jsx       # Footer
    │   ├── ListEmployeeComponent.jsx/.css   # Employee directory table
    │   ├── CreateEmployeeComponent.jsx/.css # Add / Edit employee form
    │   ├── ViewEmployeeComponent.jsx        # View employee details
    │   ├── UpdateEmployeeComponent.jsx      # (Legacy, not routed)
    │   ├── TaskListComponent.jsx/.css       # Task list per employee
    │   └── CreateTaskComponent.jsx/.css     # Add / Edit task form
    └── services/
        ├── EmployeeService.js        # Axios calls for employees
        └── TaskService.js            # Axios calls for tasks
```

### 6.2 Application Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `LoginComponent` | Default landing page |
| `/login` | `LoginComponent` | Login screen |
| `/employees` | `ListEmployeeComponent` | Employee directory |
| `/add-employee/_add` | `CreateEmployeeComponent` | Add new employee |
| `/add-employee/:id` | `CreateEmployeeComponent` | Edit employee |
| `/view-employee/:id` | `ViewEmployeeComponent` | View employee details |
| `/employees/:id/tasks` | `TaskListComponent` | Tasks for an employee |
| `/employees/:id/add-task/_add` | `CreateTaskComponent` | Add task to employee |
| `/employees/:id/add-task/:taskId` | `CreateTaskComponent` | Edit existing task |

### 6.3 Component Descriptions

| Component | Role |
|-----------|------|
| `LoginComponent` | Full-page glassmorphism login with animated background shapes |
| `HeaderComponent` | Dark navbar at the top of every page |
| `FooterComponent` | Fixed footer |
| `ListEmployeeComponent` | Floating card table with avatar initials, email pills, and action buttons |
| `CreateEmployeeComponent` | Minimal form in a rounded card; handles both create and update |
| `ViewEmployeeComponent` | Read-only view of a single employee |
| `TaskListComponent` | Card-based task list with color-coded status badges and per-task actions |
| `CreateTaskComponent` | Form with title, description, status dropdown, and date picker |

---

## 7. UI Design System

The application follows a coherent modern design language across all views.

### 7.1 Color Palette

| Token | Color | Use |
|-------|-------|-----|
| **Primary** | `#6366f1` (Indigo) | Buttons, accents, links |
| **Primary Dark** | `#4f46e5` | Button hover states |
| **Background** | `#f1f5f9` | App body background |
| **Surface** | `#ffffff` | Cards, panels |
| **Text Primary** | `#0f172a` | Headings |
| **Text Muted** | `#64748b`, `#94a3b8` | Labels, descriptions |
| **Success** | `#16a34a` | DONE status badge |
| **Warning** | `#d97706` | TODO status badge |
| **Info** | `#2563eb` | IN PROGRESS badge |
| **Danger** | `#dc2626` | Delete buttons |

### 7.2 Typography

- **Font Family:** `Inter` (Google Fonts)
- **Sizes:** Headings `24–28px` · Body `14–15px` · Labels `12–13px`
- **Weights:** 400 (body) · 500 (medium) · 600 (semi-bold) · 700 (bold)

### 7.3 Elevation & Spacing

- **Card shadow:** `0 10px 30px -10px rgba(0,0,0,0.06)`
- **Button shadow:** `0 8px 16px -4px rgba(79,70,229,0.4)` (primary)
- **Border radius:** `12px` (inputs) · `16px` (task cards) · `24px` (page panels)
- **Micro-animations:** `transform: translateY(-2px)` on hover; `0.25s cubic-bezier` transitions

---

## 8. User Flows

### 8.1 Login Flow

```
Open App (/)
    ↓
Login Page → Fill Username + Password → Click "Sign In"
    ↓
Redirect to /employees (Employee Directory)
```

> Note: Authentication is frontend-only (no backend auth). Future enhancement to add Spring Security.

### 8.2 Employee CRUD Flow

```
/employees (Directory)
    ├── Click "Add Employee" → /add-employee/_add → Fill form → Save → /employees
    ├── Click "Edit" on row → /add-employee/:id → Prefilled form → Update → /employees
    ├── Click "View" on row → /view-employee/:id (Read-only)
    └── Click "Delete" on row → Instant delete → row removed from table
```

### 8.3 Task Management Flow

```
/employees (Directory)
    └── Click "Tasks" on employee row → /employees/:id/tasks
            ├── Click "Add Task" → /employees/:id/add-task/_add
            │       Fill title, description, status, due date → Save Task
            │       → Back to /employees/:id/tasks
            ├── Click "Edit" on task card → /employees/:id/add-task/:taskId
            │       Pre-filled form → Update Task
            │       → Back to /employees/:id/tasks
            └── Click "Delete" on task card → Instant delete → card removed
```

---

## 9. Backend Architecture

### 9.1 Package Structure

```
net.javaguides.springboot/
├── SpringbootBackendApplication.java   # Entry point (@SpringBootApplication)
├── controller/
│   ├── EmployeeController.java         # /api/v1/employees REST endpoints
│   └── TaskController.java             # /api/v1/tasks REST endpoints
├── model/
│   ├── Employee.java                   # @Entity for employees table
│   └── Task.java                       # @Entity for tasks table
├── repository/
│   ├── EmployeeRepository.java         # JpaRepository<Employee, Long>
│   └── TaskRepository.java             # JpaRepository<Task, Long> + custom query
└── exception/
    └── ResourceNotFoundException.java  # Custom 404 exception handler
```

### 9.2 CORS Configuration

Both controllers are annotated with:
```java
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
```

### 9.3 Database Configuration (`application.properties`)

```properties
spring.datasource.url=jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

> The H2 console is accessible at `http://localhost:8080/h2-console` for debugging the database.

---

## 10. Running the Application

### 10.1 Prerequisites

| Tool | Minimum Version |
|------|----------------|
| Node.js | 14+ |
| npm | 6+ |
| Java JDK | 17+ |
| Maven | 3.6+ |

### 10.2 Start Backend

```powershell
cd springboot-backend
mvn spring-boot:run
# API available at http://localhost:8080
```

### 10.3 Start Frontend

```powershell
cd react-frontend
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm install
npm start
# App available at http://localhost:3000
```

---

## 11. Known Limitations & Future Enhancements

| # | Limitation | Suggested Enhancement |
|---|-----------|----------------------|
| 1 | H2 is in-memory — all data is lost on backend restart | Replace with MySQL or PostgreSQL |
| 2 | No real authentication | Add Spring Security + JWT tokens |
| 3 | Login form has no actual validation against a user store | Add a `users` table and proper login API |
| 4 | No pagination in employee or task lists | Add server-side pagination with Spring Pageable |
| 5 | No search or filter | Add search bar to filter employees by name/email |
| 6 | Tasks have no priority level | Add `priority` field (`LOW`, `MEDIUM`, `HIGH`) |
| 7 | No file upload or profile photos | Add employee profile picture support |
| 8 | No deployment configuration | Add Docker Compose or deploy to AWS/Render |

---

## 12. GitHub Repository

All source code is version-controlled and publicly available at:

> 🔗 **https://github.com/PradeepKumar-123456/employee-management-system**

---

*This document was prepared as part of the Employee Management System project.*
