package marketing

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"os"
	"strconv"
)

const mailChimpBaseUrl = "https://us16.api.mailchimp.com/3.0"

func Post(url string, body io.Reader) (*http.Response, error) {
	apiKey := os.Getenv("MAILCHIMP_API_KEY")
	client := http.Client{}
	req, _ := http.NewRequest("POST", mailChimpBaseUrl+url, body)
	req.SetBasicAuth("mrthankyou", apiKey)
	return client.Do(req)
}

func AddToList(email, name string, cards int) (*http.Response, error) {
	req := struct {
		Email  string            `json:"email_address"`
		Status string            `json:"status"`
		Merge  map[string]string `json:"merge_fields"`
	}{
		Email:  email,
		Status: "subscribed",
		Merge: map[string]string{
			"NAME":     name,
			"NUMCARDS": strconv.Itoa(cards),
		},
	}

	json, _ := json.Marshal(req)
	body := bytes.NewReader(json)
	url := "/lists/f7eb59b898/members"
	return Post(url, body)
}
