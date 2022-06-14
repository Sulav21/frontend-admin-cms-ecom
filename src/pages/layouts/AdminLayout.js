import React from 'react'
import { Container } from 'react-bootstrap'
import { AdminSideBar } from '../../components/adminSideBar/AdminSideBar'
import { Footer } from './Footer'
import { Header } from './Header'

export const AdminLayout = ({children}) => {
  return (
    <div>
        
          {/* Header section */}
      <Header/>

      
<AdminSideBar/>
{/* Main section */}
<Container>
<div className="main">{children}</div>
</Container>
{/* Footer section */}
<Footer/>
    </div>
  )
}
