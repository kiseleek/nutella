import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, Car, X } from 'lucide-react';
import { Vehicle } from '../../types';

interface HeaderProps {
  vehicle: Vehicle;
}

const Header: React.FC<HeaderProps> = ({ vehicle }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notifications, setNotifications] = useState<{ id: string; message: string; type: 'warning' | 'info' | 'critical' }[]>([
    { id: '1', message: 'Oil change due in 500 miles', type: 'warning' },
    { id: '2', message: 'New traffic regulation update available', type: 'info' },
    { id: '3', message: 'Brake pads at 20% - replacement recommended', type: 'critical' },
  ]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
    if (showNotifications) setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showMobileMenu) setShowMobileMenu(false);
  };

  return (
    <header 
      className={`sticky top-0 z-30 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Car className="h-8 w-8 text-blue-700" />
              <span className="ml-2 text-xl font-bold text-slate-800">AutoCare</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center bg-white rounded-full px-3 py-1 border border-slate-200 shadow-sm">
              <Car className="h-4 w-4 text-blue-700 mr-2" />
              <span className="text-sm font-medium text-slate-700">{vehicle.year} {vehicle.make} {vehicle.model}</span>
            </div>
            
            <div className="relative">
              <button 
                onClick={toggleNotifications}
                className="p-2 rounded-full hover:bg-slate-100 relative"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5 text-slate-600" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 border border-slate-200">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <h3 className="text-sm font-semibold text-slate-700">Notifications</h3>
                  </div>
                  {notifications.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-slate-500">No new notifications</div>
                  ) : (
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className="px-4 py-3 border-b border-slate-100 last:border-0">
                          <div className="flex justify-between items-start">
                            <div className={`w-1 h-1 mt-1.5 rounded-full mr-2 ${
                              notification.type === 'critical' ? 'bg-red-500' :
                              notification.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                            }`}></div>
                            <p className="text-sm text-slate-700 flex-1">{notification.message}</p>
                            <button 
                              onClick={() => removeNotification(notification.id)}
                              className="ml-2 text-slate-400 hover:text-slate-600"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
          <div className="px-4 py-3 space-y-3">
            <div className="flex items-center">
              <Car className="h-4 w-4 text-blue-700 mr-2" />
              <span className="text-sm font-medium text-slate-700">{vehicle.year} {vehicle.make} {vehicle.model}</span>
            </div>
            <button 
              onClick={toggleNotifications}
              className="flex items-center w-full px-3 py-2 text-sm text-slate-700 rounded-md hover:bg-slate-100"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              {notifications.length > 0 && (
                <span className="ml-auto bg-amber-100 text-amber-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
      
      {showNotifications && showMobileMenu && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-4 py-2 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-700">Notifications</h3>
          </div>
          {notifications.length === 0 ? (
            <div className="px-4 py-3 text-sm text-slate-500">No new notifications</div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {notifications.map(notification => (
                <div key={notification.id} className="px-4 py-3 border-b border-slate-100 last:border-0">
                  <div className="flex justify-between items-start">
                    <div className={`w-1 h-1 mt-1.5 rounded-full mr-2 ${
                      notification.type === 'critical' ? 'bg-red-500' :
                      notification.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                    }`}></div>
                    <p className="text-sm text-slate-700 flex-1">{notification.message}</p>
                    <button 
                      onClick={() => removeNotification(notification.id)}
                      className="ml-2 text-slate-400 hover:text-slate-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;