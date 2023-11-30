'use client'

import { useContext, useEffect, useState, useCallback } from "react";
import { UserContext } from "@/lib/context";
import { auth, firestore, googleAuth } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";


export default function SignIn({ }) {
  const { user, username } = useContext(UserContext)

  return (
    <main>
      {
        user ?
          !username ? <UsernameForm /> : <SignOutButton />
          :
          <SignInButton />
      }

    </main>
  )
}

function SignInButton() {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuth);
    } catch (error) {
        console.log("Sorry, something went wrong: ", error)
    }
  }

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  )
}
function SignOutButton() {
  const signOut = async () => {
    await auth.signOut();
    console.log('Signing Out')
  }

  return <button onClick={signOut}>Sign Out</button>
}


function UsernameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  useEffect(() => {
    checkUsername(formValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form val if length < 3 OR passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }

  }

  // prevent execution from firing after the last event stops firing or last form value changed
  // after 500ms. useCallback allows function to be memoized so can be debounced between state changes
  const debounce = require('lodash.debounce');
  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`)
        const { exists } = await ref.get();
        console.log('Firestore read executed')
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  )

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // refs for userDoc and usernameDoc
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`)

    // Batch write both docs together
    const batch = firestore.batch();
    batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName})
    batch.set(usernameDoc, { uid: user.uid});

    await batch.commit();
    } catch(error) {
      console.log('Sorry! Looks like something went wrong: ', error)
    }

  }

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>

          <input name="username" placeholder="username" value={formValue} onChange={onChange}/>
          <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
          <button type="submit" className="btn-green" disabled={!isValid}>
            Choose
          </button>

          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  )
}

function UsernameMessage({ 
    username, 
    isValid, 
    loading
  } : {
    username: string,
    isValid: boolean,
    loading: boolean
  }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}