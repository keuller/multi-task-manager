package project

import (
	"testing"
	"time"

	m "github.com/keuller/multi-task-manager/pkg/domain/model"
	p "github.com/keuller/multi-task-manager/pkg/domain/project"
	. "github.com/onsi/gomega"
)

var repository p.ProjectRepository = p.NewProjectRepository()

func TestCreateProject(t *testing.T) {
	RegisterTestingT(t)

	proj := m.Project{
		ID:        "d9f75b36-3507-4fc8-9809-23a00cef0f34",
		Title:     "Test Project",
		UserID:    "0dea30d0-403c-4ccb-bedd-2a43a0f2547a",
		CreatedAt: time.Now(),
	}

	repository.Add(proj)
}

func TestProjectsByUser(t *testing.T) {
	RegisterTestingT(t)

	projects := repository.FetchByUser("0dea30d0-403c-4ccb-bedd-2a43a0f2547a")

	Expect(len(projects)).Should(Equal(1))
}

func TestFindProjectByID(t *testing.T) {
	RegisterTestingT(t)

	proj, err := repository.FetchByID("d9f75b36-3507-4fc8-9809-23a00cef0f34")
	if err != nil {
		t.Fatal(err)
	}

	Expect(proj.Title).Should(Equal("Test Project"))
}
