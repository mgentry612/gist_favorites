import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: 'hofmannsven'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({username: event.target.value});
    }

    async handleSubmit(event) {
      event.preventDefault();
      this.props.onListChange(this.state.username);
    }

    render() {
        return (
            <form className="Form" onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.username} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
                <br/>
                <br/>
                <br/>
            </form>
        );
    }
}

export default Form;
