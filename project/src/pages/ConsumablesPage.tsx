import React, { useState } from 'react';
import { Droplet, Filter, Battery, Thermometer, ArrowUpRight, Plus, Clock, RefreshCw, X } from 'lucide-react';

interface Consumable {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  percentage: number;
  lastReplaced: string;
  nextReplacement: string;
  lifespan: string;
  status: 'good' | 'warning' | 'critical';
  notes?: string;
}

const ConsumablesPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const consumables: Consumable[] = [
    {
      id: '1',
      name: 'Engine Oil',
      category: 'Fluid',
      icon: <Droplet size={20} />,
      percentage: 38,
      lastReplaced: 'Feb 15, 2023',
      nextReplacement: 'June 15, 2023',
      lifespan: '6 months or 5,000 miles',
      status: 'warning',
      notes: 'Using synthetic 5W-30 oil'
    },
    {
      id: '2',
      name: 'Oil Filter',
      category: 'Filter',
      icon: <Filter size={20} />,
      percentage: 38,
      lastReplaced: 'Feb 15, 2023',
      nextReplacement: 'June 15, 2023',
      lifespan: '6 months or 5,000 miles',
      status: 'warning'
    },
    {
      id: '3',
      name: 'Air Filter',
      category: 'Filter',
      icon: <Filter size={20} />,
      percentage: 75,
      lastReplaced: 'Dec 5, 2022',
      nextReplacement: 'Sep 30, 2023',
      lifespan: '12 months or 15,000 miles',
      status: 'good'
    },
    {
      id: '4',
      name: 'Cabin Air Filter',
      category: 'Filter',
      icon: <Filter size={20} />,
      percentage: 62,
      lastReplaced: 'Jan 20, 2023',
      nextReplacement: 'Oct 15, 2023',
      lifespan: '12 months or 15,000 miles',
      status: 'good'
    },
    {
      id: '5',
      name: 'Battery',
      category: 'Electrical',
      icon: <Battery size={20} />,
      percentage: 92,
      lastReplaced: 'Aug 5, 2021',
      nextReplacement: 'Feb 2025',
      lifespan: '4-5 years',
      status: 'good',
      notes: 'Cold cranking amps: 600'
    },
    {
      id: '6',
      name: 'Brake Fluid',
      category: 'Fluid',
      icon: <Thermometer size={20} />,
      percentage: 15,
      lastReplaced: 'Nov 10, 2021',
      nextReplacement: 'Immediately',
      lifespan: '2 years or 24,000 miles',
      status: 'critical',
      notes: 'DOT 4 fluid recommended'
    },
    {
      id: '7',
      name: 'Transmission Fluid',
      category: 'Fluid',
      icon: <Droplet size={20} />,
      percentage: 50,
      lastReplaced: 'May 22, 2022',
      nextReplacement: 'May 22, 2024',
      lifespan: '30,000 - 60,000 miles',
      status: 'good'
    },
    {
      id: '8',
      name: 'Spark Plugs',
      category: 'Ignition',
      icon: <RefreshCw size={20} />,
      percentage: 68,
      lastReplaced: 'Apr 18, 2022',
      nextReplacement: 'Apr 18, 2024',
      lifespan: '30,000 - 100,000 miles',
      status: 'good'
    }
  ];

  const statusColors = {
    good: {
      text: 'text-emerald-600',
      bg: 'bg-emerald-500',
      bgLight: 'bg-emerald-100',
      pill: 'bg-emerald-100 text-emerald-800'
    },
    warning: {
      text: 'text-amber-600',
      bg: 'bg-amber-500',
      bgLight: 'bg-amber-100',
      pill: 'bg-amber-100 text-amber-800'
    },
    critical: {
      text: 'text-red-600',
      bg: 'bg-red-500',
      bgLight: 'bg-red-100',
      pill: 'bg-red-100 text-red-800'
    }
  };

  const categories = ['all', 'Fluid', 'Filter', 'Electrical', 'Ignition'];

  const filteredConsumables = activeFilter === 'all' 
    ? consumables 
    : consumables.filter(item => item.category === activeFilter);
  
  const statusCounts = {
    critical: consumables.filter(item => item.status === 'critical').length,
    warning: consumables.filter(item => item.status === 'warning').length,
    good: consumables.filter(item => item.status === 'good').length
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Consumables Tracker</h1>
          <p className="text-slate-500">Monitor and manage vehicle consumables and replacement schedules</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Add Consumable
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4 bg-white flex items-center">
          <div className="p-3 rounded-full bg-red-100 mr-4">
            <Clock className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Need Attention</p>
            <p className="text-2xl font-bold text-slate-800">{statusCounts.critical}</p>
          </div>
        </div>
        <div className="card p-4 bg-white flex items-center">
          <div className="p-3 rounded-full bg-amber-100 mr-4">
            <Clock className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Due Soon</p>
            <p className="text-2xl font-bold text-slate-800">{statusCounts.warning}</p>
          </div>
        </div>
        <div className="card p-4 bg-white flex items-center">
          <div className="p-3 rounded-full bg-emerald-100 mr-4">
            <Clock className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">In Good Condition</p>
            <p className="text-2xl font-bold text-slate-800">{statusCounts.good}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(category => (
          <button
            key={category}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeFilter === category
                ? 'bg-blue-100 text-blue-700'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
            onClick={() => setActiveFilter(category)}
          >
            {category === 'all' ? 'All' : category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredConsumables.map((item) => {
          const colors = statusColors[item.status];
          return (
            <div key={item.id} className="card hover:shadow-md transition-shadow duration-200">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center">
                  <div className={`${colors.text} mr-3`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <span className="text-xs text-slate-500">{item.category}</span>
                  </div>
                </div>
                <div className={`px-2 py-1 text-xs font-medium rounded-full ${colors.pill}`}>
                  {item.percentage}% Remaining
                </div>
              </div>
              <div className="p-5">
                <div className="mb-4">
                  <div className="w-full bg-slate-200 rounded-full h-2.5 mb-1">
                    <div 
                      className={`${colors.bg} h-2.5 rounded-full transition-all duration-1000 ease-out`} 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Replace Soon</span>
                    <span>Like New</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Last replaced:</span>
                    <span className="font-medium">{item.lastReplaced}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Next replacement:</span>
                    <span className={`font-medium ${
                      item.status === 'critical' ? 'text-red-600' : 
                      item.status === 'warning' ? 'text-amber-600' : ''
                    }`}>{item.nextReplacement}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Typical lifespan:</span>
                    <span className="font-medium">{item.lifespan}</span>
                  </div>
                  {item.notes && (
                    <div className="pt-2 text-slate-600 text-xs italic">
                      Note: {item.notes}
                    </div>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between">
                  <button className="btn btn-secondary text-sm py-1.5">Update Status</button>
                  <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
                    Details
                    <ArrowUpRight size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Add New Consumable</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Consumable Name
                </label>
                <input 
                  type="text" 
                  className="input"
                  placeholder="e.g., Engine Oil"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Category
                </label>
                <select className="input">
                  <option value="">Select a category</option>
                  <option value="Fluid">Fluid</option>
                  <option value="Filter">Filter</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Ignition">Ignition</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Current Percentage
                  </label>
                  <input 
                    type="number" 
                    className="input"
                    placeholder="e.g., 75"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Last Replaced
                  </label>
                  <input 
                    type="date" 
                    className="input"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Typical Lifespan
                </label>
                <input 
                  type="text" 
                  className="input"
                  placeholder="e.g., 6 months or 5,000 miles"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea 
                  className="input min-h-[80px]"
                  placeholder="Any additional information..."
                ></textarea>
              </div>
            </div>
            <div className="p-5 border-t border-slate-200 flex gap-3 justify-end">
              <button 
                onClick={() => setShowAddModal(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button className="btn btn-primary">
                Add Consumable
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsumablesPage;