package api

import (
	"github.com/gofiber/fiber/v2"
	"github.com/keuller/multi-task-manager/pkg/app"
	m "github.com/keuller/multi-task-manager/pkg/domain/model"
)

var (
	projectService = app.BuildProjectService()
	taskService    = app.BuildTaskService()
)

func RegisterProject(srv app.App) {
	v1 := srv.Runtime.Group("/v1/projects", app.CheckToken())
	v1.Get("", getByUser())
	v1.Get(":id", getByID())
	v1.Post("", createProject())
	v1.Put(":id", changeTitle())
	v1.Delete(":id", removeProject())

	v1.Put(":id/task", updateTask)
	v1.Post(":id/task", createTask)
	v1.Patch(":id/task", finishTask)
	v1.Delete(":id/task", removeTask)
}

func createProject() fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		userId := ctx.Locals("user_id").(string)
		data := new(m.CreateProjectRequest)
		if err := ctx.BodyParser(data); err != nil {
			return fiber.NewError(fiber.ErrBadRequest.Code, err.Error())
		}

		projId := projectService.CreateProject(*data, userId)
		return ctx.Status(201).JSON(m.CreateProjectResponse{
			Status:    "OK",
			ProjectID: projId,
			Message:   "Project has created successfuly.",
		})
	}
}

func getByUser() fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		id := ctx.Locals("user_id").(string)
		return ctx.JSON(projectService.GetByUser(id))
	}
}

func changeTitle() fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		data := new(m.CreateProjectRequest)
		id := ctx.Params("id")
		if err := ctx.BodyParser(data); err != nil {
			return fiber.NewError(fiber.ErrBadRequest.Code, err.Error())
		}

		if err := projectService.ChangeTitle(id, data.Title); err != nil {
			return fiber.NewError(fiber.ErrNotFound.Code, err.Error())
		}

		return ctx.JSON(m.MessageResponse{Status: "OK", Message: "Project was updated."})
	}
}

func getByID() fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		id := ctx.Params("id")
		proj, err := projectService.GetByID(id)
		if err != nil {
			return fiber.NewError(fiber.ErrNotFound.Code, err.Error())
		}

		proj.Tasks = taskService.GetByProject(id)
		return ctx.JSON(proj)
	}
}

func removeProject() fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		id := ctx.Params("id")
		msg, err := projectService.RemoveProject(id)
		if err != nil {
			return fiber.NewError(fiber.ErrNotFound.Code, err.Error())
		}

		return ctx.JSON(m.MessageResponse{Status: "OK", Message: msg})
	}
}

// ---------------------
func createTask(ctx *fiber.Ctx) error {
	projectId := ctx.Params("id")

	_, err := projectService.GetByID(projectId)
	if err != nil {
		return fiber.NewError(fiber.ErrBadRequest.Code, err.Error())
	}

	data := new(m.CreateTaskRequest)
	if err = ctx.BodyParser(data); err != nil {
		return fiber.NewError(fiber.ErrBadRequest.Code, err.Error())
	}

	taskId := taskService.AddTask(projectId, *data)
	return ctx.Status(fiber.StatusCreated).JSON(m.CreateTaskResponse{
		Status:  "OK",
		Message: "Task was created.",
		TaskID:  taskId,
	})
}

func updateTask(ctx *fiber.Ctx) error {
	data := &m.UpdateTaskRequest{}
	if err := ctx.BodyParser(data); err != nil {
		return fiber.NewError(fiber.ErrBadRequest.Code, err.Error())
	}

	projectId := ctx.Params("id")
	if err := taskService.UpdateTask(projectId, data.TaskID, data.Description); err != nil {
		return fiber.NewError(fiber.ErrBadRequest.Code, err.Error())
	}
	return ctx.Status(fiber.StatusOK).JSON(m.MessageResponse{Status: "OK", Message: "Task was updated."})
}

func finishTask(ctx *fiber.Ctx) error {
	data := &m.TaskOperationRequest{}
	if err := ctx.BodyParser(data); err != nil {
		return fiber.NewError(fiber.ErrBadRequest.Code, err.Error())
	}

	projectId := ctx.Params("id")
	if err := taskService.FinishTask(projectId, data.TaskID); err != nil {
		return fiber.NewError(fiber.ErrBadRequest.Code, err.Error())
	}
	return ctx.Status(fiber.StatusOK).JSON(m.MessageResponse{Status: "OK", Message: "Task was finished."})
}

func removeTask(ctx *fiber.Ctx) error {
	data := &m.TaskOperationRequest{}
	if err := ctx.BodyParser(data); err != nil {
		return fiber.NewError(fiber.ErrBadRequest.Code, err.Error())
	}

	projectId := ctx.Params("id")
	if err := taskService.RemoveTask(projectId, data.TaskID); err != nil {
		return fiber.NewError(fiber.ErrBadRequest.Code, err.Error())
	}
	return ctx.Status(fiber.StatusOK).JSON(m.MessageResponse{Status: "OK", Message: "Task was removed."})
}
