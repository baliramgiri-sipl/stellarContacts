
import React from 'react'
import { MenuSkelton } from './EmailLayout/Skelton/MenuSkelton'
import InboxSkelton from './EmailLayout/Skelton/InboxSkelton'
import ContentSkelton from './EmailLayout/Skelton/ContentSkelton'


const ContactsLoading = () => {
    return (
        <div className='w-[95%] mx-auto '>
            <div className="border  h-[80vh] rounded-md border-green-200  flex shadow-md">
                <div className="w-[18%]  h-full border-green-200  border-r">
                    <MenuSkelton />
                </div>
                <div className="w-[35%]  h-full border-r border-green-200 ">
                    <InboxSkelton />
                </div>
                <div className=" flex-1  relative border-green-200   h-full">
                    <ContentSkelton />
                </div>
            </div>
        </div>

    )
}

export default ContactsLoading