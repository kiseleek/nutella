import React, { useState } from 'react';
import { AlertTriangle, ThumbsUp, ChevronDown, Wrench, HelpCircle, Search } from 'lucide-react';

interface Symptom {
  id: string;
  category: string;
  name: string;
  description: string;
}

interface CauseAndSolution {
  id: string;
  cause: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  solution: string;
  estimatedCost: string;
  estimatedTime: string;
  diyChallengeLevel: 'easy' | 'moderate' | 'difficult' | 'professional';
}

const DiagnosticsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Sample data
  const symptomCategories = [
    'all',
    'Noise',
    'Vibration',
    'Performance',
    'Electrical',
    'Fluid Leak',
    'Visual'
  ];

  const symptoms: Symptom[] = [
    {
      id: '1',
      category: 'Noise',
      name: 'Knocking sound when turning',
      description: 'A knocking or clunking sound that occurs specifically when making turns, especially at low speeds.'
    },
    {
      id: '2',
      category: 'Noise',
      name: 'Squealing when braking',
      description: 'High-pitched squealing or squeaking sound that occurs when applying the brakes.'
    },
    {
      id: '3',
      category: 'Vibration',
      name: 'Steering wheel vibration',
      description: 'Steering wheel shakes or vibrates, especially at highway speeds.'
    },
    {
      id: '4',
      category: 'Performance',
      name: 'Engine stalling',
      description: 'Engine suddenly stops running while driving or idling.'
    },
    {
      id: '5',
      category: 'Performance',
      name: 'Delayed acceleration',
      description: 'Noticeable delay between pressing the gas pedal and the vehicle accelerating.'
    },
    {
      id: '6',
      category: 'Electrical',
      name: 'Battery not holding charge',
      description: 'Vehicle battery drains quickly or fails to hold a charge overnight.'
    },
    {
      id: '7',
      category: 'Fluid Leak',
      name: 'Red fluid under car',
      description: 'Red or pink fluid found beneath the vehicle after parking.'
    },
    {
      id: '8',
      category: 'Visual',
      name: 'Dashboard warning light',
      description: 'One or more warning lights illuminated on the dashboard.'
    }
  ];

  const causesAndSolutions: Record<string, CauseAndSolution[]> = {
    '1': [
      {
        id: '1-1',
        cause: 'CV Joint Failure',
        description: 'The constant velocity (CV) joints in the front axle allow the wheels to receive power from the transmission at different angles. When they wear out, they can produce knocking sounds during turns.',
        severity: 'medium',
        solution: 'Replace the CV joint or the entire CV axle. This typically involves removing the wheel, disconnecting the axle, and installing a new component.',
        estimatedCost: '$150-$400 per side',
        estimatedTime: '1-2 hours',
        diyChallengeLevel: 'moderate'
      },
      {
        id: '1-2',
        cause: 'Bad Tie Rod Ends',
        description: 'Tie rod ends connect the steering system to the wheels. When they wear out, they can create knocking sounds during turns.',
        severity: 'high',
        solution: 'Replace the tie rod ends and get an alignment afterward to ensure proper steering geometry.',
        estimatedCost: '$100-$300',
        estimatedTime: '1-2 hours',
        diyChallengeLevel: 'moderate'
      },
      {
        id: '1-3',
        cause: 'Worn Ball Joints',
        description: 'Ball joints allow your suspension to move up and down while keeping the wheels connected to the car. When they wear out, they can create knocking sounds during turns.',
        severity: 'high',
        solution: 'Replace the ball joints. This may require special tools and an alignment afterward.',
        estimatedCost: '$200-$400 per side',
        estimatedTime: '2-3 hours',
        diyChallengeLevel: 'difficult'
      }
    ],
    '2': [
      {
        id: '2-1',
        cause: 'Worn Brake Pads',
        description: 'Brake pads include wear indicators that make a squealing sound when the pad material is getting thin, warning you it\'s time for replacement.',
        severity: 'medium',
        solution: 'Replace the brake pads. It\'s often a good idea to replace or resurface the rotors at the same time.',
        estimatedCost: '$150-$300 per axle',
        estimatedTime: '1-2 hours',
        diyChallengeLevel: 'moderate'
      },
      {
        id: '2-2',
        cause: 'Glazed Brake Rotors',
        description: 'The surface of brake rotors can become glazed due to excessive heat, creating a smooth surface that causes squealing.',
        severity: 'medium',
        solution: 'Resurface or replace the brake rotors along with new brake pads.',
        estimatedCost: '$200-$400 per axle',
        estimatedTime: '1-2 hours',
        diyChallengeLevel: 'moderate'
      }
    ]
  };

  // Filter symptoms based on search and category
  const filteredSymptoms = symptoms.filter(symptom => {
    const matchesSearch = symptom.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          symptom.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || symptom.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSymptomSelect = (id: string) => {
    setSelectedSymptom(id === selectedSymptom ? null : id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Car Issue Diagnostics</h1>
        <p className="text-slate-500">Identify potential causes and solutions for your vehicle's symptoms</p>
      </div>

      <div className="card p-6 bg-blue-50 border border-blue-200">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="text-blue-700 bg-blue-100 p-3 rounded-full">
            <HelpCircle size={24} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-slate-800 mb-1">What's happening with your vehicle?</h2>
            <p className="text-slate-600 mb-4">Describe a symptom or search for common issues below</p>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                className="input pl-10"
                placeholder="E.g., 'knocking sound when turning' or 'car won't start'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {symptomCategories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category === 'all' ? 'All Symptoms' : category}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredSymptoms.length > 0 ? (
            filteredSymptoms.map(symptom => (
              <div key={symptom.id} className="card overflow-hidden">
                <div 
                  className={`p-4 cursor-pointer hover:bg-slate-50 ${selectedSymptom === symptom.id ? 'bg-slate-50' : ''}`}
                  onClick={() => handleSymptomSelect(symptom.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-start">
                      <div className="bg-amber-100 text-amber-700 p-2 rounded-md mr-3">
                        <AlertTriangle size={18} />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-800">{symptom.name}</h3>
                        <p className="text-sm text-slate-500 mt-1">{symptom.description}</p>
                      </div>
                    </div>
                    <ChevronDown 
                      size={20} 
                      className={`text-slate-400 transition-transform ${selectedSymptom === symptom.id ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>
                
                {selectedSymptom === symptom.id && (
                  <div className="bg-slate-50 border-t border-slate-200 p-4">
                    <h4 className="font-medium text-slate-700 mb-3">Possible Causes & Solutions:</h4>
                    {causesAndSolutions[symptom.id] ? (
                      <div className="space-y-4">
                        {causesAndSolutions[symptom.id].map(solution => (
                          <div key={solution.id} className="bg-white border border-slate-200 rounded-md overflow-hidden">
                            <div className="p-4 border-b border-slate-200">
                              <div className="flex justify-between">
                                <h5 className="font-semibold text-slate-800">{solution.cause}</h5>
                                <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  solution.severity === 'high' ? 'bg-red-100 text-red-800' :
                                  solution.severity === 'medium' ? 'bg-amber-100 text-amber-800' :
                                  'bg-blue-100 text-blue-800'
                                }`}>
                                  {solution.severity === 'high' ? 'High Severity' :
                                   solution.severity === 'medium' ? 'Medium Severity' :
                                   'Low Severity'}
                                </div>
                              </div>
                              <p className="text-sm text-slate-600 mt-2">{solution.description}</p>
                            </div>
                            <div className="p-4 bg-slate-50">
                              <div className="flex items-start mb-3">
                                <Wrench size={18} className="text-blue-700 mr-2 mt-0.5" />
                                <div>
                                  <h6 className="font-medium text-slate-700">Recommended Solution:</h6>
                                  <p className="text-sm text-slate-600 mt-1">{solution.solution}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                  <p className="text-sm font-medium text-slate-700">Estimated Cost:</p>
                                  <p className="text-sm text-slate-600">{solution.estimatedCost}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-slate-700">Repair Time:</p>
                                  <p className="text-sm text-slate-600">{solution.estimatedTime}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-slate-700">DIY Level:</p>
                                  <div className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                                    solution.diyChallengeLevel === 'easy' ? 'bg-emerald-100 text-emerald-800' :
                                    solution.diyChallengeLevel === 'moderate' ? 'bg-blue-100 text-blue-800' :
                                    solution.diyChallengeLevel === 'difficult' ? 'bg-amber-100 text-amber-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {solution.diyChallengeLevel.charAt(0).toUpperCase() + solution.diyChallengeLevel.slice(1)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white p-4 border border-slate-200 rounded-md flex items-center text-slate-600">
                        <ThumbsUp size={18} className="text-blue-600 mr-2" />
                        We're working on adding solutions for this symptom. Check back soon!
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle size={24} className="text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-700 mb-2">No matching symptoms found</h3>
              <p className="text-slate-500">Try adjusting your search or category filter, or contact a professional for personalized diagnostics.</p>
            </div>
          )}
        </div>
      </div>

      <div className="card p-5">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">Need Professional Help?</h2>
        <p className="text-slate-600 mb-4">If you're unable to diagnose the issue or need expert assistance, we can help you find reliable service centers near you.</p>
        <button className="btn btn-primary">Find Service Centers</button>
      </div>
    </div>
  );
};

export default DiagnosticsPage;