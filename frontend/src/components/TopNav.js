import { h, Component } from 'preact';
import Logo from './Logo.js';
import Link from './Link.js';
import Modal from './Modal.js';
import styled from 'styled-components';
import { flex } from 'styles';

const Container = styled.div`
  ${flex.row}
  ${flex.alignCenter}
  height: 75px;
  padding: 0 30px;
`
const Space = styled.div`
  ${flex.auto}
`

class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = { about: false, buy: false };
  }

  toggleModal(modal) {
    this.setState({[modal]: !this.state[modal]});
  }

  render() {
    return (
      <Container>
        <Logo />
        <Space />
        <Link onClick={this.toggleModal.bind(this, 'about')}>About</Link>
        <Link onClick={this.toggleModal.bind(this, 'buy')}>Buy Cards</Link>

        <Modal 
          onClose={this.toggleModal.bind(this, 'about')} 
          open={this.state.about}
        >
          About the awesome movement!
        </Modal>

        <Modal 
          onClose={this.toggleModal.bind(this, 'buy')} 
          open={this.state.buy}
        >
          Here is how you buy cards!
        </Modal>
      </Container>
    );
  }
}

export default TopNav;
