import { Component } from "react";
import { useState } from "react";
import PropTypes from "prop-types";

/*functional based todo app*/
const FunctionalInput = ({ name }) => {
    const [todos, setTodos] = useState(["Just some demo tasks", "As an example"]);
    const [inputVal, setInputVal] = useState("");

    const handleInputChange = (e) => {
        setInputVal(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTodos((todo) => [...todo, inputVal]);
        setInputVal("");
    };

    return (
        <section>
            <h3>{name}</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="task-entry">Enter a task: </label>
                <input
                    type="text"
                    name="task-entry"
                    value={inputVal}
                    onChange={handleInputChange}
                />
                <button type="submit">Submit</button>
            </form>
            <h4>All the tasks!</h4>
            <ul>
                {todos.map((todo) => (
                    <li key={todo}>{todo}</li>
                ))}
            </ul>
        </section>
    );
};
/*class based todo app*/
class ClassInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: ["hello", "chezmoi"],
            inputVal: "",
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState((state) => ({
            todos: state.todos.concat(state.inputVal),
            inputVal: "",
        }));
    }
    handleInputChange(e) {
        e.preventDefault();
        this.setState((state) => ({
            ...state,
            inputVal: e.target.value,
        })) 
    }
    render() {
        return (
                <section>
                    <h3>{this.props.name}</h3>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="task-entry">Enter a task: </label>
                        <input
                            type="text"
                            name="task-entry"
                            value={this.state.inputVal}
                            onChange={this.handleInputChange}
                        />
                        <button type="submit">Submit</button>
                    </form>
                    <h4>All the tasks!</h4>
                    <ul>
                        {this.state.todos.map((todo) => (
                            <li key={todo}>{todo}</li>
                        ))}
                    </ul>
                </section>
        );
    }
}
function App() {
    return (
        <>
            <ClassInput />
        </>
    );
}

export default App;
