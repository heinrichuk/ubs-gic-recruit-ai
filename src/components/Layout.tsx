
import React, { ReactNode } from 'react';
import Header from './Header';
import UBSLogo from './UBSLogo';
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">{children}</main>
      <footer className="bg-[#F1F1F1] text-ubs-darkGray py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <UBSLogo />
              <p className="mt-2 text-sm">
                &copy; {new Date().getFullYear()} UBS Global Investment Center. All Rights Reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-ubs-darkGray hover:text-ubs-red">Terms</a>
              <a href="#" className="text-ubs-darkGray hover:text-ubs-red">Privacy</a>
              <a href="#" className="text-ubs-darkGray hover:text-ubs-red">Contact</a>
            </div>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;
