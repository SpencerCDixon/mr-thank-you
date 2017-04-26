package models

type CardEntry struct {
	Name  string `json:"name"`
	Email string `json:"email"`
	Count int    `json:"count"`
}

type CardService interface {
	// Find(id int) (*CardEntry, error)
	Create(ce *CardEntry) error
	Count() (int, error)
}
