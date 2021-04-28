package project

import m "github.com/keuller/multi-task-manager/pkg/domain/model"

type ProjectRepository struct {
	data map[string]m.Project
}

func NewProjectRepository() ProjectRepository {
	init := make(map[string]m.Project)
	return ProjectRepository{init}
}

func (r *ProjectRepository) Add(project m.Project) {
	r.data[project.ID] = project
}

func (r ProjectRepository) FetchByUser(userID string) []m.Project {
	list := make([]m.Project, 0)
	for _, p := range r.data {
		if p.UserID == userID {
			list = append(list, p)
		}
	}
	return list
}

func (r ProjectRepository) FetchByID(id string) (m.Project, error) {
	var proj m.Project
	for _, p := range r.data {
		if p.ID == id {
			proj = p
		}
	}
	return proj, nil
}

func (r *ProjectRepository) UpdateTitle(id, title string) error {
	for _, p := range r.data {
		if p.ID == id {
			project := r.data[id]
			project.Title = title
			r.data[id] = project
		}
	}
	return nil
}

func (r ProjectRepository) Delete(id string) error {
	delete(r.data, id)
	return nil
}
