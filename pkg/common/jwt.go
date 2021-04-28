package common

import (
	"time"

	"github.com/dgrijalva/jwt-go"
	u "github.com/keuller/multi-task-manager/pkg/domain/model"
)

var SECRET = "85420-K741aq0-cNj9362"

func CreateToken(user u.User) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := make(jwt.MapClaims, 0)
	claims["id"] = user.ID
	claims["name"] = user.Name
	claims["profile"] = "user"
	claims["exp"] = time.Now().Add(time.Hour * 4).Unix()

	token.Claims = claims

	result, err := token.SignedString([]byte(SECRET))
	if err != nil {
		return "", err
	}

	return result, nil
}

func DecodeToken(value string) (map[string]string, error) {
	result := make(map[string]string, 0)

	t, err := jwt.ParseWithClaims(value, jwt.MapClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SECRET), nil
	})

	if err != nil {
		return nil, err
	}

	claims := t.Claims.(jwt.MapClaims)
	result["user_id"] = claims["id"].(string)
	result["name"] = claims["name"].(string)
	result["profile"] = claims["profile"].(string)
	return result, nil
}
