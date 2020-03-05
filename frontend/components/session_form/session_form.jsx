import React from 'react';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            location: '',
            // artist: 'true'

        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    
    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    }

    renderErrors() {
        return (
            <ul>
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    signupFields() {
        if (this.props.formType === 'signup')
        {    
            return(
                <label> <br/> Email:
                    <input type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                    />
                </label>
            )
        }
    }

    guestUserLoginButton() {
        if (this.props.formType === 'login') {
            return (
                <div>
                    <br/>
                    <button type="button" onClick={() => this.props.guestLogin()}>Guest User Login
                    </button>
                </div>
            );
        }
    }
    
    render() {
        return (
            <div className="login-form-container">
                <form onSubmit={this.handleSubmit} className="login-form-box">
                    <h1>Welcome to Stereo!</h1>
                <br />
                    Please {this.props.formType}, or {this.props.otherForm}
                    {this.renderErrors()}
                {   this.guestUserLoginButton()}
                    <div className="login-form">

                        <br />
                        <h3>Username:</h3>
              <input type="text"
                                value={this.state.username}
                                onChange={this.update('username')}
                            />
                        

                        <br />
                        <h3>Password: </h3>
              <input type="password"
                                value={this.state.password}
                                onChange={this.update('password')}
                            />
                        {this.signupFields()}
                 
                        <br />
                        <input className="session-submit" type="submit" value={this.props.formType} />
                    </div>
                </form>
            </div>
        );
    }
}

export default SessionForm;
