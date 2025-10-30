'use client';

import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import { facilities } from '../../data/mockData';
import Image from 'next/image';
export default function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10">Facilities</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {facilities.map((f) => (
              <Card key={f.id} variant="elevated">
                <div className="h-48 rounded-xl overflow-hidden mb-4">
                  {f.image && <Image src={f.image} alt={f.name} width={400} height={400} className="w-full h-full object-cover" />}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{f.name}</h3>
                <p className="text-gray-600 mb-4">{f.description}</p>
                <div className="flex flex-wrap gap-2 text-sm">
                  {f.features.map((feat) => (
                    <span key={feat} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">{feat}</span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}


