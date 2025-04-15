# RabbitMQ Guide

This is a demo repository for RabbitMQ which creates a basic setup to send messages between two clients

In this repository, there are two Nest.Js projects: client1 and client2

Client1 is an http server while client2 handles RabbitMQ events / messages

Client 1 has 3 APIs
1. /print
2. /print-and-confirm
3. /calculate

### Print API
- Client1 is triggered via ```/print``` API
- Client1 sends an event to client2 via RabbitMQ. 
- The client2 receives the print event and prints data sent by client1

### Print And Confirm API
- Client1 is triggered via ```/print-and-confirm``` API
- Client1 sends a message to client2 via RabbitMQ. 
- The client2 receives the message and prints data sent by client1.
- Client2 also sends back data to Client1.
- Client1 receives the data sent by Client2 and prints it.

### Calculate API
- Client1 is triggered via ```/calculate``` API
- Client1 sends a message to client2 via RabbitMQ. 
- The client2 receives the message and prints data sent by client1.
- Client2 also sends back data to Client1.
- Client1 receives the data sent by Client2 and prints it.

## Setup

### Requirements
1. docker / docker-compose
2. node.js / npm

To run the project, spin up RabbitMQ using docker-compose
```
cd basic
docker-compose up --build
```
To test if RabbitMQ is running, open following link in your browser:
```
http://localhost:15672
```

Install dependencies of both the clients by navigating inside the folders and running:
```
npm install
```
Create a new ```.env``` file in both the clients and copy contents of ```.env.example``` into ```.env``` file

Spin up both the clients
```
npm run start:dev
```

Test Print API using following cURL:
```c
curl --location 'http://localhost:3001/print' \
--header 'Content-Type: application/json' \
--data '{
    "message": "Hello World"
}'
```
Test Print And Confirm API using following cURL:
```c
curl --location 'http://localhost:3001/print-and-confirm' \
--header 'Content-Type: application/json' \
--data '{
    "message": "Hello World"
}'
```
Test Calculate API using following cURL:
```c
curl --location 'http://localhost:3001/calculate' \
--header 'Content-Type: application/json' \
--data '{
    "message": "1 + 9"
}'
```