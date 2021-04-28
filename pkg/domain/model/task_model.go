package model

import "time"

type Task struct {
	ID          string
	ProjectID   string
	Description string
	CreatedAt   time.Time
	FinishedAt  *time.Time
}

type CreateTaskRequest struct {
	Description string `json:"description"`
}

type CreateTaskResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
	TaskID  string `json:"taskId"`
}

type UpdateTaskRequest struct {
	TaskID      string `json:"taskId"`
	Description string `json:"description"`
}

type TaskOperationRequest struct {
	TaskID string `json:"taskId"`
}

type TaskRecordResponse struct {
	ID          string     `json:"id"`
	Description string     `json:"description"`
	CreatedAt   time.Time  `json:"createdAt"`
	FinishedAt  *time.Time `json:"finishedAt"`
}
