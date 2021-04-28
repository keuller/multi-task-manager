package app

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/keuller/multi-task-manager/pkg/common"
)

func CheckToken() fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		authHeader := string(ctx.Request().Header.Peek("authorization"))
		if authHeader == "" {
			return ctx.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"status":  "unauthorizaed",
				"message": "Security token must be provided.",
			})
		}

		values := strings.Split(authHeader, " ")
		token := values[0]
		if len(values) == 2 {
			token = values[1]
		}

		data, err := common.DecodeToken(token)
		if err != nil {
			return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"status":  "failure",
				"message": err.Error(),
			})
		}

		ctx.Locals("user_id", data["user_id"])
		return ctx.Next()
	}
}
