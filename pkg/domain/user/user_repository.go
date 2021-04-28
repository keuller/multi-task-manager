package user

import (
	"errors"
	"time"

	m "github.com/keuller/multi-task-manager/pkg/domain/model"
)

type UserRepository struct {
	data map[string]m.User
}

func NewUserRepository() UserRepository {
	init := map[string]m.User{
		"0dea30d0-403c-4ccb-bedd-2a43a0f2547a": m.User{
			ID:        "0dea30d0-403c-4ccb-bedd-2a43a0f2547a",
			Name:      "John Doe",
			Email:     "johndoe@mail.com",
			Password:  "abc123",
			CreatedAt: time.Now(),
		},
	}

	return UserRepository{init}
}

func (r *UserRepository) Add(user m.User) error {
	r.data[user.ID] = user
	return nil
}

func (r UserRepository) Authenticate(email, password string) (m.User, error) {
	user := m.User{}
	for _, u := range r.data {
		if u.Email == email && u.Password == password {
			return u, nil
		}
	}
	return user, errors.New("user not found")
}

func (r UserRepository) FetchAll() []m.User {
	list := make([]m.User, 0)
	for _, user := range r.data {
		list = append(list, user)
	}
	return list
}

func (r UserRepository) FindByEmail(email string) (m.User, error) {
	user := m.User{}
	for _, u := range r.data {
		if u.Email == email {
			return u, nil
		}
	}
	return user, errors.New("user not found")
}
