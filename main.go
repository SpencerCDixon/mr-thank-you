package main

import (
	"flag"
	"log"
	"net/http"
	"os"

	"github.com/spencercdixon/izzy/db"
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
	db := db.Connect()
	defer db.Close()

	// Create room for clients and configure based on flags
	r := newRoom(db)
	if *shouldTrace {
		r.tracer = trace.New(os.Stdout)
	}

	// Handle endpoints
	http.Handle("/", http.FileServer(http.Dir("./dist")))
	http.Handle("/ws", r)

	// get the room going
	go r.run()

	// start web server
	log.Println("Starting web server on", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal("Listen and serve", err)
	}
}
