.PHONY: clean

clean:
	@rm -f dccard
	@rm -Rf dist
	@rm *.tar.gz

run:
	@go run cmd/multitask.go

build:
	@go build -o dccard -ldflags="-s -w" cmd/main.go
	@echo "Binary generated"

test:
	@go test -v ./pkg/test/...