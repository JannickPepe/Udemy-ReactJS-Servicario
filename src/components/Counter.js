import React, {useState, useRef, useEffect} from 'react';

function usePrevious(value)  {
    const ref = useRef()

    useEffect(() => {
        ref.current = value 
    })

    return ref.current
}

//Functional component its smaller and focus on 1 thing, usually presentation, and reusable
const Counter = props => {
    const [count, setCount] = useState(0)
    const {title, onChange} = props

    const prevCount = usePrevious(count)
    const prevTestCount = usePrevious(props.testNumber)
    

    const increment = () => {
        const newCount = count + 1
        setCount(newCount)
        onChange('increment', newCount)
    }

    const decrement = () => {
        const newCount = count - 1
        setCount(newCount)
        onChange('decrement', newCount)
    }

    return (
        <div>
            <h1>{title}</h1>
            <button onClick={increment}>increment</button>
            <div className="counter">Current: {count} </div>
            <div className="counter">Previous: {prevCount} </div>
            <h2>Current test: {props.testNumber}</h2>
            <h2>Previous test: {prevTestCount}</h2>
            <button onClick={decrement}>decrement</button>
        </div>
    )
}


/*
class Counter extends React.Component{

    state = {
        count: 0
    }

    componentDidUpdate(prevProps, prevState){
        //console.log(prevProps)
        //console.log(prevState)
    }

    increment = () => {
        const {count} = this.state
        const {onChange} = this.props
        this.setState({ count: count + 1 })
        onChange('increment', count)
    }

    decrement = () => {
        const {count} = this.state
        const {onChange} = this.props
        this.setState({ count: count - 1 })
        onChange('decrement', count)
    }


    render(){

        const { count } = this.state
        const { title } = this.props

        return (
            <div>
                <h1>{title}</h1>
                <button onClick={this.increment}>increment</button>
                <div className="counter"> {count} </div>
                <button onClick={this.decrement}>decrement</button>
            </div>
        );
    }
}
*/

export default Counter;