import React from 'react'
import '../styles/LayoutStyles.css'
import { SidebarMenu } from '../data/data';
import { Link, useLocation } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

const Layout = ({ children }) => {
  const location = useLocation()
  const { logout } = useLogout()

  const handleLogout = () => {
    logout()
}


  return ( 
    <>
      <div className="main">
        <div className='layout'>
          <div className='sidebar'>
            <div className='logo'>
              <h6>HOTEL</h6>
              <hr />
            </div>
            <div className='menu'>
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path
                return (
                  <>
                    <div className={`menu-item ${isActive && 'active'}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path} key={menu.id}>{menu.name}</Link>
                    </div>
                  </>
                )
              })}
              <div className='menu-item' onClick={handleLogout}>
                <i className='fa-solid fa-right-from-bracket'></i>
                <Link to='/login'>Logout</Link>
              </div>
            </div>
          </div>
          <div className='content'>
            <div className='body'>{children}</div>
          </div>
        </div>
      </div>  
    </>
  );
}
 
export default Layout;