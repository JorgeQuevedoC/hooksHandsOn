import React, { useContext } from 'react';
import AuthContext from '../auth-context';
import { HeaderContainer,HeaderButton } from "./styled";

const header = props => {
  const auth = useContext(AuthContext);
  return (
    <HeaderContainer>
      {auth.status ? (
        <HeaderButton onClick={props.onLoadTodos}>Todo List</HeaderButton>
      ) : null}
      <HeaderButton onClick={props.onLoadAuth}>Auth</HeaderButton>
    </HeaderContainer>
  );
};

export default header;
