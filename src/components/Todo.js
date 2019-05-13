import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import {
  Section, 
  TodoInput, 
  TodoContainer, 
  TodoButton, 
  TodoListElement, 
  TodoLi
} from './styled';

const todo = props => {
  const [todoName, setTodoName] = useState('');
  //   const [todoList, setTodoList] = useState([]);
  const todoListReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return state.concat(action.payload);
      case 'SET':
        return action.payload;
      case 'REMOVE':
        return state.filter(todo => todo.id !== action.payload);
      default:
        return state;
    }
  };

  useEffect(() => {
    axios
      .get('https://reacthooks-5dd63.firebaseio.com/todos.json')
      .then(res => {
        console.log(res);
        const todoData = res.data;
        const todos = Object.keys(todoData).reduce((arr, key) => {
          arr = [...arr, { id: key, name: todoData[key].name }];
          return arr;
        }, []);
        dispatch({
          type: 'SET',
          payload: todos
        });
      })
      .catch(err => console.log(err));
  }, []);

  const [todoList, dispatch] = useReducer(todoListReducer, []);

  const inputChangeHandler = event => {
    setTodoName(event.target.value);
  };

  const todoAddHandler = () => {
    axios
      .post('https://reacthooks-5dd63.firebaseio.com/todos.json', {
        name: todoName
      })
      .then(res => {
        const todoItem = { id: res.data.name, name: todoName };
        dispatch({
          type: 'ADD',
          payload: todoItem
        });
      })
      .catch(err => console.log(err));
  };

  const todoRemoveHandler = todoId => {
    axios
      .delete(`https://reacthooks-5dd63.firebaseio.com/todos/${todoId}.json`)
      .then(dispatch({ type: 'REMOVE', payload: todoId }))
      .catch(err => console.log(err));
  };

  return (
    <Section>
      <TodoContainer>
        <TodoInput
          type="text"
          placeholder="Todo"
          onChange={inputChangeHandler}
          value={todoName}
        />
        <TodoButton type="button" onClick={todoAddHandler}>
          +
        </TodoButton>
      </TodoContainer>
      <TodoListElement>
        {todoList.map(todo => {
          return (
            <TodoLi key={todo.id} onClick={() => todoRemoveHandler(todo.id)}>
              {todo.name}
            </TodoLi>
          );
        })}
      </TodoListElement>
    </Section>
  );
};

export default todo;
