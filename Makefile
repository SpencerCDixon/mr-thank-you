# Builds app for linux and deploys to heroku
deploy:
	@echo "Building go app to 'bin/heroku"
	@GOOS=linux go build -o bin/heroku

dev: 
	@echo "Building"
	@go build 
	./izzy -trace

build-ui:
	cd ./frontend
	npm start

.PHONY: deploy dev build-ui start
