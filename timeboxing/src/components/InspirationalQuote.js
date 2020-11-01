import React from 'react';

class InspirationalQuote extends React.Component
{
    state = {
        quote : null
    }

    componentDidMount() {
        import('inspirational-quotes')
        .then(
            (Quotes) => {
                this.setState({quote : Quotes.getQuote() })
            }
        )
        .catch((error) => { console.log("Error: Couldn't show quote.")});
    }

    render() {
        return(
            <>
                { this.state.quote ?
                    <figure>
                        <blockquote>{this.state.quote.text}</blockquote>
                        <figcaption><cite>{this.state.quote.author}</cite></figcaption>
                    </figure>
                    : "..."
                }
            </>
        );
    }
}

export default InspirationalQuote;