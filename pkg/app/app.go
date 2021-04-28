package app

import (
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

type App struct {
	Runtime *fiber.App
}

func New() App {
	rt := fiber.New(fiber.Config{
		CaseSensitive: true,
		StrictRouting: false,
		ServerHeader:  "MT_Server",
		ReadTimeout:   10 * time.Second,
		WriteTimeout:  15 * time.Second,
	})

	rt.Use(compress.New())
	rt.Use(recover.New())
	return App{rt}
}

func (a App) Start(addr string) {
	go func() {
		a.Runtime.Static("/", "public")
		a.Runtime.Get("/health/liveness", liveness())
		a.Runtime.Get("/*", index())

		if err := a.Runtime.Listen(addr); err != nil {
			log.Panic(err)
		}
	}()

	ch := make(chan os.Signal, 1)
	signal.Notify(ch, os.Interrupt, syscall.SIGTERM)
	<-ch

	log.Println("Shuting down the Server.")
	a.Runtime.Shutdown()
}

func index() fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		return ctx.SendFile("./public/index.html")
	}
}

func liveness() fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		return ctx.JSON(fiber.Map{
			"status": "UP",
		})
	}
}
