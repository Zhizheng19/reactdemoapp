import React, {Component} from 'react';

class ClassCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            msg: "hello, react"
        };
    };

    handleClick = (type) => {
        this.setState({
                number: this.state.number + (type === "plus" ? 10: -10)
        })
    };
    render() {
        const {number, msg} = this.state;
        return (
            <>
                <h2>{msg}, How to use state in Class Component</h2>
                <p>the number is {number}</p>
                <button onClick={()=>this.handleClick("plus")}>+10</button>
                <button onClick={()=>this.handleClick("minus")}>-10</button>
            </>
        );
    }
}
export default ClassCom;