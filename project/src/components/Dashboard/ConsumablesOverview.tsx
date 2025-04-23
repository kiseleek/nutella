import React from 'react';
import { Droplet, Filter, Battery, Thermometer, ArrowRight } from 'lucide-react';

interface ConsumableItemProps {
  icon: React.ReactNode;
  name: string;
  percentage: number;
  dueDate: string;
  status: 'good' | 'warning' | 'critical';
}

const ConsumableItem: React.FC<ConsumableItemProps> = ({ icon, name, percentage, dueDate, status }) => {
  const statusColors = {
    good: {
      text: 'text-emerald-600',
      bg: 'bg-emerald-500',
      pillBg: 'bg-emerald-100',
      pillText: 'text-emerald-800'
    },
    warning: {
      text: 'text-amber-600',
      bg: 'bg-amber-500',
      pillBg: 'bg-amber-100',
      pillText: 'text-amber-800'
    },
    critical: {
      text: 'text-red-600',
      bg: 'bg-red-500',
      pillBg: 'bg-red-100',
      pillText: 'text-red-800'
    }
  };

  const colors = statusColors[status];

  return (
    <div className="border border-slate-200 rounded-lg p-4 hover:border-blue-200 hover:shadow-sm transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className={`${colors.text} mr-3`}>
            {icon}
          </div>
          <h3 className="font-medium">{name}</h3>
        </div>
        <div className={`px-2 py-1 text-xs font-medium rounded-full ${colors.pillBg} ${colors.pillText}`}>
          {percentage}% Remaining
        </div>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2.5 mb-3">
        <div 
          className={`${colors.bg} h-2.5 rounded-full transition-all duration-1000 ease-out`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-500">Next replacement: {dueDate}</span>
        <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
          Details
          <ArrowRight size={14} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

const ConsumablesOverview: React.FC = () => {
  return (
    <div className="card p-5 fade-in">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold flex items-center">
          <Droplet size={18} className="mr-2 text-blue-700" />
          <span>Consumables Status</span>
        </h2>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
          View All
          <ArrowRight size={16} className="ml-1" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ConsumableItem 
          icon={<Droplet size={18} />} 
          name="Engine Oil" 
          percentage={38} 
          dueDate="In 500 miles or June 15" 
          status="warning" 
        />
        <ConsumableItem 
          icon={<Filter size={18} />} 
          name="Air Filter" 
          percentage={75} 
          dueDate="In 5,000 miles or Sept 30" 
          status="good" 
        />
        <ConsumableItem 
          icon={<Battery size={18} />} 
          name="Battery" 
          percentage={92} 
          dueDate="Feb 2025" 
          status="good" 
        />
        <ConsumableItem 
          icon={<Thermometer size={18} />} 
          name="Brake Fluid" 
          percentage={15} 
          dueDate="Immediately" 
          status="critical" 
        />
      </div>
    </div>
  );
};

export default ConsumablesOverview;