import React from 'react'
import propTypes from 'prop-types';

class ErrorBoundary extends React.Component{
    state = {
        hasError:false
    }

    static getDerivedStateFromError(error){
        return {hasError:true }
    }

    componentDidCatch(error,info){
        console.log("There were an error: ", error, info);
    }

    render(){
        const {message, children} = this.props;
        return(
            this.state.hasError?message:children
        )
    }
}

ErrorBoundary.propTypes = {
    message:propTypes.string.isRequired,
    children:propTypes.any.isRequired
}

export default ErrorBoundary;