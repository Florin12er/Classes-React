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
    const removeTodo = (todoToRemove) => {
        setTodos((prevtodo) => prevtodo.filter((todo) => todo !== todoToRemove));
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
            <p>Number of todos: {todos.length}</p>
            <ul>
                {todos.map((todo) => (
                    <li key={todo}>
                        {todo}
                        <button
                            className="remove"
                            onClick={() => {
                                removeTodo(todo);
                            }}
                        >
                            remove
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
};
FunctionalInput.propTypes = {
    name: PropTypes.string,
};
/*class based todo app*/
class ClassInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: ["hello", "chezmoi"],
            inputVal: "",
            editingTodo: null,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { todos, inputVal, editingTodo } = this.state;

        if (editingTodo !== null) {
            // If editing, update the existing todo
            const updatedTodos = todos.map((todo, index) =>
                index === editingTodo.index ? inputVal : todo
            );
            this.setState({
                todos: updatedTodos,
                inputVal: "",
                editingTodo: null,
            });
        } else {
            // If not editing, add a new todo
            this.setState((state) => ({
                todos: state.todos.concat(state.inputVal),
                inputVal: "",
            }));
        }
    }

    editTodo (index) {
        this.setState({
            inputVal: this.state.todos[index],
            editingTodo: { index }
        });
    }

    handleInputChange(e) {
        this.setState({
            inputVal: e.target.value
        });
    }

    cancelEdit() {
        this.setState({
            inputVal: "",
            editingTodo: null
        });
    }

    removeTodo(todoToRemove) {
        this.setState((state) => ({
            todos: state.todos.filter((todo) => todo !== todoToRemove),
        }));
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
                    <button type="submit">{this.state.editingTodo !== null ? "Resubmit" : "Submit"}</button>
                    {this.state.editingTodo !== null && <button type="button" onClick={this.cancelEdit}>Cancel</button>}
                </form>
                <h4>All the tasks!</h4>
                <p>Total todos : {this.state.todos.length} </p>
                <ul>
                    {this.state.todos.map((todo, index) => (
                        <li id="todo" key={todo}>
                            {this.state.editingTodo !== null && this.state.editingTodo.index === index ? (
                                <input
                                    type="text"
                                    value={this.state.inputVal}
                                    onChange={this.handleInputChange}
                                />
                            ) : (
                                todo
                            )}
                            <button
                                className="remove"
                                onClick={() => {
                                    this.removeTodo(todo);
                                }}
                            >
                                remove
                            </button>
                            {!this.state.editingTodo && ( // Show edit button only if not editing any todo
                                <button className="edit" onClick={() => this.editTodo(index)}>Edit</button>
                            )}
                        </li>
                    ))}
                </ul>
            </section>
        );
    }
}

ClassInput.propTypes = {
    name: PropTypes.string,
};
function App() {
    return (
        <>
            <FunctionalInput />
            <ClassInput />
        </>
    );
}

export default App;
