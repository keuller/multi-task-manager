package user

import (
	"errors"
	"time"

	"github.com/google/uuid"
	c "github.com/keuller/multi-task-manager/pkg/common"
	m "github.com/keuller/multi-task-manager/pkg/domain/model"
)

type UserService struct {
	repo UserRepository
}

func NewUserService(repo UserRepository) UserService {
	return UserService{repo}
}

func (s UserService) AddUser(data m.RegisterUserRequest) (string, error) {
	_, err := s.repo.FindByEmail(data.Email)
	if err == nil {
		return "", errors.New("There is an user with the same email")
	}

	value := uuid.Must(uuid.NewRandom())
	s.repo.Add(m.User{
		ID:        value.String(),
		Name:      data.Name,
		Email:     data.Email,
		Password:  data.Password,
		CreatedAt: time.Now(),
	})

	return "User registered successfuly.", nil
}

func (s UserService) Authenticate(email, password string) (m.AuthResponse, error) {
	user, err := s.repo.Authenticate(email, password)
	if err != nil {
		return m.AuthResponse{}, err
	}

	token, err := c.CreateToken(user)
	if err != nil {
		return m.AuthResponse{}, err
	}

	return m.AuthResponse{
		Status: "OK",
		Token:  token,
	}, nil
}

func (s UserService) GetAll() []m.UserResponse {
	result := make([]m.UserResponse, 0)
	users := s.repo.FetchAll()
	for _, u := range users {
		result = append(result, m.UserResponse{
			ID:    u.ID,
			Name:  u.Name,
			Email: u.Email,
		})
	}
	return result
}
