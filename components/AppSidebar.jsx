import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar"
import Image from 'next/image'
import { Button } from './ui/button'
import { MessageCircleCodeIcon } from 'lucide-react'
import WorkspaceHistory from './WorkspaceHistory'
import Footer from './Footer'

const AppSidebar = () => {
  return (
       <Sidebar>
      <SidebarHeader className="p-5">
        <Image src={'/logo.png'} alt='log' width={30} height={30} />
        <Button className="mt-5"> <MessageCircleCodeIcon /> Start a new chat</Button>
      </SidebarHeader>
      <SidebarContent className='p-5'>
        
        <SidebarGroup>
            <WorkspaceHistory />
        </SidebarGroup>
        {/* <SidebarGroup /> */}
      </SidebarContent>
      <SidebarFooter >
        <Footer />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
