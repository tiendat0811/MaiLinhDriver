import React, {createContext, useState} from 'react';

interface IAuth {
  token: string;
  getToken: boolean;
}

interface IAuthContext {
  auth: IAuth;
  setAuth: (state: IAuth) => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({children}) => {
  const [auth, setAuth] = useState({token: '', getToken: false});

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  );
};
