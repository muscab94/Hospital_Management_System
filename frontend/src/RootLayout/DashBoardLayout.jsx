import React from 'react'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'

function DashBoardLayout() {
  return (
    <div className='flex '>
        <div className='w-72 h-screen'>
          <SideBar />
        </div>
        <div className='flex-1'>
          <Outlet />
        </div>
    </div>
  )
}

export default DashBoardLayout