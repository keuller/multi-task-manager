package app

import (
	p "github.com/keuller/multi-task-manager/pkg/domain/project"
	t "github.com/keuller/multi-task-manager/pkg/domain/task"
	u "github.com/keuller/multi-task-manager/pkg/domain/user"
)

func BuildUserService() u.UserService {
	repo := u.NewUserRepository()
	return u.NewUserService(repo)
}

func BuildProjectService() p.ProjectService {
	repo := p.NewProjectRepository()
	return p.NewProjectService(repo)
}

func BuildTaskService() t.TaskService {
	repo := t.NewTaskRepository()
	return t.NewTaskService(repo)
}
