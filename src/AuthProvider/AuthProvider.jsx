import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputData, setInputData] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(10);

  const provider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = async (email, password) => {
    setLoading(true);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const currentUser = userCredential.user;
    const token = await currentUser.getIdToken(true);
    localStorage.setItem('access-token', token);
    setUser(currentUser);
    setLoading(false);
    return currentUser;
  };

  const googleLog = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, provider);
    const currentUser = result.user;
    const token = await currentUser.getIdToken(true);
    localStorage.setItem('access-token', token);
    setUser(currentUser);
    setLoading(false);
    return currentUser;
  };

  const logout = async () => {
    setLoading(true);
    await signOut(auth);
    setUser(null);
    localStorage.removeItem('access-token');
    setLoading(false);
  };

  const getIdToken = async () => {
    if (!user) return null;
    try {
      const token = await user.getIdToken(true);
      return token;
    } catch (err) {
      console.error('Failed to get ID token', err);
      return null;
    }
  };

  const saveUserToDB = async currentUser => {
    if (!currentUser) return;
    try {
      const token = await currentUser.getIdToken(true);
      await fetch('https://contest-creation.vercel.app/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: currentUser.email,
          name: currentUser.displayName || 'Anonymous',
        }),
      });
    } catch (err) {
      console.error('Save user to DB failed:', err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      setUser(currentUser);
      if (currentUser) {
        const token = await currentUser.getIdToken(true);
        localStorage.setItem('access-token', token);
        await saveUserToDB(currentUser);
      } else {
        localStorage.removeItem('access-token');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        createUser,
        logIn,
        logout,
        googleLog,
        getIdToken,
        setLoading,
        inputData,
        setInputData,
        currentPage,
        setCurrentPage,
        itemPerPage,
        setItemPerPage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
