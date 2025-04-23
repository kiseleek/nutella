import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Vehicle } from '../../types';

// Mock data for active vehicle
const activeVehicle: Vehicle = {
  id: '1',
  make: 'Toyota',
  model: 'Camry',
  year: 2019,
  mileage: 45000,
  image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header vehicle={activeVehicle} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;