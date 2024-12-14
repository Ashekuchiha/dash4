import DashboardNav from '@/components/shared/dashboard-nav';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { navItems, navItemsAdmin } from '@/constants/data';
import { Dispatch, SetStateAction } from 'react';
import img from '../../assets/Logo.png';
type TMobileSidebarProps = {
  className?: string;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  sidebarOpen: boolean;
};
export default function MobileSidebar({
  setSidebarOpen,
  sidebarOpen
}: TMobileSidebarProps) {
  const role=localStorage.getItem("role");
  return (
    <>
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="overflow-auto bg-slate-900 !px-0">
          <div className="space-y-4 py-4">
            <div className="space-y-4 px-3 py-2">
              {<img src={img} className="justify-self-center" />}
              <div className="space-y-1 px-2 text-white">
                <DashboardNav items={role==="admin"?navItemsAdmin:navItems} setOpen={setSidebarOpen} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
