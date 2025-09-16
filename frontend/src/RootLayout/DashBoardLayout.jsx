import React from 'react'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'

function DashBoardLayout() {
  return (
    <div className='flex h-screen'>
        <div className='w-72 h-full'>
          <SideBar />
        </div>
        <div className='flex-1 h-screen overflow-auto'>
          <Outlet />
        </div>
    </div>
  )
}

export default DashBoardLayout