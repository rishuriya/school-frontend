'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import { aboutApi } from '../../services/api';
import { Facility } from '../../types/school';

// Helper function to create slug from facility name
const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export default function FacilitiesPage() {
  const [facilities, setFacilities] = React.useState<Facility[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [expandedFacility, setExpandedFacility] = React.useState<string | null>(null);
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const facilitiesData = await aboutApi.getFacilities();
        // Sort by order if available
        const sortedFacilities = [...facilitiesData].sort((a, b) => (a.order || 0) - (b.order || 0));
        setFacilities(sortedFacilities);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch facilities:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle scroll to facility from URL hash or query param
  React.useEffect(() => {
    if (facilities.length === 0) return;

    const facilityParam = searchParams?.get('facility');
    const hash = window.location.hash.replace('#', '');
    
    // Find facility by slug or hash
    let targetFacility: Facility | null = null;
    
    if (facilityParam) {
      targetFacility = facilities.find(f => createSlug(f.name) === facilityParam) || null;
    } else if (hash) {
      targetFacility = facilities.find(f => f.id === hash) || null;
    }

    if (targetFacility) {
      setTimeout(() => {
        const element = document.getElementById(targetFacility!.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setExpandedFacility(targetFacility!.id);
        }
      }, 500);
    }
  }, [searchParams, facilities]);

  const toggleFacility = (facilityId: string) => {
    setExpandedFacility(expandedFacility === facilityId ? null : facilityId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading facilities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our Facilities
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
            State-of-the-art facilities designed to enhance learning and growth
          </p>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive range of facilities that support academic excellence, physical development, and holistic education.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {facilities.length > 0 ? (
            <div className="space-y-8">
              {facilities.map((facility) => {
                const facilityId = facility.id;
                const isExpanded = expandedFacility === facilityId;
                const facilitySlug = createSlug(facility.name);
                
                return (
                  <div
                    key={facility.id}
                    id={facilityId}
                    className="scroll-mt-24"
                  >
                    <Card 
                      variant="elevated" 
                      className={`transition-all duration-300 ${isExpanded ? 'shadow-2xl' : 'hover:shadow-lg'}`}
                    >
                      <div 
                        className="cursor-pointer"
                        onClick={() => toggleFacility(facilityId)}
                      >
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Image */}
                          <div className={`${isExpanded ? 'md:w-1/3' : 'md:w-1/4'} h-64 md:h-auto rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex-shrink-0`}>
                            {facility.image ? (
                              <img
                                src={facility.image}
                                alt={facility.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <div className="text-center">
                                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                  </div>
                                  <span className="text-gray-500 text-sm">Facility Image</span>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                                {facility.name}
                              </h3>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFacility(facilityId);
                                }}
                                className="ml-4 p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
                                aria-label={isExpanded ? 'Collapse' : 'Expand'}
                              >
                                <svg 
                                  className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                            </div>
                            
                            <p className={`text-gray-600 mb-4 ${isExpanded ? '' : 'line-clamp-3'}`}>
                              {facility.description}
                            </p>

                            {!isExpanded && (
                              <>
                                {facility.features && facility.features.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mb-4">
                                    {facility.features.slice(0, 3).map((feat, idx) => (
                                      <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                                        {feat}
                                      </span>
                                    ))}
                                    {facility.features.length > 3 && (
                                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                        +{facility.features.length - 3} more
                                      </span>
                                    )}
                                  </div>
                                )}
                                {facility.capacity && (
                                  <p className="text-sm text-gray-500 mb-4">
                                    <span className="font-semibold">Capacity:</span> {facility.capacity}
                                  </p>
                                )}
                                <div className="flex items-center text-blue-600 font-semibold text-sm">
                                  Read More
                                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </div>
                              </>
                            )}

                            {/* Expanded Content */}
                            {isExpanded && (
                              <div className="mt-6 pt-6 border-t border-gray-200 animate-in fade-in slide-in-from-top-4 duration-300">
                                {facility.features && facility.features.length > 0 && (
                                  <div className="mb-6">
                                    <h4 className="text-xl font-bold text-gray-900 mb-4">Key Features</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      {facility.features.map((feature, index) => (
                                        <div key={index} className="flex items-start">
                                          <svg className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                          </svg>
                                          <span className="text-gray-700">{feature}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                
                                {facility.capacity && (
                                  <div className="mb-6">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Capacity</h4>
                                    <p className="text-gray-700">{facility.capacity}</p>
                                  </div>
                                )}

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFacility(facilityId);
                                  }}
                                  className="flex items-center text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors"
                                >
                                  Read Less
                                  <svg className="w-4 h-4 ml-2 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Facilities Found</h3>
              <p className="text-gray-600">Check back later for facility information.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
