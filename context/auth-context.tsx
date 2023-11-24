// auth-context.tsx

'use client';

import * as React from "react"


import { createContext, ReactNode, useContext } from 'react';
import { Session } from 'next-auth';

type AuthContextProps = {
  session: Session | null;
  setSession: (session: Session | null) => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = React.useState<Session | null>(null);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
