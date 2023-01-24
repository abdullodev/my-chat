import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const signup = (email, password, username) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signin = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const editContact = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, signup, signin, editContact }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
