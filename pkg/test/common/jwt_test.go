package common

import (
	"testing"

	c "github.com/keuller/multi-task-manager/pkg/common"
	m "github.com/keuller/multi-task-manager/pkg/domain/model"
	. "github.com/onsi/gomega"
)

var (
	usr = m.User{
		ID:       "80b5efb5-9baa-4e2d-a3cc-10cd77c76aec",
		Name:     "User Test",
		Email:    "user@test.com",
		Password: "123456",
	}
)

func TestCreateToken(t *testing.T) {
	RegisterTestingT(t)

	token, err1 := c.CreateToken(usr)
	if err1 != nil {
		t.Fatal(err1)
	}

	Expect(token).ShouldNot(Equal(""))
}

func TestDecodeToken(t *testing.T) {
	RegisterTestingT(t)

	token, _ := c.CreateToken(usr)
	data, err := c.DecodeToken(token)
	if err != nil {
		t.Fatal(err)
	}

	Expect(len(data)).ShouldNot(Equal(0))
	Expect(data["user_id"]).Should(Equal("80b5efb5-9baa-4e2d-a3cc-10cd77c76aec"))
	Expect(data["name"]).Should(Equal("User Test"))
}
