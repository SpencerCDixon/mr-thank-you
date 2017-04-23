deploy:
	@echo "Building go app to 'bin/heroku"
	@GOOS=linux go build -o bin/heroku

.PHONY: deploy
