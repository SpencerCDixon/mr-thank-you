package main

import (
	"fmt"
	"log"

	"github.com/gorilla/websocket"
	"github.com/spencercdixon/izzy/db"
	"github.com/spencercdixon/izzy/models"
)

// client represents every user currently connected
type client struct {
	// websocket for this user
	socket *websocket.Conn
	// send is a channel on which messages are sent to the client
	send chan *models.CardEntry
	// room is the room this client is in
	room *room
}

func (c *client) read() {
	var entry models.CardEntry
	for {
		if err := c.socket.ReadJSON(&entry); err == nil {
			service := db.CardEntryService{c.room.db}
			_, err := service.Create(&entry)
			if err != nil {
				log.Fatal(err)
			}
			c.room.forward <- &entry
		} else {
			fmt.Println(err)
			break
		}
	}
	c.socket.Close()
}

func (c *client) write() {
	for entry := range c.send {
		fmt.Println(entry)
		if err := c.socket.WriteJSON(entry); err != nil {
			break
		}
	}
	c.socket.Close()
}
