import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { firestore, auth} from "./firebase";

export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  // listen to realtime updates from a doc in firestore
  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = firestore.collection('users').doc(user.uid)
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username)
      });
    } else {
      setUsername(null);

    return unsubscribe;
    }

  }, [user])

  return { user, username };
}