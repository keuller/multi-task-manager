package model

import "time"

type User struct {
	ID        string
	Name      string
	Email     string
	Password  string
	CreatedAt time.Time
}

type RegisterUserRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type AuthRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UserResponse struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

type AuthResponse struct {
	Status string `json:"status"`
	Token  string `json:"token"`
}
