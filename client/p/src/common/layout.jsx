import React from 'react'
import { Outlet } from 'react-router-dom'
import Navig from './navigate'     

 const Layout =()=> {

  return (
    <div >
      
        <header><Navig></Navig></header>
         <main>
            <Outlet></Outlet>
         </main>
         <footer></footer>
       
    </div>
  )
}

export default Layout