package main

import (
	"flag"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"sync"
	"text/template"

	"github.com/spencercdixon/izzy/db"
	"github.com/spencercdixon/izzy/trace"
)

func main() {
	// env flags
	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("Error: PORT must be defined")
	}

	shouldTrace := flag.Bool("trace", false, "Bool to turn tracing on/off to stdout")

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
	http.Handle("/", &templateHandler{filename: "chat.html"})
	http.Handle("/cards", r)

	// get the room going
	go r.run()

	// start web server
	log.Println("Starting web server on", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal("Listen and serve", err)
	}
}

type templateHandler struct {
	once     sync.Once
	filename string
	templ    *template.Template
}

func (t *templateHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	t.once.Do(func() {
		t.templ = template.Must(template.ParseFiles(filepath.Join("templates", t.filename)))
	})
	t.templ.Execute(w, r)
}
