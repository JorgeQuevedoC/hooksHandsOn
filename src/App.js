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
    setCurrentPage('todo');
  };

  const logout = () => {
    setAuthStatus(false);
    setCurrentPage('auth');
  };

  return (
    <>
      <AuthContext.Provider value={{ status: authStatus, login: login, logout: logout }}>
        <Header onLoadTodos={onTodoHandler} onLoadAuth={onAuthHandler} />
        {currentPage === 'todo' ? <Todo /> : ''}
        {currentPage === 'auth' ? <Auth /> : ''}
      </AuthContext.Provider>
    </>
  );
};

export default app;
