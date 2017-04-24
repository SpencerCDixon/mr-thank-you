# Builds app for linux and deploys to heroku
deploy:
	@echo "Building go app to 'bin/heroku"
	@GOOS=linux go build -o bin/heroku

dev:
	@echo "Building"
	PORT=8080 go build && ./izzy -trace

build-ui:
	cd ./frontend
	npm start

# Starts the app on port 8080
start:
	PORT=8080 ./izzy

.PHONY: deploy dev build-ui start
