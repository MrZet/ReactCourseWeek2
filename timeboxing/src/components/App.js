import React from 'react'
import TimeboxList from './TimeboxList';
import EditableTimebox from './EditableTimebox';
import RealTimeClock from './RealTimeClock';
import ErrorBoundary from './ErrorBoundary';
import LoginForm from './LoginForm';
import AuthenticationApi from '../api/FetchAuthenticationApi'
import Jwt from 'jsonwebtoken'

class App extends React.Component 
{ 
    state = {
        accessToken : null,
        previousLoginAttemptFailed: false
    }

    isUserLoggedIn() {
        return !!this.state.accessToken;
    }

    getUserEmail(){
        return Jwt.decode(this.state.accessToken).email;
    }

    handleLoggingAttempt = (credentials) => {
        AuthenticationApi.login(credentials)
        .then(({accessToken}) => {
            this.setState({
                accessToken,
                previousLoginAttemptFailed : false
            })
        })
        .catch((error) => {
            this.setState({
                previousLoginAttemptFailed : true
            })
        });
    }

    handleLogout = () => {
        this.setState({
            accessToken : null,
            previousLoginAttemptFailed : false
        })
    }

    render(){
        return(
            <React.StrictMode>
                <div className="App">
                    <ErrorBoundary message="Error in App!">
                        { this.isUserLoggedIn() ? 
                            <>
                                <header className="header">
                                    Hi {this.getUserEmail()}
                                    <a className="header__logout-link" onClick={this.handleLogout} href="">Sign out</a>
                                </header>
                                <RealTimeClock/>
                                <TimeboxList/>
                                <EditableTimebox/>
                            </>
                            :<LoginForm 
                                errorMessage = {this.state.previousLoginAttemptFailed ? "Logging is not available." : null}
                                onLoginAttempt = {this.handleLoggingAttempt}
                            />
                        }                        
                    </ErrorBoundary>
                </div>
            </React.StrictMode>)
    }
} 

export default App;