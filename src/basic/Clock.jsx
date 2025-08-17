import React from 'react';
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date()
        };
        console.log("Clock created");
    }

    componentDidMount() {
        console.log('Clock mounted');
        this.timerId = setInterval(
            () => this.setState({
                time: new Date()
            }),
            1000
        );
    }
    componentWillUnmount() {
        console.log('Clock will unmounted');
        clearInterval(this.timerId);
    }

    render() {
        return (
            <>
                <h2>Time: {this.state.time.toLocaleTimeString()}.</h2>
            </>
        );
    }
}
export default Clock;