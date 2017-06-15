import { h, Component } from 'preact';
import Logo from './Logo.js';
import Link from './Link.js';
import Modal from './Modal.js';
import styled from 'styled-components';
import { media, flex } from 'styles';

const Container = styled.div`
  ${flex.row}
  ${flex.alignCenter}
  height: 75px;
  padding: 0 30px;
`
const Space = styled.div`
  ${flex.auto}
`


const LogoContainer = styled.div`
  position: absolute;
  top: 25px;
  left: 30px;
  ${media.handheld`
    top: 10px;
    left: 10px;
  `}
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
        <LogoContainer>
          <Logo height={60} />
        </LogoContainer>

        <Space />
        {/* <Link onClick={this.toggleModal.bind(this, 'about')}>About</Link> */}

        <Modal 
          onClose={this.toggleModal.bind(this, 'about')} 
          open={this.state.about}
        >
        </Modal>
      </Container>
    );
  }
}

export default TopNav;
