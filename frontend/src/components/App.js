import { h, Component } from 'preact';
import styled, { ThemeProvider } from 'styled-components';
import { media, colors, fonts } from 'styles';
import CountUp from 'react-countup';
import CardEntryForm from './CardEntryForm';
import TopNav from './TopNav';
import { websocketUrl, apiUrl } from '../util/api';

const Wrapper = styled.div`
  min-height: calc(100vh - 75px);
  max-width: 100%;
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
  text-align: center;
  ${media.handheld`
    font-size: 1.4em;
    text-align: center;
  `}
`

const SubTitle = styled.h3`
  color: rgba(255,255,255,.7);
  font-size: 1.2em;
  font-family: ${fonts.primary};
  letter-spacing: 0.1rem;
  font-weight: ${props => props.bold ? 700 : 100};
  margin: .2em 0;
  ${media.handheld`
    font-weight: 300;
    font-size: .8em;
  `}
`

const Cards = styled.p`
  font-size: 5em;
  color: white;
  margin: 10px;
  ${media.handheld`
    margin: 10px;
  `}
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
      console.error('This browser doesnt support websockets');
    } else {
      this.socket = new WebSocket(websocketUrl);
      this.socket.onmessage = e => {
        const entry = JSON.parse(e.data);
        this.setState({cards: this.state.cards + entry.count});
      }
    }

    fetch(`${apiUrl}/api/count`)
      .then(response => response.json())
      .then(({Count}) => {
        this.setState({cards: Count});
      });
  }

  handleSend = (values) => {
    fetch(`${apiUrl}/api/count`, {
      method: 'POST',
      body: JSON.stringify(values),
    });
  }

  render() {
    return (
      <div class="bg">
        <TopNav />

        <Wrapper>
          <Flex column center>
            <Title bold>Elevating the level of gratitude on the planet by 1%.</Title>
            <Title>One card at a time.</Title>
            <Cards>
              {this.state.cards}
            </Cards>
          </Flex>
          <div>
            <SubTitle>Cards sent to date. Submit yours: </SubTitle>
            <CardEntryForm onSubmit={this.handleSend} />
          </div>
        </Wrapper>
      </div>
    );
  }
}

export default App;
