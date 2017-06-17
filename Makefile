# Builds app for linux and deploys to heroku
deploy:
	@echo "Building go app to 'bin/heroku"
	@echo 
	@GOOS=linux go build -o bin/heroku
	@echo "Creating temporary git branch to deploy to heroku"
	@echo
	@git checkout -b build
	@git add ./bin/heroku
	@git commit -m "build commit"
	@git push heroku build:master --force
	@git checkout master
	@git branch -D build
	@rm -rf bin

# Starts up the local backend api
dev: 
	@echo "Building"
	@go build 
	./izzy -trace

build-ui:
	cd ./frontend
	npm start

deploy-ui:
	cd ./frontend
	@echo "Building UI and deploying to netlify"
	npm run deploy

.PHONY: deploy dev build-ui 
