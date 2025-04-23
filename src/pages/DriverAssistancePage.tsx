import React, { useState } from 'react';
import { 
  BookOpen, 
  AlertTriangle, 
  Info, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  ArrowRight, 
  Check, 
  FileText,
  ThumbsUp,
  Award
} from 'lucide-react';

interface RegulationUpdate {
  id: string;
  title: string;
  description: string;
  date: string;
  region: string;
  impactLevel: 'low' | 'medium' | 'high';
  category: string;
  details: string;
  source: string;
}

interface DrivingTip {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  steps: string[];
  image?: string;
}

const DriverAssistancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('regulations');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Sample data
  const regulationCategories = [
    'all',
    'Safety',
    'Emissions',
    'Licensing',
    'Traffic',
    'Parking',
    'Insurance'
  ];

  const tipCategories = [
    'all',
    'Safety',
    'Parking',
    'Highway',
    'City',
    'Weather',
    'Maintenance'
  ];

  const regulationUpdates: RegulationUpdate[] = [
    {
      id: '1',
      title: 'New Cell Phone Usage Restrictions',
      description: 'Updated regulations regarding mobile device usage while driving, with increased penalties.',
      date: '2023-09-15',
      region: 'California',
      impactLevel: 'high',
      category: 'Safety',
      details: 'As of September 15, 2023, California has enacted stricter penalties for mobile device usage while driving. First offense fines have increased from $20 to $50, and subsequent offenses now carry a $100 fine plus one point on your driving record. The new law clarifies that any handling of a mobile device, even while stopped at a traffic light, can result in a citation. Exceptions exist only for genuine emergencies or when using hands-free technology.',
      source: 'California Department of Motor Vehicles'
    },
    {
      id: '2',
      title: 'Updated Emissions Testing Requirements',
      description: 'Changes to vehicle emissions testing frequency and standards for certain vehicle types.',
      date: '2023-07-01',
      region: 'Nationwide',
      impactLevel: 'medium',
      category: 'Emissions',
      details: 'Effective July 1, 2023, the Environmental Protection Agency has updated emissions testing requirements for vehicles manufactured after 2010. Testing frequency has been reduced from biannual to every three years for these newer vehicles. However, stricter emissions standards now apply, with carbon monoxide limits reduced by 10% and nitrogen oxide by 15%. Vehicles failing to meet these standards may require additional maintenance or modifications to pass inspection.',
      source: 'Environmental Protection Agency'
    },
    {
      id: '3',
      title: 'New License Renewal Process',
      description: 'Simplified online renewal process for driver\'s licenses with extended validity periods.',
      date: '2023-08-10',
      region: 'Multiple States',
      impactLevel: 'low',
      category: 'Licensing',
      details: 'Starting August 10, 2023, several states have implemented a streamlined online license renewal process. Drivers can now renew licenses remotely every other renewal period, without requiring an in-person visit. Additionally, the standard validity period has been extended from 4 to 5 years. To qualify for online renewal, drivers must have a clean record with no suspensions within the previous renewal period and must pass an online vision self-certification.',
      source: 'American Association of Motor Vehicle Administrators'
    },
    {
      id: '4',
      title: 'Updated School Zone Regulations',
      description: 'Enhanced penalties for speeding in school zones and new time restrictions.',
      date: '2023-08-25',
      region: 'Multiple States',
      impactLevel: 'high',
      category: 'Traffic',
      details: 'Beginning with the 2023-2024 school year, penalties for speeding in school zones have doubled in many states. The standard school zone hours have been expanded to include after-school program times (typically until 6:00 PM). Additionally, many jurisdictions have implemented automated speed cameras in school zones, which can issue citations without an officer present. These changes aim to improve safety for students during both standard school hours and extracurricular activities.',
      source: 'National Highway Traffic Safety Administration'
    },
    {
      id: '5',
      title: 'New Insurance Requirements',
      description: 'Increased minimum liability coverage requirements for auto insurance policies.',
      date: '2023-10-01',
      region: 'Multiple States',
      impactLevel: 'medium',
      category: 'Insurance',
      details: 'Effective October 1, 2023, minimum liability coverage requirements for auto insurance have increased in several states. The new minimums typically include $30,000 for bodily injury per person (up from $25,000), $60,000 for total bodily injury per accident (up from $50,000), and $25,000 for property damage (up from $20,000). Insurance providers are required to implement these new minimums on all new and renewal policies. Drivers should check with their insurance providers to ensure compliance and understand potential premium adjustments.',
      source: 'Insurance Information Institute'
    }
  ];

  const drivingTips: DrivingTip[] = [
    {
      id: '1',
      title: 'Proper Mirror Adjustment',
      description: 'Learn how to eliminate blind spots by correctly positioning your mirrors.',
      category: 'Safety',
      difficulty: 'beginner',
      steps: [
        'Sit in your normal driving position with your head against the headrest.',
        'Adjust the rearview mirror to center the view out of your rear window.',
        'Lean your head left (about where the driver\'s window is) and adjust the left mirror to barely see the side of your car.',
        'Lean your head right (about where the center console is) and adjust the right mirror to barely see the side of your car.',
        'When properly adjusted, a car passing you will transition seamlessly from your rearview mirror to your side mirror to your peripheral vision.',
        'Test by watching a car pass you on either side to ensure continuous visibility.'
      ],
      image: 'https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '2',
      title: 'Parallel Parking Technique',
      description: 'Master the art of parallel parking with this step-by-step guide.',
      category: 'Parking',
      difficulty: 'intermediate',
      steps: [
        'Find a space that\'s at least 3 feet longer than your vehicle.',
        'Signal and position your car parallel to the vehicle in front of the empty space, about 2-3 feet away.',
        'Check surroundings and begin reversing slowly.',
        'When your rear wheels are aligned with the rear bumper of the car beside you, turn your steering wheel fully toward the curb.',
        'Continue reversing until your car is at a 45-degree angle to the curb.',
        'Straighten your wheels and continue backing up until your car is parallel with the curb.',
        'Once your front bumper clears the rear bumper of the car in front, turn your steering wheel away from the curb and move forward to center your car in the space.',
        'Adjust as needed to position your car about 6-12 inches from the curb.'
      ],
      image: 'https://images.pexels.com/photos/12210972/pexels-photo-12210972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '3',
      title: 'Handling Hydroplaning',
      description: 'What to do if your car begins to hydroplane on wet roads.',
      category: 'Weather',
      difficulty: 'advanced',
      steps: [
        'Stay calm - sudden movements can make the situation worse.',
        'Do not brake abruptly as this can cause your vehicle to skid more.',
        'Gently ease your foot off the accelerator to slow down gradually.',
        'Keep the steering wheel straight and aligned with the direction of the road.',
        'If correction is needed, steer gently in the direction you want to go.',
        'Once you feel traction returning, maintain a slower speed.',
        'After regaining full control, pull over safely if needed to calm down.',
        'To prevent hydroplaning, maintain proper tire pressure and tread depth, avoid cruise control in rain, and reduce speed on wet roads.'
      ],
      image: 'https://images.pexels.com/photos/9462902/pexels-photo-9462902.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '4',
      title: 'Highway Merging',
      description: 'Learn how to safely merge onto highways and freeways.',
      category: 'Highway',
      difficulty: 'intermediate',
      steps: [
        'As you approach the on-ramp, check your mirrors and blind spots.',
        'Use the acceleration lane to match the speed of highway traffic.',
        'Activate your turn signal early to indicate your intention to merge.',
        'Look for a gap in traffic that gives you enough space to enter safely.',
        'Adjust your speed to smoothly enter the gap without forcing other drivers to brake suddenly.',
        'Check your blind spot one final time before merging.',
        'Maintain your speed after merging and cancel your turn signal.',
        'Avoid stopping on the acceleration ramp unless absolutely necessary for safety.'
      ],
      image: 'https://images.pexels.com/photos/1715050/pexels-photo-1715050.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '5',
      title: 'Defensive Driving Techniques',
      description: 'Essential defensive driving practices for new drivers.',
      category: 'Safety',
      difficulty: 'beginner',
      steps: [
        'Maintain awareness of your surroundings at all times by scanning the road ahead, behind, and to your sides.',
        'Keep a safe following distance of at least 3 seconds behind the vehicle in front (increase in poor conditions).',
        'Anticipate potential hazards by watching for changes in traffic patterns or road conditions.',
        'Avoid distractions like cell phones, eating, or adjusting entertainment systems while driving.',
        'Be visible to other drivers by using headlights when appropriate and signaling all turns and lane changes.',
        'Plan an escape route by identifying open spaces where you could maneuver if needed.',
        'Adjust your driving for weather and road conditions by slowing down in poor visibility or slippery surfaces.',
        'Never assume other drivers will follow the rules - be prepared for unexpected actions from other vehicles.'
      ],
      image: 'https://images.pexels.com/photos/3849167/pexels-photo-3849167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];

  // Filter based on search and category
  const filteredRegulations = regulationUpdates.filter(regulation => {
    const matchesSearch = 
      regulation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      regulation.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || regulation.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const filteredTips = drivingTips.filter(tip => {
    const matchesSearch = 
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || tip.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleItemExpansion = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  // For formatting dates
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Driver Assistance</h1>
        <p className="text-slate-500">Stay informed about regulations and learn essential driving skills</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200">
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'regulations'
                ? 'text-blue-700 bg-blue-50 border-b-2 border-blue-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
            onClick={() => {
              setActiveTab('regulations');
              setActiveCategory('all');
              setExpandedItem(null);
            }}
          >
            <AlertTriangle size={18} className="inline-block mr-2" />
            Regulation Updates
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'tips'
                ? 'text-blue-700 bg-blue-50 border-b-2 border-blue-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
            onClick={() => {
              setActiveTab('tips');
              setActiveCategory('all');
              setExpandedItem(null);
            }}
          >
            <BookOpen size={18} className="inline-block mr-2" />
            Driving Tips
          </button>
        </div>

        <div className="p-5">
          <div className="flex flex-col md:flex-row gap-4 mb-5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                className="input pl-10"
                placeholder={`Search ${activeTab === 'regulations' ? 'regulations' : 'driving tips'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-60">
              <select 
                className="input"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
              >
                {(activeTab === 'regulations' ? regulationCategories : tipCategories).map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? `All ${activeTab === 'regulations' ? 'Regulation' : 'Tip'} Categories` : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {activeTab === 'regulations' && (
            <div className="space-y-4">
              {filteredRegulations.length > 0 ? (
                filteredRegulations.map((regulation) => (
                  <div key={regulation.id} className="border border-slate-200 rounded-lg overflow-hidden">
                    <div 
                      className="p-4 bg-white cursor-pointer hover:bg-slate-50"
                      onClick={() => toggleItemExpansion(regulation.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className={`p-2 rounded-md mr-3 ${
                            regulation.impactLevel === 'high' ? 'bg-red-100 text-red-700' :
                            regulation.impactLevel === 'medium' ? 'bg-amber-100 text-amber-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            <AlertTriangle size={18} />
                          </div>
                          <div>
                            <h3 className="font-medium text-slate-800">{regulation.title}</h3>
                            <p className="text-sm text-slate-600 mt-1">{regulation.description}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded">
                                <Clock size={12} className="mr-1" />
                                {formatDate(regulation.date)}
                              </span>
                              <span className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded">
                                {regulation.region}
                              </span>
                              <span className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded">
                                {regulation.category}
                              </span>
                              <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${
                                regulation.impactLevel === 'high' ? 'bg-red-100 text-red-700' :
                                regulation.impactLevel === 'medium' ? 'bg-amber-100 text-amber-700' :
                                'bg-blue-100 text-blue-700'
                              }`}>
                                {regulation.impactLevel === 'high' ? 'High Impact' :
                                 regulation.impactLevel === 'medium' ? 'Medium Impact' :
                                 'Low Impact'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <ChevronDown 
                          size={20} 
                          className={`text-slate-400 transition-transform ${
                            expandedItem === regulation.id ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>
                    
                    {expandedItem === regulation.id && (
                      <div className="p-4 bg-slate-50 border-t border-slate-200">
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-slate-700 mb-2">Details:</h4>
                          <p className="text-slate-600">{regulation.details}</p>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                          <div className="text-sm">
                            <span className="text-slate-600">Source: </span>
                            <span className="font-medium">{regulation.source}</span>
                          </div>
                          <a 
                            href="#"
                            className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Read Full Guidelines
                            <ArrowRight size={14} className="ml-1" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle size={24} className="text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-700 mb-2">No regulation updates found</h3>
                  <p className="text-slate-500">
                    {searchQuery || activeCategory !== 'all' 
                      ? 'Try adjusting your search or category filter' 
                      : 'Check back later for updates'}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="space-y-5">
              {filteredTips.length > 0 ? (
                filteredTips.map((tip) => (
                  <div key={tip.id} className="border border-slate-200 rounded-lg overflow-hidden">
                    <div 
                      className="p-4 bg-white cursor-pointer hover:bg-slate-50"
                      onClick={() => toggleItemExpansion(tip.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className={`p-2 rounded-md mr-3 ${
                            tip.difficulty === 'advanced' ? 'bg-blue-100 text-blue-700' :
                            tip.difficulty === 'intermediate' ? 'bg-amber-100 text-amber-700' :
                            'bg-emerald-100 text-emerald-700'
                          }`}>
                            <BookOpen size={18} />
                          </div>
                          <div>
                            <h3 className="font-medium text-slate-800">{tip.title}</h3>
                            <p className="text-sm text-slate-600 mt-1">{tip.description}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded">
                                {tip.category}
                              </span>
                              <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${
                                tip.difficulty === 'advanced' ? 'bg-blue-100 text-blue-700' :
                                tip.difficulty === 'intermediate' ? 'bg-amber-100 text-amber-700' :
                                'bg-emerald-100 text-emerald-700'
                              }`}>
                                {tip.difficulty.charAt(0).toUpperCase() + tip.difficulty.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <ChevronDown 
                          size={20} 
                          className={`text-slate-400 transition-transform ${
                            expandedItem === tip.id ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>
                    
                    {expandedItem === tip.id && (
                      <div className="border-t border-slate-200">
                        {tip.image && (
                          <div className="h-48 md:h-64 bg-slate-100">
                            <img 
                              src={tip.image} 
                              alt={tip.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-4 bg-slate-50">
                          <h4 className="text-sm font-medium text-slate-700 mb-3">Step-by-Step Guide:</h4>
                          <ol className="space-y-3">
                            {tip.steps.map((step, index) => (
                              <li key={index} className="flex items-start">
                                <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                  <span className="text-xs font-medium">{index + 1}</span>
                                </div>
                                <span className="text-sm text-slate-700">{step}</span>
                              </li>
                            ))}
                          </ol>
                          <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-200">
                            <div className="flex gap-2">
                              <button className="flex items-center text-blue-600 text-sm font-medium">
                                <ThumbsUp size={14} className="mr-1" />
                                Helpful
                              </button>
                              <button className="text-slate-500 text-sm">Share</button>
                            </div>
                            <a 
                              href="#"
                              className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              View More Tips
                              <ArrowRight size={14} className="ml-1" />
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen size={24} className="text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-700 mb-2">No driving tips found</h3>
                  <p className="text-slate-500">
                    {searchQuery || activeCategory !== 'all' 
                      ? 'Try adjusting your search or category filter' 
                      : 'Check back later for new driving tips'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="card p-5">
        <div className="flex items-start">
          <div className="p-3 bg-blue-100 text-blue-700 rounded-full mr-4">
            <Award size={24} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-2">Take a Driver Refresher Course</h2>
            <p className="text-slate-600 mb-4">
              Enhance your driving skills, stay current with regulations, and you might even qualify for insurance discounts.
            </p>
            <button className="btn btn-primary">Find Courses Near You</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverAssistancePage;