import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/lib/context";

export default function Navbar() {
  
  const { user, username } = useContext(UserContext)

  return (
    <nav className="navbar"> 
      <ul>
        <li>
          <Link href="/">
            <button>FEED</button>
          </Link>
        </li>

        {/* user is signed in and has username */}
        {username && (
          <>
            <li>
              <Link href="/admin">
                <button>Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL} alt="User photo"/>
              </Link>
            </li>
          </>
        )}

        {/* user is not signed in OR has not created username */}
        {!username && (
          <Link href="/sign-in">
            <button>Sign In</button>
          </Link>
          )}
      </ul>
    </nav>
  );
}