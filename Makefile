deploy:
	GOOS=linux go build -o bin/heroku

.PHONY: deploy
