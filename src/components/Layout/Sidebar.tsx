import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Droplet, 
  FileText, 
  Settings, 
  Search, 
  AlertTriangle, 
  BookOpen,
  ChevronDown,
  ChevronRight,
  BarChart
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/' },
    { name: 'Consumables', icon: <Droplet size={18} />, path: '/consumables' },
    { name: 'Diagnostics', icon: <AlertTriangle size={18} />, path: '/diagnostics' },
    { name: 'Service History', icon: <FileText size={18} />, path: '/service-history' },
    { name: 'Service Centers', icon: <Search size={18} />, path: '/service-centers' },
    { name: 'Vehicle Insights', icon: <BarChart size={18} />, path: '/vehicle-insights' },
    { name: 'Driver Assistance', icon: <BookOpen size={18} />, path: '/driver-assistance' },
    { name: 'Settings', icon: <Settings size={18} />, path: '/settings' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed bottom-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="bg-blue-700 text-white rounded-full p-3 shadow-lg flex items-center"
        >
          {isMobileMenuOpen ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div 
        className={`fixed inset-0 z-40 transform lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="absolute inset-0 bg-slate-900 opacity-50" onClick={toggleMobileMenu}></div>
        <div className="relative max-w-xs w-full h-full bg-white shadow-xl flex flex-col">
          <div className="p-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-800">AutoCare</h2>
          </div>
          <nav className="flex-1 pt-4 pb-4 bg-white overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-sm font-medium ${
                    isActive
                      ? 'text-blue-700 bg-blue-50 border-r-4 border-blue-700'
                      : 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'
                  }`
                }
                onClick={toggleMobileMenu}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 border-r border-slate-200 bg-white">
        <nav className="flex flex-col h-full pt-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? 'text-blue-700 bg-blue-50 border-r-4 border-blue-700'
                    : 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;