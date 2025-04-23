import React, { useState } from 'react';
import { Search, MapPin, Star, Clock, Phone, ChevronDown, Filter, ThumbsUp, MessageSquare, Wrench, ShieldCheck } from 'lucide-react';

interface ServiceCenter {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  address: string;
  phone: string;
  hours: string;
  services: string[];
  specialties: string[];
  certifications: string[];
  image: string;
}

const ServiceCentersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCenter, setSelectedCenter] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Sample data
  const serviceCenters: ServiceCenter[] = [
    {
      id: '1',
      name: 'Premier Auto Service',
      rating: 4.8,
      reviews: 285,
      distance: '1.2 miles',
      address: '1234 Main St, San Francisco, CA 94122',
      phone: '(415) 555-1234',
      hours: 'Mon-Fri: 8am-6pm, Sat: 9am-3pm, Sun: Closed',
      services: ['Oil Change', 'Brake Service', 'Engine Repair', 'Transmission Service', 'Wheel Alignment'],
      specialties: ['Foreign Vehicles', 'Hybrid Vehicles'],
      certifications: ['ASE Certified', 'AAA Approved'],
      image: 'https://images.pexels.com/photos/3807319/pexels-photo-3807319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '2',
      name: 'Downtown Automotive',
      rating: 4.5,
      reviews: 173,
      distance: '2.4 miles',
      address: '567 Market St, San Francisco, CA 94105',
      phone: '(415) 555-2345',
      hours: 'Mon-Fri: 7:30am-5:30pm, Sat-Sun: Closed',
      services: ['Oil Change', 'Brake Service', 'Electrical Systems', 'Air Conditioning', 'State Inspection'],
      specialties: ['Domestic Vehicles', 'Classic Cars'],
      certifications: ['ASE Certified'],
      image: 'https://images.pexels.com/photos/3642618/pexels-photo-3642618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '3',
      name: 'Bay Area Auto Care',
      rating: 4.9,
      reviews: 342,
      distance: '3.1 miles',
      address: '789 Ocean Ave, San Francisco, CA 94112',
      phone: '(415) 555-3456',
      hours: 'Mon-Sat: 8am-7pm, Sun: 10am-4pm',
      services: ['Oil Change', 'Brake Service', 'Transmission Service', 'Cooling System', 'Suspension Repair'],
      specialties: ['Foreign Vehicles', 'Luxury Vehicles', 'Electric Vehicles'],
      certifications: ['ASE Certified', 'Tesla Certified', 'AAA Approved'],
      image: 'https://images.pexels.com/photos/3642499/pexels-photo-3642499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '4',
      name: 'Golden Gate Garage',
      rating: 4.3,
      reviews: 109,
      distance: '4.5 miles',
      address: '1010 Golden Gate Ave, San Francisco, CA 94115',
      phone: '(415) 555-4567',
      hours: 'Mon-Fri: 8:30am-5:30pm, Sat: 9am-1pm, Sun: Closed',
      services: ['Oil Change', 'Brake Service', 'Exhaust System', 'Fuel System', 'Diagnostic Services'],
      specialties: ['Domestic Vehicles', 'SUVs & Trucks'],
      certifications: ['ASE Certified'],
      image: 'https://images.pexels.com/photos/4489733/pexels-photo-4489733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];

  const filterCategories = [
    {
      name: 'Services',
      options: ['Oil Change', 'Brake Service', 'Engine Repair', 'Transmission Service', 'Wheel Alignment', 'Electrical Systems', 'Air Conditioning']
    },
    {
      name: 'Specialties',
      options: ['Foreign Vehicles', 'Domestic Vehicles', 'Luxury Vehicles', 'Hybrid Vehicles', 'Electric Vehicles', 'Classic Cars', 'SUVs & Trucks']
    },
    {
      name: 'Certifications',
      options: ['ASE Certified', 'AAA Approved', 'Tesla Certified', 'Factory Trained']
    }
  ];

  // Filter service centers based on search
  const filteredCenters = serviceCenters.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          center.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    // If there are active filters, check if center has those services/specialties/certifications
    const matchesFilters = activeFilters.length === 0 || 
                           activeFilters.every(filter => 
                             center.services.includes(filter) || 
                             center.specialties.includes(filter) || 
                             center.certifications.includes(filter)
                           );
    
    return matchesSearch && matchesFilters;
  });

  const toggleCenterExpansion = (id: string) => {
    setSelectedCenter(selectedCenter === id ? null : id);
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters(activeFilters.includes(filter) 
      ? activeFilters.filter(f => f !== filter)
      : [...activeFilters, filter]
    );
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Service Centers</h1>
        <p className="text-slate-500">Find reliable auto service centers near you</p>
      </div>

      <div className="card p-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="text"
              className="input py-3 pl-10"
              placeholder="Enter zip code or city"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            className="btn btn-secondary flex items-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} className="mr-2" />
            Filter Options
            <ChevronDown size={16} className={`ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-slate-700">Filters</h3>
              {activeFilters.length > 0 && (
                <button 
                  className="text-sm text-blue-600 hover:text-blue-800"
                  onClick={clearFilters}
                >
                  Clear all filters
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              {filterCategories.map((category) => (
                <div key={category.name}>
                  <h4 className="text-sm font-medium text-slate-600 mb-2">{category.name}</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.options.map((option) => (
                      <button
                        key={option}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          activeFilters.includes(option)
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                        }`}
                        onClick={() => toggleFilter(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {filteredCenters.length > 0 ? (
          filteredCenters.map((center) => (
            <div key={center.id} className="card overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="h-40 md:h-auto bg-slate-100 relative">
                  <img
                    src={center.image}
                    alt={center.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="col-span-2 p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800">{center.name}</h2>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center text-amber-500">
                          <Star size={16} className="fill-current" />
                          <span className="ml-1 text-slate-800 font-medium">{center.rating}</span>
                        </div>
                        <span className="mx-2 text-sm text-slate-500">({center.reviews} reviews)</span>
                        <span className="flex items-center text-sm text-slate-500">
                          <MapPin size={14} className="mr-1" />
                          {center.distance}
                        </span>
                      </div>
                    </div>
                    <button 
                      className="btn btn-primary text-sm py-1.5"
                      onClick={() => toggleCenterExpansion(center.id)}
                    >
                      View Details
                    </button>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-start">
                      <MapPin size={16} className="mr-2 text-slate-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600">{center.address}</span>
                    </div>
                    <div className="flex items-start">
                      <Phone size={16} className="mr-2 text-slate-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600">{center.phone}</span>
                    </div>
                    <div className="flex items-start">
                      <Clock size={16} className="mr-2 text-slate-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600">{center.hours}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {center.specialties.slice(0, 2).map((specialty, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                    {center.certifications.slice(0, 2).map((cert, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full"
                      >
                        {cert}
                      </span>
                    ))}
                    {center.specialties.length + center.certifications.length > 4 && (
                      <span className="px-2 py-1 bg-slate-50 text-slate-700 text-xs font-medium rounded-full">
                        +{center.specialties.length + center.certifications.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {selectedCenter === center.id && (
                <div className="p-5 bg-slate-50 border-t border-slate-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-slate-800 mb-3 flex items-center">
                        <Wrench size={18} className="mr-2 text-blue-700" />
                        Services Offered
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {center.services.map((service, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                            <span className="text-sm">{service}</span>
                          </div>
                        ))}
                      </div>
                      
                      <h3 className="text-lg font-medium text-slate-800 mt-5 mb-3 flex items-center">
                        <ShieldCheck size={18} className="mr-2 text-blue-700" />
                        Certifications & Specialties
                      </h3>
                      <div className="space-y-2">
                        <div>
                          <h4 className="text-sm font-medium text-slate-700 mb-1">Specializes In:</h4>
                          <div className="flex flex-wrap gap-2">
                            {center.specialties.map((specialty, index) => (
                              <span 
                                key={index} 
                                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-slate-700 mb-1">Certifications:</h4>
                          <div className="flex flex-wrap gap-2">
                            {center.certifications.map((cert, index) => (
                              <span 
                                key={index} 
                                className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full"
                              >
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-slate-800 mb-3 flex items-center">
                        <MessageSquare size={18} className="mr-2 text-blue-700" />
                        Customer Reviews
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-white p-3 rounded-md border border-slate-200">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <div className="flex text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={14} className="fill-current" />
                                ))}
                              </div>
                              <span className="ml-2 text-sm font-medium">Sarah M.</span>
                            </div>
                            <span className="text-xs text-slate-500">2 weeks ago</span>
                          </div>
                          <p className="text-sm text-slate-600">
                            The team was extremely professional and fixed my brake issue quickly. 
                            They explained everything clearly and the price was fair. Highly recommend!
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded-md border border-slate-200">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <div className="flex text-amber-500">
                                {[...Array(4)].map((_, i) => (
                                  <Star key={i} size={14} className="fill-current" />
                                ))}
                                <Star size={14} className="text-slate-300" />
                              </div>
                              <span className="ml-2 text-sm font-medium">John D.</span>
                            </div>
                            <span className="text-xs text-slate-500">1 month ago</span>
                          </div>
                          <p className="text-sm text-slate-600">
                            Good service overall. They diagnosed my transmission issue correctly. 
                            A bit pricey but the quality of work was worth it.
                          </p>
                        </div>
                      </div>
                      <a 
                        href="#"
                        className="inline-block mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View all {center.reviews} reviews
                      </a>
                      
                      <div className="mt-5 flex flex-col gap-3">
                        <button className="btn btn-primary flex items-center justify-center">
                          <Phone size={16} className="mr-2" />
                          Call to Schedule
                        </button>
                        <button className="btn btn-secondary flex items-center justify-center">
                          <ThumbsUp size={16} className="mr-2" />
                          Save to Favorites
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="card p-6 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin size={24} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-700 mb-2">No service centers found</h3>
            <p className="text-slate-500">Try adjusting your search filters or enter a different location</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCentersPage;