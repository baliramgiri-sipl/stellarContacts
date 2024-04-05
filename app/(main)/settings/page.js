import React from 'react'
import Profile from './Profile'
import MyWebsites from './MyWebsites'

const Settings = () => {
    return (
        <div className='w-full lg:w-[70%] mx-auto flex justify-between flex-wrap'>
            <div className='w-full md:w-[50%] lg:w-[60%]'>
                <Profile />
            </div>
            <div className='w-full md:w-[49%] lg:w-[39%]'>
                <MyWebsites />
            </div>
        </div>
    )
}

export default Settings