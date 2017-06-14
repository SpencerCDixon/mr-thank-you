package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"github.com/spencercdixon/izzy/db"
	"github.com/spencercdixon/izzy/marketing"
	"github.com/spencercdixon/izzy/models"
	"github.com/spencercdixon/izzy/trace"
)

func main() {
	// load 12factor configuration in development
	if _, err := os.Stat("./.env"); err == nil {
		godotenv.Load()
		if err != nil {
			log.Fatal(err)
		}
	}

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
	// Set up cors
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
	})

	count := http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
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
			}

			marketing.AddToList(entry.Email, entry.Name, entry.Count)

			_, err = s.Create(&entry)

			if err != nil {
				fmt.Println("failed creating")
			}
			r.forward <- &entry
			return
		}
	})

	ping := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("{\"pong\": \":)\"}"))
	})

	http.Handle("/api/count", c.Handler(count))
	http.Handle("/ws", c.Handler(r))
	http.Handle("/ping", c.Handler(ping))

	// get the room going
	go r.run()

	// start web server
	log.Println("Starting web server on", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal("Listen and serve", err)
	}
}
