package db

import (
	"database/sql"
	"os"

	_ "github.com/lib/pq"
	"github.com/spencercdixon/izzy/models"
)

func Connect() *sql.DB {
	var finalUrl string
	local := "user=spence dbname=izzy_dev sslmode=disable"
	url := os.Getenv("DATABASE_URL")
	if len(url) > 0 {
		finalUrl = url
	} else {
		finalUrl = local
	}

	db, err := sql.Open("postgres", finalUrl)
	checkErr(err)
	return db
}

// Card Entry Service
type CardEntryService struct {
	DB *sql.DB
}

func (s *CardEntryService) Create(c *models.CardEntry) (int, error) {
	var lastInsertId int
	err := s.DB.QueryRow(
		`INSERT INTO card_entries (name, email, count) VALUES ($1,$2,$3) returning id`,
		c.Name, c.Email, c.Count).
		Scan(&lastInsertId)
	return lastInsertId, err
}

// Utility
func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
