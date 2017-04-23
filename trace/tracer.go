package trace

import (
	"fmt"
	"io"
)

// Tracer is an interface that describes objects capable of tracing events
// occuring throughout the code
type Tracer interface {
	Trace(...interface{})
}

type tracer struct {
	out io.Writer
}

func (t *tracer) Trace(a ...interface{}) {
	t.out.Write([]byte(fmt.Sprint(a...)))
	t.out.Write([]byte("\n"))
}

// Tracer stub that won't actually do anything
type nilTracer struct{}
func (nt *nilTracer) Trace(a ...interface{}) {}

// Accepting a Writer for our tracer gives us more flexibility to trace to
// various places.  We could even use a multiwriter to write to two places at
// once!
func New(w io.Writer) Tracer {
	return &tracer{out: w}
}

func Off() Tracer {
	return &nilTracer{}
}
