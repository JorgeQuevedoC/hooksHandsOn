import React, { useState } from 'react';
import Todo from './components/Todo';
import Header from './components/Header';
import Auth from './components/Auth';
import AuthContext from './auth-context';

const app = props => {
  const [currentPage, setCurrentPage] = useState('main');
  const [authStatus, setAuthStatus] = useState(false);

  const onTodoHandler = () => {
    setCurrentPage('todo');
  };

  const onAuthHandler = () => {
    setCurrentPage('auth');
  };

  const login = () => {
    setAuthStatus(true);
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ status: authStatus, login: login }}>
        <Header onLoadTodos={onTodoHandler} onLoadAuth={onAuthHandler} />
        <hr />
        {currentPage === 'todo' ? <Todo /> : ''}
        {currentPage === 'auth' ? <Auth /> : ''}
      </AuthContext.Provider>
    </div>
  );
};

export default app;
