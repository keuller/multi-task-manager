package project

import (
	"time"

	"github.com/google/uuid"
	m "github.com/keuller/multi-task-manager/pkg/domain/model"
)

type ProjectService struct {
	repo ProjectRepository
}

func NewProjectService(repo ProjectRepository) ProjectService {
	return ProjectService{repo}
}

func (s ProjectService) CreateProject(data m.CreateProjectRequest, userID string) string {
	newId := uuid.Must(uuid.NewRandom())

	project := m.Project{
		ID:        newId.String(),
		Title:     data.Title,
		UserID:    userID,
		CreatedAt: time.Now(),
	}

	s.repo.Add(project)
	return newId.String()
}

func (s ProjectService) GetByUser(userID string) []m.ProjectResponse {
	list := make([]m.ProjectResponse, 0)
	users := s.repo.FetchByUser(userID)
	for _, u := range users {
		list = append(list, m.ProjectResponse{
			ID:    u.ID,
			Title: u.Title,
		})
	}
	return list
}

func (s ProjectService) GetByID(id string) (m.ProjectRecordResponse, error) {
	project, err := s.repo.FetchByID(id)
	if err != nil {
		return m.ProjectRecordResponse{}, err
	}

	return m.ProjectRecordResponse{
		ID:    project.ID,
		Title: project.Title,
		Tasks: nil,
	}, nil
}

func (s ProjectService) ChangeTitle(id, title string) error {
	if err := s.repo.UpdateTitle(id, title); err != nil {
		return err
	}
	return nil
}

func (s ProjectService) RemoveProject(id string) (string, error) {
	if err := s.repo.Delete(id); err != nil {
		return "", err
	}
	return "Project has removed successfuly.", nil
}
