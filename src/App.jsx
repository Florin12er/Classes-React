import { Component } from "react";
import { useState } from "react";
import PropTypes from "prop-types";

/*functional based todo app*/
const FunctionalInput = ({ name }) => {
  const [todos, setTodos] = useState(["Just some demo tasks", "As an example"]);
  const [inputVal, setInputVal] = useState("");
  const [editingTodo, setEditingTodo] = useState(null); // Track the todo being edited

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTodo !== null) {
      // If editing, update the existing todo
      const updatedTodos = todos.map((todo, index) =>
        index === editingTodo.index ? inputVal : todo
      );
      setTodos(updatedTodos);
      setEditingTodo(null);
    } else {
      // If not editing, add a new todo
      setTodos((prevTodos) => [...prevTodos, inputVal]);
    }
    setInputVal("");
  };

  const removeTodo = (todoToRemove) => {
    setTodos((prevTodos) => prevTodos.filter(todo => todo !== todoToRemove));
  };

  const editTodo = (index) => {
    setInputVal(todos[index]); // Set input value to the todo being edited
    setEditingTodo({ index });
  };

  const cancelEdit = () => {
    setInputVal(""); // Clear input value
    setEditingTodo(null); // Reset editing state
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
        <button type="submit">{editingTodo !== null ? "Resubmit" : "Submit"}</button>
        {editingTodo !== null && <button type="button" onClick={cancelEdit}>Cancel</button>}
      </form>
      <h4>All the tasks!</h4>
      <p>Total todos: {todos.length}</p>
  <ul>
    {todos.map((todo, index) => (
          <li key={index}>
            {editingTodo !== null && editingTodo.index === index ? (
              <input
                type="text"
                value={inputVal}
                onChange={handleInputChange}
              />
            ) : (
              todo
            )}
            <button
              className="remove"
              onClick={() => {
                removeTodo(todo);
              }}
            >
              remove
            </button>
            {!editingTodo && ( // Show edit button only if not editing any todo
              <button className="edit" onClick={() => editTodo(index)}>Edit</button>
            )}
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
        index === editingTodo.index ? inputVal : todo,
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

  editTodo(index) {
    this.setState({
      inputVal: this.state.todos[index],
      editingTodo: { index },
    });
  }

  handleInputChange(e) {
    this.setState({
      inputVal: e.target.value,
    });
  }

  cancelEdit() {
    this.setState({
      inputVal: "",
      editingTodo: null,
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
          <button type="submit">
            {this.state.editingTodo !== null ? "Resubmit" : "Submit"}
          </button>
          {this.state.editingTodo !== null && (
            <button type="button" onClick={this.cancelEdit}>
              Cancel
            </button>
          )}
        </form>
        <h4>All the tasks!</h4>
        <p>Total todos : {this.state.todos.length} </p>
        <ul>
          {this.state.todos.map((todo, index) => (
            <li id="todo" key={todo}>
              {this.state.editingTodo !== null &&
              this.state.editingTodo.index === index ? (
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
                <button className="edit" onClick={() => this.editTodo(index)}>
                  Edit
                </button>
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
