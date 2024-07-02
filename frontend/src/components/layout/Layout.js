import React from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import { HiMiniHeart } from 'react-icons/hi2'

const Layout = ({children}) => {
  return (
    <>
    <Header/>
    <div className='--pad' style={{minHeight:"80vh"}}>
      {children}
    </div>
    <Footer/>
    </>
  )
}

export default Layout