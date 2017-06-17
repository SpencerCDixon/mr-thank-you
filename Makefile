# Builds app for linux and deploys to heroku
deploy:
	@echo "Building go app to 'bin/heroku'"
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

# Starts up the local backend api for development and webpack for UI
dev: 
	@echo "Killing any running servers..."
	@pgrep izzy && killall izzy || true
	@echo "Building API..."
	@go build 
	@echo "Booting up API..."
	./izzy -trace &
	@cd ./frontend; npm start

# Builds and deploys the UI
deploy-ui:
	@cd ./frontend; \
	echo "Building UI and deploying to netlify"; npm run deploy
	open https://mrthankyou.com

# Builds and deploys both the backend and frontend to Heroku/Netlify
deploy-all: deploy deploy-ui

.PHONY: deploy dev deploy-ui deploy-all
