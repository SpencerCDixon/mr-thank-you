package main

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/spencercdixon/izzy/models"
	"github.com/spencercdixon/izzy/trace"
)

type room struct {
	// channel that holds the messages that should be sent to all other clients
	forward chan *models.CardEntry
	// join is a channel for clients wishing to join the site
	join chan *client
	// leave is a channel for clients wishing to leave site
	leave chan *client
	// holds all current clients visiting the site
	clients map[*client]bool
	// will receive trace information of activity and display it
	tracer trace.Tracer
	// connection to db
	db *sql.DB
}

const (
	socketBufferSize  = 1024
	messageBufferSize = 256
)

func (r *room) run() {
	for {
		select {
		case client := <-r.join:
			r.clients[client] = true
			r.tracer.Trace("New client joined")
		case client := <-r.leave:
			delete(r.clients, client)
			close(client.send)
			r.tracer.Trace("Client left")
		case entry := <-r.forward:
			r.tracer.Trace(entry)
			for client := range r.clients {
				select {
				case client.send <- entry:
					// send the message
					r.tracer.Trace(" -- sent to client")
				default:
					// failed to send
					delete(r.clients, client)
					close(client.send)
					r.tracer.Trace(" -- failed to send, cleaned up client")
				}
			}
		}
	}
}

var upgrader = &websocket.Upgrader{
	ReadBufferSize:  socketBufferSize,
	WriteBufferSize: socketBufferSize,
	CheckOrigin: func(r *http.Request) bool {
		origin := r.Header.Get("Origin")
		// whitelist our webpack dev server to let it through in development
		if origin == "http://localhost:3000" {
			return true
		}
		return false
	},
}

func (r *room) ServeHTTP(w http.ResponseWriter, rq *http.Request) {
	socket, err := upgrader.Upgrade(w, rq, nil)
	if err != nil {
		log.Fatal(err)
		return
	}

	client := &client{
		socket: socket,
		send:   make(chan *models.CardEntry, messageBufferSize),
		room:   r,
	}
	r.join <- client
	defer func() { r.leave <- client }()
	go client.write()
	client.read()
}

func newRoom(db *sql.DB) *room {
	return &room{
		forward: make(chan *models.CardEntry),
		join:    make(chan *client),
		leave:   make(chan *client),
		clients: make(map[*client]bool),
		tracer:  trace.Off(),
		db:      db,
	}
}
