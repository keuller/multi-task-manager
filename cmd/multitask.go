package main

import (
	"log"

	"github.com/keuller/multi-task-manager/pkg/api"
	"github.com/keuller/multi-task-manager/pkg/app"
)

func main() {
	server := app.New()
	api.RegisterUser(server)
	api.RegisterProject(server)

	log.Println("Up and running at http://0.0.0.0:3000")
	server.Start("0.0.0.0:3000")
}
