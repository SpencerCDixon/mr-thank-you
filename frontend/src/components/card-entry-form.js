import { h, Component } from 'preact';

class CardEntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      count: '',
    }
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
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          onChange={this.handleChange.bind(this, 'name')} 
          placeholder="Name"
        />

        <br />

        <input 
          type="text" 
          onChange={this.handleChange.bind(this, 'email')} 
          placeholder="Email"
        />

        <br />

        <input 
          type="number" 
          onChange={this.handleChange.bind(this, 'count')} 
          placeholder="Cards Sent"
        />
        
        <button onClick={this.handleSubmit} type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default CardEntryForm;
