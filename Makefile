IMAGE_NAME=todo-list-monngodb
SERVICE_PORT=8080
USER_NAME = 'admin'
USER_PASSWORD = 'ilimit123'
DB_IP = '192.168.1.136'
DB_PORT = '27017'
DB_AUTH = 'admin'
DB_NAME = 'test'

build:
	docker build -t todo-list-monngodb .

run:
	docker run -p $(SERVICE_PORT):$(SERVICE_PORT) --name='todo-list-monngodb' -e USER_NAME=$(USER_NAME) -e USER_PASSWORD=$(USER_PASSWORD) -e DB_IP=$(DB_IP) -e DB_PORT=$(DB_PORT) -e DB_AUTH=$(DB_AUTH) -e DB_NAME=$(DB_NAME) todo-list-monngodb


# build-todo:
# 	docker build -t todo-list-monngodb . --build-arg MODE=index.js

# build-generator:
# 	docker build -t generator-mongodb . --build-arg MODE=task-generator.js

# run-todo:
# 	docker run -p $(SERVICE_PORT):$(SERVICE_PORT) --name='todo-list-monngodb' -e USER_NAME=$(USER_NAME) -e USER_PASSWORD=$(USER_PASSWORD) -e DB_IP=$(DB_IP) -e DB_PORT=$(DB_PORT) -e DB_AUTH=$(DB_AUTH) -e DB_NAME=$(DB_NAME) todo-list-monngodb 

# run-generator:
# 	docker run -p $(SERVICE_PORT):$(SERVICE_PORT) --name='generator-monngodb' -e USER_NAME=$(USER_NAME) -e USER_PASSWORD=$(USER_PASSWORD) -e DB_IP=$(DB_IP) -e DB_PORT=$(DB_PORT) -e DB_AUTH=$(DB_AUTH) -e DB_NAME=$(DB_NAME) generator-mongodb
