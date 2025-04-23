import React from 'react';
import { Car, Calendar, Gauge, MapPin, Clock } from 'lucide-react';
import { Vehicle } from '../../types';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <div className="card overflow-hidden slide-up">
      <div className="relative h-40 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 opacity-20 bg-pattern"></div>
        <div className="absolute bottom-0 left-0 w-full p-5 text-white">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Car size={20} className="mr-2" />
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h2>
          <p className="flex items-center text-blue-100 mt-1">
            <Gauge size={16} className="mr-1" /> {vehicle.mileage.toLocaleString()} miles
          </p>
        </div>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-3 rounded-md">
            <div className="flex items-center text-slate-600 text-sm mb-1">
              <Calendar size={14} className="mr-1" /> Last Service
            </div>
            <p className="font-semibold">May 15, 2023</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-md">
            <div className="flex items-center text-slate-600 text-sm mb-1">
              <Clock size={14} className="mr-1" /> Health Score
            </div>
            <p className="font-semibold text-emerald-600">85/100</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-md">
            <div className="flex items-center text-slate-600 text-sm mb-1">
              <Gauge size={14} className="mr-1" /> Avg. MPG
            </div>
            <p className="font-semibold">32.5 mpg</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-md">
            <div className="flex items-center text-slate-600 text-sm mb-1">
              <MapPin size={14} className="mr-1" /> Primary Location
            </div>
            <p className="font-semibold">San Francisco</p>
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <button className="btn btn-primary">Full Vehicle Details</button>
          <button className="btn btn-secondary">Update Mileage</button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;