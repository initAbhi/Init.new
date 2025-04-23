import React, { useContext } from 'react'
import { useSidebar } from './ui/sidebar';
import { UserDetailContext } from '@/context/UserDetailContext';
import Image from 'next/image';

const SidebarButton = () => {
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const { toggleSidebar } = useSidebar();
  return (
    <div>
      {userDetail  && userDetail != "loading" && (
          <Image
            className="rounded-full cursor-pointer"
            onClick={toggleSidebar}
            src={userDetail?.picture}
            alt="user"
            width={30}
            height={30}
          />
        )}
    </div>
  )
}

export default SidebarButton
