import React from 'react'

class LoginForm extends React.Component 
{
    state = {
        email:"test@hotmail.com",
        password:"asdf"
    }

    handleEmailChange = (event) => {
        this.setState({email:event.target.value})
    }

    handlePasswordChange = (event) => {
        this.setState({password:event.target.value})
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.onLoginAttempt({email:this.state.email, password:this.state.password});
        this.setState({email:"", password:""})
    }
    render(){
        return (
            <form 
                onSubmit={this.handleSubmit}
                className="LoginForm">
                <div className = "LoginForm__error-message">{this.props.errorMessage}</div>
                <label>Email: 
                    <input 
                        type="text"
                        onChange = {this.handleEmailChange}
                        value = {this.state.email}
                        />
                </label><br/>
                <label>Password: 
                    <input
                        type="password"
                        onChange = {this.handlePasswordChange}
                        value = {this.state.password}
                    />
                </label><br/>
                <button>Log in</button>
            </form>
        )
    }
}

export default LoginForm; 