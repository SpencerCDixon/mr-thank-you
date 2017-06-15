import { h, Component } from "preact";
import styled from "styled-components";
import { fonts, colors } from "styles";

const Flex = styled.div` 
  display: flex; flex-direction: ${props => (props.column ? "column" : "row")}; 
  align-items: ${props => (props.center ? "center" : "")}; 
`;

const Input = styled.input` 
  --bg: ${props => (props.error ? colors.red : props.success ? colors.green : colors.black)} 
  font-size: 1.25em; 
  padding: 0.85em; 
  margin: 0.5em 0em; 
  color: #757575; 
  border: none; 
  border-radius: 3px; 
  border-color: ${props => (props.error ? colors.red : "")}; 
  -webkit-appearance: none; 
  box-shadow: 0 1px 0 0 var(--bg), 0 2px 0 0 var(--bg), 0 3px 0 0 var(--bg), 0 4px 0 0 var(--bg); 
  &:focus { 
    outline: none; 
  } 
`;

const Button = styled.button` 
  color: white; 
  font-family: ${fonts.primary}; 
  background: ${colors.red}; 
  padding: 1em; border-radius: 3px; 
  margin: 0.5em 0em; border: none; 
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
`;

class CardEntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", name: "", count: "", errors: {}, valid: {} };
  }
  handleChange = (prop, e) => {
    this.setState({ [prop]: e.target.value });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({
      email: this.state.email,
      name: this.state.name,
      count: parseInt(this.state.count, 10)
    });
    this.setState({ email: "", name: "", count: "", errors: {}, valid: {} });
  }

  handleBlur = (field, e) => {
    const val = e.target.value;
    if (val.length === 0) {
      this.setState({
        errors: { ...this.state.errors, [field]: true },
        valid: { ...this.state.valid, [field]: false }
      });
    } else {
      this.setState({
        errors: { ...this.state.errors, [field]: false },
        valid: { ...this.state.valid, [field]: true }
      });
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
            onChange={this.handleChange.bind(this, "name")}
            onBlur={this.handleBlur.bind(this, "name")}
            error={this.state.errors.name}
            success={this.state.valid.name}
            value={this.state.name}
            placeholder="Name"
          />
          <Input
            type="text"
            onChange={this.handleChange.bind(this, "email")}
            onBlur={this.handleBlur.bind(this, "email")}
            error={this.state.errors.email}
            success={this.state.valid.email}
            value={this.state.email}
            placeholder="Email"
          />
          <Input
            type="number"
            onChange={this.handleChange.bind(this, "count")}
            onBlur={this.handleBlur.bind(this, "count")}
            error={this.state.errors.count}
            success={this.state.valid.count}
            value={this.state.count}
            placeholder="# of cards sent"
          />
          {" "}
          <Button onClick={this.handleSubmit} type="submit" disabled={hasError}>
            Submit
          </Button>
        </Flex>
      </form>
    );
  }
}
export default CardEntryForm;
