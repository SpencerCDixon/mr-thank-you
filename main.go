package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/spencercdixon/izzy/db"
	"github.com/spencercdixon/izzy/models"
	"github.com/spencercdixon/izzy/trace"
)

// Main is in charge of orchestrating all the required configuration and routing
// for the app to run successfully in various environments: dev/prod.
func main() {
	// env flags
	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("Error: PORT must be defined")
	}

	shouldTrace := flag.Bool("trace", false, "Bool to turn debug tracing on/off to stdout")

	// Parse server options
	flag.Parse()

	// Setup DB
	postgres := db.Connect()
	defer postgres.Close()

	// Create room for clients and configure based on flags
	r := newRoom(postgres)
	if *shouldTrace {
		r.tracer = trace.New(os.Stdout)
	}

	// Handle endpoints
	http.Handle("/", http.FileServer(http.Dir("./dist")))

	// TODO: Refactor this and handle all errors
	http.HandleFunc("/api/count", func(w http.ResponseWriter, req *http.Request) {
		s := db.CardEntryService{postgres}

		if req.Method == "GET" {
			count, err := s.Count()
			if err != nil {
				fmt.Println("failed getting count")
				log.Fatal(err)
			}
			jr := struct{ Count int }{count}
			b, _ := json.Marshal(jr)
			w.Write(b)
			return
		}

		if req.Method == "POST" {
			var entry models.CardEntry
			decoder := json.NewDecoder(req.Body)
			err := decoder.Decode(&entry)

			if err != nil {
				fmt.Println("failed decoding")
				log.Fatal(err)
			}

			_, err = s.Create(&entry)

			if err != nil {
				fmt.Println("failed creating")
				log.Fatal(err)
			}
			r.forward <- &entry
			return
		}
	})
	http.Handle("/ws", r)

	// get the room going
	go r.run()

	// start web server
	log.Println("Starting web server on", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal("Listen and serve", err)
	}
}
