import React, { useState } from 'react';
import { FileText, Plus, Calendar, Clock, DollarSign, Filter, ChevronDown, ChevronUp, Search, X } from 'lucide-react';

interface ServiceRecord {
  id: string;
  date: string;
  mileage: number;
  type: string;
  description: string;
  provider: string;
  cost: number;
  partsReplaced: string[];
  documents?: string[];
  notes?: string;
}

const ServiceHistoryPage: React.FC = () => {
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Sample data
  const serviceRecords: ServiceRecord[] = [
    {
      id: '1',
      date: '2023-05-15',
      mileage: 42500,
      type: 'Maintenance',
      description: 'Regular Oil Change',
      provider: 'QuickLube Auto Shop',
      cost: 65.99,
      partsReplaced: ['Oil Filter', '5W-30 Synthetic Oil'],
      documents: ['receipt-may-2023.pdf'],
      notes: 'Technician noted slight leak from oil pan gasket - monitor'
    },
    {
      id: '2',
      date: '2023-02-28',
      mileage: 40000,
      type: 'Maintenance',
      description: 'Brake Pad Replacement',
      provider: 'City Auto Repair',
      cost: 320.50,
      partsReplaced: ['Front Brake Pads', 'Brake Fluid'],
      documents: ['invoice-feb-2023.pdf', 'warranty-brakes.pdf']
    },
    {
      id: '3',
      date: '2022-11-12',
      mileage: 36500,
      type: 'Repair',
      description: 'Alternator Replacement',
      provider: 'Dealership Service Center',
      cost: 750.25,
      partsReplaced: ['Alternator', 'Drive Belt'],
      notes: 'Battery was tested and still in good condition'
    },
    {
      id: '4',
      date: '2022-08-05',
      mileage: 33000,
      type: 'Maintenance',
      description: 'Tire Rotation & Balance',
      provider: 'Tire Depot',
      cost: 89.99,
      partsReplaced: []
    },
    {
      id: '5',
      date: '2022-05-20',
      mileage: 30000,
      type: 'Maintenance',
      description: '30,000 Mile Service',
      provider: 'Dealership Service Center',
      cost: 550.75,
      partsReplaced: [
        'Oil Filter', 
        'Air Filter', 
        'Cabin Air Filter', 
        'Spark Plugs', 
        '5W-30 Synthetic Oil'
      ],
      documents: ['30k-service-invoice.pdf']
    },
    {
      id: '6',
      date: '2022-01-15',
      mileage: 26000,
      type: 'Repair',
      description: 'Front Suspension Repair',
      provider: 'Auto Care Plus',
      cost: 420.30,
      partsReplaced: ['Control Arm', 'Ball Joint', 'Sway Bar Link'],
      notes: 'Alignment performed after repair'
    }
  ];

  // Service types for filtering
  const serviceTypes = ['all', 'Maintenance', 'Repair', 'Inspection', 'Recall'];

  // Filter service records based on search and type
  const filteredRecords = serviceRecords.filter(record => {
    const matchesSearch = 
      record.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.partsReplaced.some(part => part.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = filterType === 'all' || record.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  // Sort records by date (newest first)
  const sortedRecords = [...filteredRecords].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const toggleRecordExpansion = (id: string) => {
    setExpandedRecord(expandedRecord === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Service History</h1>
          <p className="text-slate-500">Track and manage your vehicle's maintenance and repair records</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Add Service Record
        </button>
      </div>

      <div className="card p-5">
        <div className="flex flex-col md:flex-row gap-4 mb-5">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              className="input pl-10"
              placeholder="Search by description, parts, or provider..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full md:w-60">
            <select 
              className="input"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              {serviceTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Service Types' : type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {sortedRecords.length > 0 ? (
            sortedRecords.map((record) => (
              <div key={record.id} className="border border-slate-200 rounded-lg overflow-hidden">
                <div 
                  className="p-4 bg-white hover:bg-slate-50 cursor-pointer flex items-center"
                  onClick={() => toggleRecordExpansion(record.id)}
                >
                  <div className={`p-2 rounded-md mr-3 ${
                    record.type === 'Repair' ? 'bg-amber-100 text-amber-700' :
                    record.type === 'Maintenance' ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    <FileText size={18} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-800">{record.description}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-slate-500">
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" /> 
                        {formatDate(record.date)}
                      </span>
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" /> 
                        {record.mileage.toLocaleString()} miles
                      </span>
                      <span className="flex items-center">
                        <DollarSign size={14} className="mr-1" /> 
                        ${record.cost.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className={`mr-3 px-2 py-1 text-xs font-medium rounded-full ${
                      record.type === 'Repair' ? 'bg-amber-100 text-amber-800' :
                      record.type === 'Maintenance' ? 'bg-blue-100 text-blue-800' :
                      record.type === 'Inspection' ? 'bg-slate-100 text-slate-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {record.type}
                    </span>
                    {expandedRecord === record.id ? 
                      <ChevronUp size={18} className="text-slate-400" /> : 
                      <ChevronDown size={18} className="text-slate-400" />
                    }
                  </div>
                </div>
                
                {expandedRecord === record.id && (
                  <div className="p-4 bg-slate-50 border-t border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-slate-700 mb-2">Service Details</h4>
                        <div className="space-y-1.5 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Provider:</span>
                            <span className="font-medium">{record.provider}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Date:</span>
                            <span className="font-medium">{formatDate(record.date)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Mileage:</span>
                            <span className="font-medium">{record.mileage.toLocaleString()} miles</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Cost:</span>
                            <span className="font-medium">${record.cost.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-700 mb-2">Parts Replaced</h4>
                        {record.partsReplaced.length > 0 ? (
                          <ul className="text-sm space-y-1">
                            {record.partsReplaced.map((part, index) => (
                              <li key={index} className="flex items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2"></div>
                                {part}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-slate-500">No parts replaced</p>
                        )}
                      </div>
                    </div>
                    
                    {(record.notes || record.documents) && (
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        {record.notes && (
                          <div className="mb-3">
                            <h4 className="font-medium text-slate-700 mb-1">Notes</h4>
                            <p className="text-sm text-slate-600">{record.notes}</p>
                          </div>
                        )}
                        
                        {record.documents && record.documents.length > 0 && (
                          <div>
                            <h4 className="font-medium text-slate-700 mb-2">Documents</h4>
                            <div className="flex flex-wrap gap-2">
                              {record.documents.map((doc, index) => (
                                <a
                                  key={index}
                                  href="#"
                                  className="inline-flex items-center px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm hover:bg-slate-50"
                                >
                                  <FileText size={14} className="mr-2 text-blue-600" />
                                  {doc}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="mt-4 flex gap-3">
                      <button className="btn btn-secondary text-sm py-1.5">Edit Record</button>
                      <button className="btn btn-secondary text-sm py-1.5">Delete</button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={24} className="text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-700 mb-2">No service records found</h3>
              <p className="text-slate-500 mb-4">
                {searchQuery || filterType !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Add your first service record to start tracking your vehicle maintenance'}
              </p>
              <button 
                onClick={() => setShowAddModal(true)}
                className="btn btn-primary"
              >
                Add Service Record
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Service Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Add New Service Record</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Service Type
                  </label>
                  <select className="input">
                    <option value="">Select a service type</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Repair">Repair</option>
                    <option value="Inspection">Inspection</option>
                    <option value="Recall">Recall</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Service Description
                  </label>
                  <input 
                    type="text" 
                    className="input"
                    placeholder="e.g., Oil Change, Brake Replacement"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Service Date
                  </label>
                  <input 
                    type="date" 
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Mileage
                  </label>
                  <input 
                    type="number" 
                    className="input"
                    placeholder="e.g., 45000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Service Cost ($)
                  </label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="input"
                    placeholder="e.g., 125.99"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Service Provider
                </label>
                <input 
                  type="text" 
                  className="input"
                  placeholder="e.g., City Auto Repair"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Parts Replaced (one per line)
                </label>
                <textarea 
                  className="input min-h-[80px]"
                  placeholder="e.g., Oil Filter&#10;Synthetic Oil 5W-30&#10;Air Filter"
                ></textarea>
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
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Upload Documents
                </label>
                <div className="input flex items-center justify-center p-4 border-dashed">
                  <div className="text-center">
                    <FileText size={24} className="mx-auto text-slate-400 mb-2" />
                    <p className="text-sm font-medium text-slate-700">
                      Drag & drop files here, or click to browse
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Supports PDF, JPG, PNG (max 10MB each)
                    </p>
                  </div>
                </div>
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
                Save Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceHistoryPage;