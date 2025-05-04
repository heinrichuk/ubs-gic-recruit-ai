
import React from 'react';
import UBSLogo from './UBSLogo';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("w-full bg-white border-b border-gray-200 py-3 px-6", className)}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <UBSLogo />
          <div className="hidden sm:block text-ubs-secondary font-semibold text-lg">GIC Recruitment</div>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-ubs-darkGray hover:text-ubs-red transition-colors">Home</a>
          <a href="#" className="text-ubs-darkGray hover:text-ubs-red transition-colors">Job Specs</a>
          <a href="#" className="text-ubs-darkGray hover:text-ubs-red transition-colors">Interviews</a>
          <a href="#" className="text-ubs-darkGray hover:text-ubs-red transition-colors">About</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
