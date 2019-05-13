import React, { useContext } from 'react';
import AuthContext from '../auth-context';
import { AuthButton, LogButton, Section } from './styled';

const auth = props => {
  const auth = useContext(AuthContext);

  return (
    <Section> 
      { auth.status ? (
          <LogButton onClick={auth.logout}>
            Haz click aquí para cerrar sesión
          </LogButton>
        ) : (
          <AuthButton onClick={auth.login}>
            Haz click aquí para iniciar sesión
          </AuthButton>)
      }
      
    </Section>
  );
};

export default auth;
