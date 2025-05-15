import TenantSidebar from '@/app/components/layout/TenantSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';


interface LayoutProps {
    children: React.ReactNode;
}

const TenantLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <SidebarProvider className='w-full h-full flex justify-center items-center'>
                <TenantSidebar />
                <main className='w-full'>{children}</main>
            </SidebarProvider>
            
            
           
        </div>
    );
};

export default TenantLayout;