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

const sx = {
  position: 'absolute',
  top: 20,
  left: 20,
};

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
        <div style={sx}>
          <Logo height={60} />
        </div>
        <Space />
        <Link onClick={this.toggleModal.bind(this, 'about')}>About</Link>

        <Modal 
          onClose={this.toggleModal.bind(this, 'about')} 
          open={this.state.about}
        >
          About the awesome movement!
        </Modal>
      </Container>
    );
  }
}

export default TopNav;
