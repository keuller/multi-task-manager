package task

import (
	"errors"
	"time"

	m "github.com/keuller/multi-task-manager/pkg/domain/model"
)

type TaskRepository struct {
	data map[string][]m.Task
}

func NewTaskRepository() TaskRepository {
	init := make(map[string][]m.Task)
	return TaskRepository{init}
}

func (r *TaskRepository) Create(projectId string, task m.Task) {
	tasks, exists := r.data[projectId]
	if !exists {
		tasks = make([]m.Task, 0)
	}

	tasks = append(tasks, task)
	r.data[projectId] = tasks
}

func (r *TaskRepository) Finish(projectId, taskId string) error {
	tasks, exists := r.data[projectId]
	if !exists {
		return errors.New("invalid project")
	}

	for idx, t := range tasks {
		time := time.Now()
		if t.ID == taskId {
			tasks[idx].FinishedAt = &time
		}
	}

	return nil
}

func (r TaskRepository) IsFinished(projectId, taskId string) bool {
	tasks, exists := r.data[projectId]
	if !exists {
		return false
	}

	for _, t := range tasks {
		if t.ID == taskId {
			return (t.FinishedAt != nil)
		}
	}

	return false
}

func (r *TaskRepository) Update(projectId, taskId, description string) error {
	tasks, exists := r.data[projectId]
	if !exists {
		return errors.New("invalid project")
	}

	for idx, t := range tasks {
		if t.ID == taskId {
			r.data[projectId][idx].Description = description
		}
	}

	return nil
}

func (r *TaskRepository) Remove(projectId, taskId string) error {
	tasks, exists := r.data[projectId]
	if !exists {
		return errors.New("invalid project")
	}

	list := make([]m.Task, 0)
	for _, t := range tasks {
		if t.ID != taskId {
			list = append(list, t)
		}
	}

	r.data[projectId] = list
	return nil
}
