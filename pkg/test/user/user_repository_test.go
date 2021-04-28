package user

import (
	"testing"
	"time"

	m "github.com/keuller/multi-task-manager/pkg/domain"
	u "github.com/keuller/multi-task-manager/pkg/domain/user"
	. "github.com/onsi/gomega"
)

var repository u.UserRepository = u.NewUserRepository()

func TestFetchAllUsers(t *testing.T) {
	RegisterTestingT(t)

	users := repository.FetchAll()
	Expect(len(users)).Should(Equal(1))
}

func TestRegisterUser(t *testing.T) {
	RegisterTestingT(t)

	newUser := m.User{
		ID:        "70e75b00-9ae4-46ab-9283-73cd6e982041",
		Name:      "Alice Smith",
		Email:     "alice.smith@test.com",
		Password:  "12345",
		CreatedAt: time.Now(),
	}

	repository.Add(newUser)
	users := repository.FetchAll()

	Expect(len(users)).Should(Equal(2))
}

func TestAuthenticateUser(t *testing.T) {
	RegisterTestingT(t)

	user, err := repository.Authenticate("johndoe@mail.com", "abc123")
	if err != nil {
		t.Error(err)
		t.FailNow()
	}

	Expect(user.Name).Should(Equal("John Doe"))
	Expect(user.Email).Should(Equal("johndoe@mail.com"))
}

func TestFindUserByEmail(t *testing.T) {
	RegisterTestingT(t)

	user, err := repository.FindByEmail("johndoe@mail.com")
	if err != nil {
		t.Error(err)
		t.FailNow()
	}

	Expect(user.Name).Should(Equal("John Doe"))
}
