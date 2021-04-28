package task

import (
	"errors"
	"time"

	"github.com/google/uuid"
	m "github.com/keuller/multi-task-manager/pkg/domain/model"
)

type TaskService struct {
	repo TaskRepository
}

func NewTaskService(repo TaskRepository) TaskService {
	return TaskService{repo}
}

func (s TaskService) AddTask(project string, data m.CreateTaskRequest) string {
	newId := uuid.Must(uuid.NewRandom())

	task := m.Task{
		ID:          newId.String(),
		Description: data.Description,
		ProjectID:   project,
		CreatedAt:   time.Now(),
	}

	s.repo.Create(project, task)
	return newId.String()
}

func (s TaskService) UpdateTask(project, task, desc string) error {
	if err := s.repo.Update(project, task, desc); err != nil {
		return err
	}
	return nil
}

func (s TaskService) FinishTask(project, task string) error {
	if err := s.repo.Finish(project, task); err != nil {
		return err
	}
	return nil
}

func (s TaskService) RemoveTask(project, task string) error {
	if !s.repo.IsFinished(project, task) {
		s.repo.Remove(project, task)
		return nil
	}
	return errors.New("task is finished and cannot be removed")
}

func (s TaskService) GetByProject(project string) []m.TaskRecordResponse {
	tasks, exists := s.repo.data[project]
	if !exists {
		return nil
	}

	result := make([]m.TaskRecordResponse, 0)
	for _, t := range tasks {
		result = append(result, m.TaskRecordResponse{
			ID:          t.ID,
			Description: t.Description,
			CreatedAt:   t.CreatedAt,
			FinishedAt:  t.FinishedAt,
		})
	}

	return result
}
