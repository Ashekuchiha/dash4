'use client';
import DashboardNav from '@/components/shared/dashboard-nav';
import { navItems, navItemsAdmin } from '@/constants/data';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import img from '../../assets/Logo.png';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);
  const role = localStorage.getItem('role');


  // const handleToggle = () => {
  //   setStatus(true);
  //   toggle();
  //   setTimeout(() => setStatus(false), 500);
  // };
  return (
    <nav
      className={cn(
        `relative z-10 hidden h-screen flex-none  overflow-scroll bg-slate-800 px-3 py-4 text-white  md:block`,
        status && 'duration-500',
        !isMinimized ? 'w-72' : 'w-[80px]',
        className
      )}
    >
      <div
        className={cn(
          'flex items-center px-0 py-5 md:px-2',
          !isMinimized ? 'justify-center ' : 'justify-between'
        )}
      >
        {<img src={img} className="self-center" />}
        {/* <ChevronsLeft
          className={cn(
            'size-8 cursor-pointer rounded-full border bg-background text-foreground',
            isMinimized && 'rotate-180'
          )}
          onClick={handleToggle}
        /> */}
      </div>
      <div className="space-y-4 py-4">
        <div className="px-2 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={role==="admin"?navItemsAdmin:navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}
