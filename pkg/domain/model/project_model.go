package model

import "time"

type Project struct {
	ID        string
	Title     string
	UserID    string
	CreatedAt time.Time
}

type MessageResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

type CreateProjectRequest struct {
	Title string `json:"title"`
}

type CreateProjectResponse struct {
	Status    string `json:"status"`
	Message   string `json:"message"`
	ProjectID string `json:"projectId"`
}

type ProjectRecordResponse struct {
	ID    string               `json:"id"`
	Title string               `json:"title"`
	Tasks []TaskRecordResponse `json:"tasks"`
}

type ProjectResponse struct {
	ID    string `json:"id"`
	Title string `json:"title"`
}
