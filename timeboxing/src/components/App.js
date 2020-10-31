import React from 'react';
import TimeboxList from './TimeboxList';
import EditableTimebox from './EditableTimebox';
import RealTimeClock from './RealTimeClock';
import ErrorBoundary from './ErrorBoundary';
import LoginForm from './LoginForm';
import AuthenticationApi from '../api/FetchAuthenticationApi';
import UserGreeting from './UserGreeting';

class App extends React.Component 
{ 
    state = {
        accessToken : null,
        previousLoginAttemptFailed: false
    }

    isUserLoggedIn() {
        return !!this.state.accessToken;
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
                                    <UserGreeting accessToken = {this.state.accessToken}/>
                                    <a className="header__logout-link" onClick={this.handleLogout} href="">Sign out</a>
                                </header>
                                <RealTimeClock/>
                                <TimeboxList accessToken = {this.state.accessToken} />
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