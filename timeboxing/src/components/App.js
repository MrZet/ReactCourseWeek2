import React, { Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';
import LoginForm from './LoginForm';
import AuthenticationApi from '../api/FetchAuthenticationApi';
import AuthenticationContext from '../contexts/AuthenticationContext';

const AuthenticatedApp = React.lazy(() => import ('./AuthenticatedApp'));

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
                            <AuthenticationContext.Provider value = { {accessToken : this.state.accessToken}}>
                                <Suspense fallback='loading...'>
                                    <AuthenticatedApp onLogout = {this.handleLogout}/>
                                </Suspense>
                            </AuthenticationContext.Provider>
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