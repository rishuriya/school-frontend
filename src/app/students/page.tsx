'use client';

import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import { mockStudents } from '../../data/mockData';

export default function StudentsPage() {
  const students = mockStudents;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10">Students</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {students.map((student) => (
              <Card key={student.id} variant="elevated" className="text-center">
                <div className="h-48 bg-gradient-to-br from-green-100 to-teal-100 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                  {student.image ? (
                    <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
                  ) : null}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{student.name}</h3>
                <p className="text-gray-600 mb-4">{student.grade}</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  {student.achievements.map((a, i) => (
                    <li key={i} className="bg-gray-50 px-3 py-2 rounded-lg">{a}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}


