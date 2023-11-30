'use client'
import { Toaster } from 'react-hot-toast';
import './globals.css'
import Navbar from "@/components/Navbar";
import { UserContext } from '@/lib/context';
import { useUserData } from '@/lib/hooks';


function MyApp({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const userData = useUserData();

  return (
    <html>
      <body>
        <UserContext.Provider value={userData}>
          <Navbar/>
          {children}
          <Toaster />
        </UserContext.Provider>
        </body>
    </html>
  )
}

export default MyApp;
