import { Toaster } from 'react-hot-toast';
import './globals.css'
import Navbar from "@/components/Navbar";


function MyApp({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <Navbar/>
        {children}
        <Toaster />
        </body>
    </html>
  )
}

export default MyApp;
