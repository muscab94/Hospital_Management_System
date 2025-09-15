import React from 'react'
import Header from '../components/header'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div>
        <Header />
        <Outlet />
    </div>
  )
}

export default RootLayout