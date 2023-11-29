'use client'

import { useContext } from "react";
import { UserContext } from "@/lib/context";
import { auth, googleAuth } from "@/lib/firebase";


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
      await auth.signInWithPopup(googleAuth);
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


function UsernameForm() {}