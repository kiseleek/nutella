import React, { useState } from 'react';
import { 
  BarChart3, 
  ThumbsUp, 
  ThumbsDown, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  Check,
  Car,
  DollarSign,
  Fuel,
  Settings,
  Shield
} from 'lucide-react';

interface VehicleInsight {
  id: string;
  make: string;
  model: string;
  year: number;
  category: string;
  image: string;
  rating: number;
  reliability: number;
  fuelEfficiency: number;
  maintenance: number;
  resaleValue: number;
  safety: number;
  overview: string;
  pros: string[];
  cons: string[];
  commonIssues: {
    issue: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    typicalCost: string;
    milesOccurrence: string;
  }[];
  maintenanceTips: string[];
}

const VehicleInsightsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>('overview');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Sample data
  const vehicleCategories = [
    'all',
    'Sedan',
    'SUV',
    'Truck',
    'Hybrid',
    'Electric',
    'Luxury'
  ];

  const vehicleInsights: VehicleInsight[] = [
    {
      id: '1',
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      category: 'Sedan',
      image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.5,
      reliability: 4.8,
      fuelEfficiency: 4.5,
      maintenance: 4.7,
      resaleValue: 4.6,
      safety: 4.5,
      overview: "The Toyota Camry is a midsize sedan known for its reliability, fuel efficiency, and comfortable ride. It's a practical choice for individuals and families alike, with a spacious interior and good safety ratings. The 2020 model features updated technology and improved driving dynamics.",
      pros: [
        "Exceptional reliability record",
        "Low maintenance costs",
        "Good fuel economy",
        "Comfortable ride quality",
        "Strong resale value",
        "Comprehensive safety features"
      ],
      cons: [
        "Not as engaging to drive as some competitors",
        "Infotainment system can be unintuitive",
        "Road noise at highway speeds",
        "Base engine lacks power for quick acceleration"
      ],
      commonIssues: [
        {
          issue: "Transmission Hesitation",
          description: "Some owners report slight hesitation when accelerating from a stop.",
          severity: "low",
          typicalCost: "$0 (often resolved with software update)",
          milesOccurrence: "10,000 - 30,000 miles"
        },
        {
          issue: "Excessive Oil Consumption",
          description: "A small percentage of engines may consume oil at a higher than normal rate.",
          severity: "medium",
          typicalCost: "$1,500 - $3,000 if out of warranty",
          milesOccurrence: "50,000+ miles"
        }
      ],
      maintenanceTips: [
        "Follow the recommended oil change interval of every 5,000-10,000 miles with synthetic oil",
        "Replace engine air filter every 15,000-30,000 miles",
        "Rotate tires every 5,000 miles to ensure even wear",
        "Change transmission fluid every 60,000 miles for automatic transmissions",
        "Replace spark plugs every 120,000 miles (iridium type)"
      ]
    },
    {
      id: '2',
      make: 'Honda',
      model: 'CR-V',
      year: 2021,
      category: 'SUV',
      image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.6,
      reliability: 4.7,
      fuelEfficiency: 4.4,
      maintenance: 4.5,
      resaleValue: 4.8,
      safety: 4.7,
      overview: "The Honda CR-V is a compact SUV that offers excellent practicality, efficiency, and reliability. It features a spacious interior, ample cargo space, and good fuel economy for its class. The 2021 model includes an impressive array of standard safety features and refined handling.",
      pros: [
        "Spacious and versatile interior",
        "Strong reliability ratings",
        "Excellent fuel economy for an SUV",
        "Smooth ride quality",
        "Strong resale value",
        "Advanced safety features standard"
      ],
      cons: [
        "Base engine could use more power",
        "Infotainment system has learning curve",
        "Road noise at highway speeds",
        "Some hard plastics in interior"
      ],
      commonIssues: [
        {
          issue: "Battery Drainage",
          description: "Some owners report batteries draining faster than expected.",
          severity: "low",
          typicalCost: "$150 - $300 for battery replacement",
          milesOccurrence: "20,000 - 40,000 miles"
        },
        {
          issue: "Oil Dilution in Engine",
          description: "In cold climates, fuel can mix with oil causing dilution issues.",
          severity: "medium",
          typicalCost: "$0 (covered under extended warranty program)",
          milesOccurrence: "Variable, more common in cold climates"
        }
      ],
      maintenanceTips: [
        "Change oil and filter every 7,500 miles under normal conditions",
        "Replace engine air filter every 15,000-30,000 miles",
        "Inspect brake system every 15,000 miles",
        "Replace transmission fluid every 30,000 miles in severe conditions",
        "Replace spark plugs every 100,000 miles"
      ]
    },
    {
      id: '3',
      make: 'Tesla',
      model: 'Model 3',
      year: 2022,
      category: 'Electric',
      image: 'https://images.pexels.com/photos/13861/IMG_3496bfree.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.7,
      reliability: 4.2,
      fuelEfficiency: 5.0,
      maintenance: 4.5,
      resaleValue: 4.4,
      safety: 4.8,
      overview: "The Tesla Model 3 is an all-electric sedan that offers impressive range, technology, and performance. It features minimalist interior design, advanced autopilot capabilities, and over-the-air updates that can improve the car over time. The 2022 model has refined build quality and extended range options.",
      pros: [
        "Excellent electric range",
        "Quick acceleration and responsive handling",
        "Minimal maintenance requirements",
        "Advanced technology and autopilot features",
        "Regular software updates add new features",
        "Low operating costs"
      ],
      cons: [
        "Higher initial purchase price",
        "Sparse interior may not appeal to all",
        "Build quality inconsistencies",
        "Reliance on touchscreen for most controls",
        "Charging network limitations in some areas"
      ],
      commonIssues: [
        {
          issue: "Panel Gap Alignment",
          description: "Inconsistent spacing between body panels.",
          severity: "low",
          typicalCost: "$0 (warranty service)",
          milesOccurrence: "From delivery"
        },
        {
          issue: "Touchscreen Failure",
          description: "Main touchscreen can malfunction or go blank.",
          severity: "high",
          typicalCost: "$1,500 - $2,500 if out of warranty",
          milesOccurrence: "Variable, typically 50,000+ miles"
        }
      ],
      maintenanceTips: [
        "Rotate tires every 6,250 miles",
        "Replace cabin air filter every 2 years",
        "Check brake fluid every 2 years",
        "Clean and lubricate brake calipers every year in regions using road salt",
        "Battery coolant replacement at 4 years then every 2 years"
      ]
    },
    {
      id: '4',
      make: 'Ford',
      model: 'F-150',
      year: 2021,
      category: 'Truck',
      image: 'https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.4,
      reliability: 4.0,
      fuelEfficiency: 3.5,
      maintenance: 3.8,
      resaleValue: 4.5,
      safety: 4.3,
      overview: "The Ford F-150 is America's best-selling pickup truck, offering impressive capability, technology, and comfort. The 2021 model features a redesigned interior, new powertrain options including a hybrid, and advanced driver assistance systems. It balances work utility with family-friendly features.",
      pros: [
        "Excellent towing and hauling capabilities",
        "Wide range of engine options",
        "Innovative features like Pro Power Onboard generator",
        "Comfortable and tech-filled interior",
        "Strong resale value",
        "Available hybrid powertrain"
      ],
      cons: [
        "Lower fuel economy than some competitors",
        "Higher maintenance costs",
        "Size can be challenging in urban environments",
        "Top trims get expensive quickly",
        "Some reliability concerns with new technology"
      ],
      commonIssues: [
        {
          issue: "Transmission Shudder",
          description: "10-speed transmission can exhibit shuddering or harsh shifts.",
          severity: "medium",
          typicalCost: "$0 (usually fixed with software update)",
          milesOccurrence: "10,000 - 30,000 miles"
        },
        {
          issue: "Engine Oil Leaks",
          description: "Some EcoBoost engines develop oil leaks from the timing cover.",
          severity: "medium",
          typicalCost: "$800 - $1,500 if out of warranty",
          milesOccurrence: "60,000+ miles"
        }
      ],
      maintenanceTips: [
        "Change oil every 7,500-10,000 miles (synthetic oil recommended)",
        "Inspect and rotate tires every 7,500 miles",
        "Change transmission fluid every 150,000 miles under normal conditions",
        "Replace fuel filter every 30,000 miles",
        "Inspect brake system every 15,000 miles"
      ]
    }
  ];

  // Filter vehicles based on search and category
  const filteredVehicles = vehicleInsights.filter(vehicle => {
    const matchesSearch = 
      `${vehicle.make} ${vehicle.model}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.overview.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || vehicle.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleVehicleSelect = (id: string) => {
    setSelectedVehicle(id === selectedVehicle ? null : id);
    setExpandedSection('overview');
  };

  const toggleSectionExpansion = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Helper function for rating stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex text-amber-500">
        {[...Array(5)].map((_, i) => (
          <div key={i}>
            {i < Math.floor(rating) ? (
              <Star className="fill-current" />
            ) : i < Math.ceil(rating) && i > Math.floor(rating) - 1 ? (
              <HalfStar className="fill-current" />
            ) : (
              <Star className="text-slate-300" />
            )}
          </div>
        ))}
      </div>
    );
  };

  // Star components
  const Star = ({ className = "" }) => (
    <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
    </svg>
  );
  
  const HalfStar = ({ className = "" }) => (
    <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
      <path fill="currentColor" d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253z"></path>
    </svg>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Vehicle Insights</h1>
        <p className="text-slate-500">Explore strengths, weaknesses, and common issues for different vehicle models</p>
      </div>

      <div className="card p-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="text"
              className="input py-3 pl-10"
              placeholder="Search for make, model, or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full md:w-60">
            <select 
              className="input py-3"
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
            >
              {vehicleCategories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Vehicle Types' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="card overflow-hidden">
              <div 
                className={`flex flex-col md:flex-row cursor-pointer transition-colors duration-200 ${
                  selectedVehicle === vehicle.id ? 'bg-slate-50' : 'hover:bg-slate-50'
                }`}
                onClick={() => handleVehicleSelect(vehicle.id)}
              >
                <div className="md:w-1/3 lg:w-1/4 h-48 md:h-auto bg-slate-100 relative">
                  <img
                    src={vehicle.image}
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 bg-white bg-opacity-80 rounded text-xs font-medium">
                    {vehicle.category}
                  </div>
                </div>
                <div className="p-5 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h2>
                      <div className="flex items-center mt-1">
                        <div className="flex text-amber-500">
                          {renderStars(vehicle.rating)}
                        </div>
                        <span className="ml-1 text-sm font-medium">{vehicle.rating.toFixed(1)}</span>
                        <span className="ml-1 text-sm text-slate-500">overall rating</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <ChevronDown 
                        size={20} 
                        className={`text-slate-400 transition-transform ${
                          selectedVehicle === vehicle.id ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Reliability</div>
                      <div className="flex items-center">
                        {renderStars(vehicle.reliability)}
                        <span className="ml-1 text-sm font-medium">{vehicle.reliability.toFixed(1)}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Fuel Efficiency</div>
                      <div className="flex items-center">
                        {renderStars(vehicle.fuelEfficiency)}
                        <span className="ml-1 text-sm font-medium">{vehicle.fuelEfficiency.toFixed(1)}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Maintenance</div>
                      <div className="flex items-center">
                        {renderStars(vehicle.maintenance)}
                        <span className="ml-1 text-sm font-medium">{vehicle.maintenance.toFixed(1)}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Resale Value</div>
                      <div className="flex items-center">
                        {renderStars(vehicle.resaleValue)}
                        <span className="ml-1 text-sm font-medium">{vehicle.resaleValue.toFixed(1)}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Safety</div>
                      <div className="flex items-center">
                        {renderStars(vehicle.safety)}
                        <span className="ml-1 text-sm font-medium">{vehicle.safety.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedVehicle === vehicle.id && (
                <div className="border-t border-slate-200">
                  <div className="bg-slate-100 border-b border-slate-200">
                    <div className="flex overflow-x-auto">
                      <button
                        className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                          expandedSection === 'overview'
                            ? 'text-blue-700 border-b-2 border-blue-700'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        onClick={() => toggleSectionExpansion('overview')}
                      >
                        Overview
                      </button>
                      <button
                        className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                          expandedSection === 'pros-cons'
                            ? 'text-blue-700 border-b-2 border-blue-700'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        onClick={() => toggleSectionExpansion('pros-cons')}
                      >
                        Pros & Cons
                      </button>
                      <button
                        className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                          expandedSection === 'common-issues'
                            ? 'text-blue-700 border-b-2 border-blue-700'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        onClick={() => toggleSectionExpansion('common-issues')}
                      >
                        Common Issues
                      </button>
                      <button
                        className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                          expandedSection === 'maintenance'
                            ? 'text-blue-700 border-b-2 border-blue-700'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        onClick={() => toggleSectionExpansion('maintenance')}
                      >
                        Maintenance Tips
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    {expandedSection === 'overview' && (
                      <div className="space-y-4">
                        <p className="text-slate-700 leading-relaxed">{vehicle.overview}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
                          <div className="bg-white p-4 rounded-md border border-slate-200 flex flex-col items-center text-center">
                            <Shield className="text-blue-600 mb-2" size={24} />
                            <div className="text-sm font-medium">Reliability</div>
                            <div className="text-lg font-bold text-slate-800 mt-1">{vehicle.reliability.toFixed(1)}/5</div>
                          </div>
                          <div className="bg-white p-4 rounded-md border border-slate-200 flex flex-col items-center text-center">
                            <Fuel className="text-blue-600 mb-2" size={24} />
                            <div className="text-sm font-medium">Fuel Efficiency</div>
                            <div className="text-lg font-bold text-slate-800 mt-1">{vehicle.fuelEfficiency.toFixed(1)}/5</div>
                          </div>
                          <div className="bg-white p-4 rounded-md border border-slate-200 flex flex-col items-center text-center">
                            <Settings className="text-blue-600 mb-2" size={24} />
                            <div className="text-sm font-medium">Maintenance</div>
                            <div className="text-lg font-bold text-slate-800 mt-1">{vehicle.maintenance.toFixed(1)}/5</div>
                          </div>
                          <div className="bg-white p-4 rounded-md border border-slate-200 flex flex-col items-center text-center">
                            <DollarSign className="text-blue-600 mb-2" size={24} />
                            <div className="text-sm font-medium">Resale Value</div>
                            <div className="text-lg font-bold text-slate-800 mt-1">{vehicle.resaleValue.toFixed(1)}/5</div>
                          </div>
                          <div className="bg-white p-4 rounded-md border border-slate-200 flex flex-col items-center text-center">
                            <Car className="text-blue-600 mb-2" size={24} />
                            <div className="text-sm font-medium">Safety</div>
                            <div className="text-lg font-bold text-slate-800 mt-1">{vehicle.safety.toFixed(1)}/5</div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {expandedSection === 'pros-cons' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                            <ThumbsUp size={20} className="mr-2 text-emerald-600" />
                            Strengths
                          </h3>
                          <ul className="space-y-2">
                            {vehicle.pros.map((pro, index) => (
                              <li key={index} className="flex items-start">
                                <Check size={16} className="text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-700">{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                            <ThumbsDown size={20} className="mr-2 text-red-600" />
                            Weaknesses
                          </h3>
                          <ul className="space-y-2">
                            {vehicle.cons.map((con, index) => (
                              <li key={index} className="flex items-start">
                                <AlertTriangle size={16} className="text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-700">{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                    
                    {expandedSection === 'common-issues' && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">Common Issues & Concerns</h3>
                        {vehicle.commonIssues.length > 0 ? (
                          <div className="space-y-4">
                            {vehicle.commonIssues.map((issue, index) => (
                              <div key={index} className="bg-white border border-slate-200 rounded-md overflow-hidden">
                                <div className="p-4 border-b border-slate-200">
                                  <div className="flex justify-between items-start">
                                    <h4 className="font-medium text-slate-800">{issue.issue}</h4>
                                    <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                                      issue.severity === 'high' ? 'bg-red-100 text-red-800' :
                                      issue.severity === 'medium' ? 'bg-amber-100 text-amber-800' :
                                      'bg-blue-100 text-blue-800'
                                    }`}>
                                      {issue.severity === 'high' ? 'High Severity' :
                                       issue.severity === 'medium' ? 'Medium Severity' :
                                       'Low Severity'}
                                    </div>
                                  </div>
                                  <p className="text-sm text-slate-600 mt-2">{issue.description}</p>
                                </div>
                                <div className="p-4 bg-slate-50">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm font-medium text-slate-700">Typical Repair Cost:</p>
                                      <p className="text-sm text-slate-600">{issue.typicalCost}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-slate-700">When It Typically Occurs:</p>
                                      <p className="text-sm text-slate-600">{issue.milesOccurrence}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-slate-600">No common issues have been reported for this vehicle model yet.</p>
                        )}
                      </div>
                    )}
                    
                    {expandedSection === 'maintenance' && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">Maintenance Recommendations</h3>
                        <ul className="space-y-2">
                          {vehicle.maintenanceTips.map((tip, index) => (
                            <li key={index} className="flex items-start bg-white p-3 border border-slate-200 rounded-md">
                              <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                <span className="text-sm font-medium">{index + 1}</span>
                              </div>
                              <span className="text-slate-700">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="card p-6 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car size={24} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-700 mb-2">No vehicles found</h3>
            <p className="text-slate-500">Try adjusting your search or selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleInsightsPage;