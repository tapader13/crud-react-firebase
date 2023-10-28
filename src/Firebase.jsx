import { initializeApp } from 'firebase/app';
import {
  collection,
  addDoc,
  getFirestore,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
const firebaseConfig = {
  apiKey: 'AIzaSyDHjbAs-HCSYyjgCUpF1-Wlfe7-6T14ShU',
  authDomain: 'crud-react-firebase-1.firebaseapp.com',
  projectId: 'crud-react-firebase-1',
  storageBucket: 'crud-react-firebase-1.appspot.com',
  messagingSenderId: '1071845766925',
  appId: '1:1071845766925:web:7c7f9c8399eb4846196244',
};
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const userContext = createContext(null);
export const UseFireBase = () => {
  return useContext(userContext);
};

const ProviderData = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (res) {
        setUser(res);
        // console.log(res.email);
        // console.log(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const addData = async (date, title, desc) => {
    return await addDoc(collection(firestore, 'users'), {
      title,
      date,
      desc,
      userEmail: user.email,
    });
  };
  const getData = async (email) => {
    const q = query(
      collection(firestore, 'users'),
      where('userEmail', '==', email)
    );
    return await getDocs(q);
  };

  const isLogged = user ? true : false;
  const crateUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    signOut(auth);
  };
  const deleteData = async (id) => {
    return await deleteDoc(doc(firestore, 'users', id));
  };
  const editData = async (date, title, desc, id) => {
    await setDoc(doc(firestore, 'users', id), {
      date,
      title,
      desc,
      userEmail: user.email,
    });
  };
  return (
    <userContext.Provider
      value={{
        crateUser,
        getData,
        addData,
        isLogged,
        loginUser,
        logout,
        user,
        deleteData,
        editData,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
export default ProviderData;
