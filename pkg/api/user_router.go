package api

import (
	"github.com/gofiber/fiber/v2"
	"github.com/keuller/multi-task-manager/pkg/app"
	m "github.com/keuller/multi-task-manager/pkg/domain/model"
)

var service = app.BuildUserService()

func RegisterUser(app app.App) {
	app.Runtime.Get("/v1/users", getAllUsers())
	app.Runtime.Post("/auth", authenticate())
	app.Runtime.Post("/register", register())
}

func getAllUsers() fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		return ctx.JSON(service.GetAll())
	}
}

func authenticate() fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		data := new(m.AuthRequest)
		if err := ctx.BodyParser(data); err != nil {
			return ctx.JSON(fiber.Map{
				"status":  "failure",
				"message": err.Error(),
			})
		}

		auth, err2 := service.Authenticate(data.Email, data.Password)
		if err2 != nil {
			return ctx.JSON(fiber.Map{
				"status":  "failure",
				"message": err2.Error(),
			})
		}

		return ctx.JSON(auth)
	}
}

func register() fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		data := new(m.RegisterUserRequest)
		if err := ctx.BodyParser(data); err != nil {
			return ctx.JSON(fiber.Map{
				"status":  "failure",
				"message": err.Error(),
			})
		}

		msg, err2 := service.AddUser(*data)
		if err2 != nil {
			return ctx.JSON(fiber.Map{
				"status":  "failure",
				"message": err2.Error(),
			})
		}

		return ctx.JSON(fiber.Map{
			"status":  "OK",
			"message": msg,
		})
	}
}
