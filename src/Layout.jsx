import Navbar from './components/navbar/Navbar'
import { Outlet } from 'react-router'

function Layout() {
  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout