import { useEffect, useState } from "react";
import { auth } from "../firebase/config";

function useAuthenticator() {
  const [userAuth, setUserAuth] = useState(null);

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserAuth(user);
      } else {
        setUserAuth(null);
      }
    });
    return () => unsuscribe();
  }, []);

  return userAuth;
}

export default useAuthenticator;
