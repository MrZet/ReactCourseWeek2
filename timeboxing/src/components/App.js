import React from 'react'
import TimeboxList from './TimeboxList';
import EditableTimebox from './EditableTimebox';
import RealTimeClock from './RealTimeClock';
import ErrorBoundary from './ErrorBoundary';
import LoginForm from './LoginForm';

class App extends React.Component 
{ 
    isUserLoggedIn() {
        return false;
    }

    getUserEmail(){
        return "test@hotmail.com";
    }

    handleLogout = () => {
        console.log("Log out clicked.")
    }

    handleLoggingAttempt = () => {
        console.log("Logging attempt handler.")
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
                                errorMessage = "Logging is not available."
                                onLoggingAttempt = {this.handleLoggingAttempt}
                            />
                        }                        
                    </ErrorBoundary>
                </div>
            </React.StrictMode>)
    }
} 

export default App;