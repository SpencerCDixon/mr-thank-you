import { h, Component } from 'preact';
import styled from 'styled-components';
import { fonts, colors } from 'styles';

const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.column ? 'column' : 'row'};
  align-items: ${props => props.center ? 'center' : ''};
`

const Input = styled.input`
  font-size: 1.25em;
  padding: 0.85em;
  margin: 0.5em 0em;
  color: #757575;
  border: ${props => props.error ? '2px solid' : 'none'};
  border-radius: 3px;
  border-color: ${props => props.error ? colors.red : ''};
  -webkit-appearance: none;

  &:hover {
    box-shadow: inset 1px 1px 2px rgba(0,0,0,0.1);
    -webkit-appearance: none;
    outline: none;
  }
  &:active {
    box-shadow: 0 5px 15px 0 rgba(0,0,0,0.3);
    -webkit-appearance: none;
    outline: none;
  }
  &:focus {
    box-shadow: 0 5px 15px 0 rgba(0,0,0,0.3);
    -webkit-appearance: none;
    outline: none;
  }
`

const Button = styled.button`
  color: white;
  font-family: ${fonts.primary};
  background: ${colors.red};
  padding: 1em;
  border-radius: 3px;
  margin: 0.5em 0em;
  border: none;
  font-size: 1.25em;

  &:hover {
    cursor: pointer;
    box-shadow: 0 5px 15px 0 rgba(0,0,0,0.3);
    -webkit-appearance: none;
    outline: none;
  }
  &:disabled {
    box-shadow: none;
    cursor: not-allowed;
    background: rgba(255, 117, 117, 0.72);
  }
`

class CardEntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', name: '', count: '', errors: {} };
  }

  handleChange = (prop, e) => {
    this.setState({[prop]: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.onSubmit({
      email: this.state.email,
      name: this.state.name,
      count: parseInt(this.state.count, 10),
    });
    this.setState({email: '', name: '', count: '', errors: {}});
  }

  handleBlur = (field, e) => {
    const val = e.target.value;

    if (val.length === 0) {
      this.setState({errors: { ...this.state.errors, [field]: true }});
    } else {
      this.setState({errors: { ...this.state.errors, [field]: false }});
    }
  }

  render() {
    const { errors } = this.state;
    const hasError = errors.email || errors.name || errors.count;

    return (
      <form onSubmit={this.handleSubmit}>
        <Flex column>
          <Input 
            type="text" 
            onChange={this.handleChange.bind(this, 'name')} 
            onBlur={this.handleBlur.bind(this, 'name')}
            error={this.state.errors.name}
            value={this.state.name}
            placeholder="Name"
          />

          <Input 
            type="text" 
            onChange={this.handleChange.bind(this, 'email')} 
            onBlur={this.handleBlur.bind(this, 'email')}
            error={this.state.errors.email}
            value={this.state.email}
            placeholder="Email"
          />

          <Input 
            type="number" 
            onChange={this.handleChange.bind(this, 'count')} 
            onBlur={this.handleBlur.bind(this, 'count')}
            error={this.state.errors.count}
            value={this.state.count}
            placeholder="# of cards sent"
          />

          <Button 
            onClick={this.handleSubmit} 
            type="submit"
            disabled={hasError}
          >
            Submit
          </Button>
        </Flex>
      </form>
    );
  }
}

export default CardEntryForm;
