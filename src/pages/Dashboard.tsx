import React from 'react';
import { BarChart3, Calendar, Clock, ThumbsUp, AlertCircle, PenTool as Tool, ChevronRight, Droplet, Gauge } from 'lucide-react';
import VehicleCard from '../components/Dashboard/VehicleCard';
import ConsumablesOverview from '../components/Dashboard/ConsumablesOverview';
import { Vehicle } from '../types';

// Mock data
const vehicle: Vehicle = {
  id: '1',
  make: 'Toyota',
  model: 'Camry',
  year: 2019,
  mileage: 45000,
  image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
};

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500">Monitor your vehicle's condition and upcoming services</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-primary flex items-center">
            <Tool size={16} className="mr-2" />
            Add Service
          </button>
          <button className="btn btn-secondary flex items-center">
            <Calendar size={16} className="mr-2" />
            Schedule
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VehicleCard vehicle={vehicle} />
        </div>
        <div className="card p-5 slide-in-right">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Clock size={18} className="mr-2 text-blue-700" />
            <span>Upcoming Events</span>
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-amber-500 pl-3 py-2">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">Oil Change</p>
                  <p className="text-sm text-slate-500">Due in 500 miles</p>
                </div>
                <span className="badge badge-amber">Soon</span>
              </div>
            </div>
            <div className="border-l-4 border-blue-500 pl-3 py-2">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">Tire Rotation</p>
                  <p className="text-sm text-slate-500">Due in 3,000 miles</p>
                </div>
                <span className="badge badge-blue">Upcoming</span>
              </div>
            </div>
            <div className="border-l-4 border-red-500 pl-3 py-2">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">Brake Inspection</p>
                  <p className="text-sm text-slate-500">Overdue by 200 miles</p>
                </div>
                <span className="badge badge-red">Overdue</span>
              </div>
            </div>
          </div>
          <button className="btn btn-secondary w-full mt-4 flex items-center justify-center">
            View All
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ConsumablesOverview />
        </div>
        <div className="card p-5">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Gauge size={18} className="mr-2 text-blue-700" />
            <span>Health Overview</span>
          </h2>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm font-medium">Engine</span>
                <span className="text-sm text-emerald-600 font-medium flex items-center">
                  <ThumbsUp size={14} className="mr-1" /> Excellent
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm font-medium">Transmission</span>
                <span className="text-sm text-emerald-600 font-medium flex items-center">
                  <ThumbsUp size={14} className="mr-1" /> Good
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm font-medium">Brake System</span>
                <span className="text-sm text-amber-600 font-medium flex items-center">
                  <AlertCircle size={14} className="mr-1" /> Fair
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm font-medium">Suspension</span>
                <span className="text-sm text-emerald-600 font-medium flex items-center">
                  <ThumbsUp size={14} className="mr-1" /> Good
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
          <button className="btn btn-secondary w-full mt-5 flex items-center justify-center">
            Full Diagnostic
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>

      <div className="card p-5">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <BarChart3 size={18} className="mr-2 text-blue-700" />
          <span>Recent Insights</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-slate-200 rounded-md p-4 hover:border-blue-200 hover:bg-blue-50 transition-colors duration-200">
            <h3 className="font-medium mb-2">Fuel Efficiency</h3>
            <p className="text-sm text-slate-600 mb-3">Your average MPG has increased by 5% in the last month.</p>
            <a href="#" className="text-blue-600 text-sm font-medium flex items-center">
              View Details
              <ChevronRight size={14} className="ml-1" />
            </a>
          </div>
          <div className="border border-slate-200 rounded-md p-4 hover:border-blue-200 hover:bg-blue-50 transition-colors duration-200">
            <h3 className="font-medium mb-2">Drive Analysis</h3>
            <p className="text-sm text-slate-600 mb-3">Reduced harsh braking incidents by 15% this month.</p>
            <a href="#" className="text-blue-600 text-sm font-medium flex items-center">
              View Details
              <ChevronRight size={14} className="ml-1" />
            </a>
          </div>
          <div className="border border-slate-200 rounded-md p-4 hover:border-blue-200 hover:bg-blue-50 transition-colors duration-200">
            <h3 className="font-medium mb-2">Maintenance Tip</h3>
            <p className="text-sm text-slate-600 mb-3">Regular tire rotation can extend tire life by up to 20%.</p>
            <a href="#" className="text-blue-600 text-sm font-medium flex items-center">
              Learn More
              <ChevronRight size={14} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;