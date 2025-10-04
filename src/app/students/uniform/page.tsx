'use client';

import React from 'react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import Card from '../../../components/ui/Card';
import { uniformSpecifications } from '../../../data/mockData';

export default function UniformPage() {
  // Group uniforms by season for better organization
  const regularUniforms = uniformSpecifications.filter(u => u.season === 'regular');
  const houseUniforms = uniformSpecifications.filter(u => u.season === 'house');
  const winterUniforms = uniformSpecifications.filter(u => u.season === 'winter');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">School Uniform Guidelines</h1>
          <p className="text-xl text-gray-600 mb-12">Complete specifications for St. Joseph Catholic School uniform requirements</p>

          {/* Regular Uniforms */}
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

          {/* House Uniforms */}
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

          {/* Winter Uniforms */}
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

      <Footer />
    </div>
  );
}


