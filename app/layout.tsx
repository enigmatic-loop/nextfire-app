'use client'
import { Toaster } from 'react-hot-toast';
import './globals.css'
import Navbar from "@/components/Navbar";
import { UserContext } from '@/lib/context';


function MyApp({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <UserContext.Provider value={{ user: {}, username: 'nina'}}>
          <Navbar/>
          {children}
          <Toaster />
        </UserContext.Provider>
        </body>
    </html>
  )
}

export default MyApp;
