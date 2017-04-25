import { h, Component } from 'preact';
import CardEntryForm from './card-entry-form.js';

function websocketUrl() {
  let url
  const loc = window.location;
  url = loc.protocal === "https:" ? "wss://" : "ws://";
  url += loc.host;
  url += "/cards";
  console.log("using socket url: ", url);
  return url;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { cards: 0 };
  }

  componentDidMount() {
    if (!window["WebSocket"]) {
    // TODO: handle error gracefully
      alert('browser doesnt have websockets.. :-(');
    } else {
      this.socket = new WebSocket("ws://localhost:3000/ws");
      this.socket.onopen = () => alert('opened!');
      this.socket.onclose = () => alert('connection closed');
      this.socket.onmessage = e => {
        const entry = JSON.parse(e.data);
        this.setState({cards: this.state.cards + entry.count});
      }
    }
  }

  handleSend = (values) => {
    this.socket.send(JSON.stringify(values));
  }

  render() {
    return (
      <div>
        <h1>Cards: {this.state.cards} </h1>
        <CardEntryForm onSubmit={this.handleSend} />
      </div>
    );
  }
}

export default App;
