import { h, Component } from 'preact';
import styled, { ThemeProvider } from 'styled-components';
import { colors, fonts } from 'styles';
import CardEntryForm from './CardEntryForm';

const Header = styled.h1`
  color: ${colors.black};
`
const Wrapper = styled.div`
  min-height: 100vh;
  max-width: 100%;
  background: linear-gradient(135deg, #182848, #4B6CB7);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 30px;
`

const Title = styled.h1`
  color: white;
  font-size: 2em;
  font-family: ${fonts.primary};
  letter-spacing: 0.2rem;
  font-weight: ${props => props.bold ? 700 : 100};
`

const SubTitle = styled.h3`
  color: rgba(255,255,255,.7);
  font-size: 1.2em;
  font-family: ${fonts.primary};
  letter-spacing: 0.1rem;
  font-weight: ${props => props.bold ? 700 : 100};
`

const Cards = styled.p`
  font-size: 5em;
  color: white;
  margin: 40px;
`

const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.column ? 'column' : 'row'};
  align-items: ${props => props.center ? 'center' : ''};
`

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
      const ws = process.env.NODE_ENV === 'production' ? 'wss' : 'ws';
      this.socket = new WebSocket(`${ws}://${document.location.host}/ws`);
      this.socket.onopen = () => console.log('Connection opened');
      this.socket.onclose = () => console.log('Connection closed');
      this.socket.onmessage = e => {
        const entry = JSON.parse(e.data);
        this.setState({cards: this.state.cards + entry.count});
      }
    }

    fetch('/api/count')
      .then(response => response.json())
      .then(({Count}) => {
        this.setState({cards: Count});
      });
  }

  handleSend = (values) => {
    fetch('/api/count', {
      method: 'POST',
      body: JSON.stringify(values),
    });
  }

  render() {
    return (
      <Wrapper>
        <Flex column center>
          <Title bold>Elevating the level of gratitude on the planet by 1%.</Title>
          <Title>One card at a time.</Title>
          <Cards>{this.state.cards}</Cards>
        </Flex>
        <div>
          <SubTitle>Cards sent to date. Submit yours: </SubTitle>
          <CardEntryForm onSubmit={this.handleSend} />
        </div>
      </Wrapper>
    );
  }
}

export default App;
