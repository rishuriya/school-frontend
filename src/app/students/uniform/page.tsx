'use client';

import React from 'react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import Card from '../../../components/ui/Card';
import schoolProfileService from '../../../services/schoolProfileService';
import { APP_CONFIG } from '../../../config/app';

interface Uniform {
  id: string;
  category: string;
  days: string;
  description: string;
  items: string[];
  applicableClasses: string;
  season: 'regular' | 'winter' | 'house';
}

interface RuleSection {
  id: string;
  title: string;
  order: number;
  subsections: Array<{
    id: string;
    title: string;
    order: number;
    rules: string[];
  }>;
}

interface RulesData {
  sections: RuleSection[];
}

export default function UniformPage() {
  const [loading, setLoading] = React.useState(true);
  const [uniforms, setUniforms] = React.useState<Uniform[]>([]);
  const [rules, setRules] = React.useState<RulesData | null>(null);
  const [activeRuleTab, setActiveRuleTab] = React.useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const profile = await schoolProfileService.getSchoolProfileById(APP_CONFIG.school.id);
        const baseUrl = APP_CONFIG.api.baseUrl;
        const schoolId = profile._id;
        
        // Fetch uniforms
        try {
          const uniformsUrl = `${baseUrl}/public/school/${schoolId}/uniforms`;
          console.log('Fetching uniforms from:', uniformsUrl);
          
          const uniformsRes = await fetch(uniformsUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          console.log('Uniforms response status:', uniformsRes.status);
          
          if (uniformsRes.ok) {
            const uniformsData = await uniformsRes.json();
            console.log('Uniforms API response:', uniformsData);
            
            if (uniformsData.success && uniformsData.data) {
              const uniformsList = Array.isArray(uniformsData.data) ? uniformsData.data : [];
              setUniforms(uniformsList);
              console.log('Uniforms loaded successfully:', uniformsList.length);
            } else {
              console.warn('Uniforms API returned no data or invalid format:', uniformsData);
              setUniforms([]);
            }
          } else {
            const errorText = await uniformsRes.text();
            console.error('Failed to fetch uniforms:', uniformsRes.status, uniformsRes.statusText);
            console.error('Error response:', errorText);
            try {
              const errorData = JSON.parse(errorText);
              console.error('Error details:', errorData);
            } catch (e) {
              console.error('Could not parse error response');
            }
            setUniforms([]);
          }
        } catch (error) {
          console.error('Error fetching uniforms:', error);
          if (error instanceof Error) {
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
          }
          setUniforms([]);
        }

        // Fetch rules
        try {
          const rulesRes = await fetch(`${baseUrl}/public/school/${schoolId}/rules`);
          if (rulesRes.ok) {
            const rulesData = await rulesRes.json();
            console.log('Rules API response:', rulesData);
            if (rulesData.success && rulesData.data) {
              setRules(rulesData.data);
            }
          } else {
            console.error('Failed to fetch rules:', rulesRes.status, rulesRes.statusText);
          }
        } catch (error) {
          console.error('Error fetching rules:', error);
        }

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Group uniforms by season for better organization
  const regularUniforms = uniforms.filter(u => u.season === 'regular');
  const houseUniforms = uniforms.filter(u => u.season === 'house');
  const winterUniforms = uniforms.filter(u => u.season === 'winter');

  // Filter uniform-related rules
  const uniformRules = rules?.sections?.filter(section => 
    section.title.toLowerCase().includes('uniform') || 
    section.id.toLowerCase().includes('uniform')
  ) || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading uniform information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">School Uniform Guidelines</h1>
          <p className="text-xl text-gray-600 mb-12">Complete specifications for school uniform requirements</p>

          {/* Regular Uniforms */}
          {regularUniforms.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Regular Day Uniforms</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {regularUniforms.map((uniform) => (
                <Card key={uniform.id} variant="elevated" className="h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                    <h3 className="text-xl font-bold text-gray-900">{uniform.applicableClasses}</h3>
                  </div>
                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {uniform.days}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">{uniform.description}</p>
                  <div className="space-y-3">
                    {uniform.items.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
                ))}
              </div>
            </div>
          )}

          {/* House Uniforms */}
          {houseUniforms.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">House Day Uniforms</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {houseUniforms.map((uniform) => (
                <Card key={uniform.id} variant="elevated" className="h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                    <h3 className="text-xl font-bold text-gray-900">{uniform.applicableClasses}</h3>
                  </div>
                  <div className="mb-4">
                    <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                      {uniform.days}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">{uniform.description}</p>
                  <div className="space-y-3">
                    {uniform.items.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
                ))}
              </div>
            </div>
          )}

          {/* Winter Uniforms */}
          {winterUniforms.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Winter Uniforms</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {winterUniforms.map((uniform) => (
                <Card key={uniform.id} variant="elevated" className="h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-4 h-4 bg-orange-500 rounded-full mr-3"></div>
                    <h3 className="text-xl font-bold text-gray-900">{uniform.applicableClasses}</h3>
                  </div>
                  <div className="mb-4">
                    <span className="inline-block bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full">
                      {uniform.days}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">{uniform.description}</p>
                  <div className="space-y-3">
                    {uniform.items.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {uniforms.length === 0 && (
            <Card variant="elevated" className="bg-blue-50 border-blue-200 text-center py-12">
              <div className="max-w-md mx-auto">
                <svg className="w-16 h-16 text-blue-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Uniforms Available</h3>
                <p className="text-gray-600">Uniform information will be displayed here once it&apos;s added to the system.</p>
              </div>
            </Card>
          )}

          {/* Important Notes */}
          <Card variant="elevated" className="bg-yellow-50 border-yellow-200">
            <h3 className="text-xl font-bold text-yellow-800 mb-4">Important Notes</h3>
            <ul className="space-y-2 text-yellow-700">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>All uniforms must display the official school monogram</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Students must maintain neat and clean appearance at all times</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Proper grooming and hygiene are expected as part of the uniform policy</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>For any clarifications regarding uniform requirements, please contact the school office</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Uniform Rules Section */}
      {uniformRules.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Uniform Rules & Guidelines</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Important rules and guidelines related to school uniform requirements
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto">
              {/* Tabs for Sections */}
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {uniformRules
                  .sort((a, b) => a.order - b.order)
                  .map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveRuleTab(index)}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                        activeRuleTab === index
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
              </div>
              
              {/* Content for Active Tab */}
              {uniformRules
                .sort((a, b) => a.order - b.order)
                .map((section, sectionIndex) => {
                  if (activeRuleTab !== sectionIndex) return null;
                  
                  // Flatten all rules from subsections
                  const allRules: Array<{ subsectionTitle?: string; rule: string }> = [];
                  section.subsections
                    .sort((a, b) => a.order - b.order)
                    .forEach((subsection) => {
                      subsection.rules.forEach((rule) => {
                        allRules.push({
                          subsectionTitle: subsection.title,
                          rule: rule
                        });
                      });
                    });

                  if (allRules.length === 0) return null;

                  return (
                    <Card key={section.id} variant="elevated" className="bg-white">
                      <div className="flex items-center mb-8">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mr-4">
                          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                          </svg>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">{section.title}</h3>
                      </div>
                      
                      {/* Group rules by subsection if they have subsection titles */}
                      {(() => {
                        const hasSubsections = allRules.some(r => r.subsectionTitle);
                        if (!hasSubsections) {
                          // Simple list if no subsections
                          return (
                            <ul className="space-y-4">
                              {allRules.map((item, i) => (
                                <li key={i} className="flex items-start gap-4 text-gray-700">
                                  <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-base font-bold mt-0.5">
                                    {i + 1}
                                  </span>
                                  <span className="flex-1 leading-relaxed text-lg">{item.rule}</span>
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        
                        // Group by subsection
                        const groupedRules: Record<string, string[]> = {};
                        allRules.forEach((item) => {
                          const key = item.subsectionTitle || 'General';
                          if (!groupedRules[key]) {
                            groupedRules[key] = [];
                          }
                          groupedRules[key].push(item.rule);
                        });
                        
                        return (
                          <div className="space-y-8">
                            {Object.entries(groupedRules).map(([subsectionTitle, subsectionRules], groupIndex) => (
                              <div key={groupIndex} className="border-l-4 border-blue-500 pl-6">
                                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                  {subsectionTitle}
                                </h4>
                                <ul className="space-y-3">
                                  {subsectionRules.map((rule, ruleIndex) => (
                                    <li key={ruleIndex} className="flex items-start gap-3 text-gray-700">
                                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                        {ruleIndex + 1}
                                      </span>
                                      <span className="flex-1 leading-relaxed">{rule}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                    </Card>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}


