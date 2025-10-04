'use client';

import React from 'react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import Card from '../../../components/ui/Card';
import Link from 'next/link';
import { feePaymentPolicies} from '../../../data/mockData';

export default function FeesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Fee <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Payment Details</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Transparent fee structure and payment policies for quality education
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold">
              💰 Quarterly Payments
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold">
              📅 Clear Deadlines
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold">
              🎓 Quality Education
            </div>
          </div>
        </div>
      </section>

      {/* Fee Structure Section
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Class-wise Fee Structure</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive fee structure for all classes with transparent pricing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockPrograms.map((program, index) => (
              <div key={program.id} className="group">
                <Card variant="elevated" className="h-full transform group-hover:scale-105 transition-all duration-500 hover:shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl font-bold text-white">
                        {program.name.includes('Pre-Nursery') ? '👶' : 
                         program.name.includes('Nursery') ? '🧸' :
                         program.name.includes('Primary') ? '📚' :
                         program.name.includes('Middle') ? '🎓' :
                         program.name.includes('Secondary') ? '🏆' : '🎯'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {program.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{program.description}</p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                        <span className="font-medium text-gray-700">Annual Fee</span>
                        <span className="text-2xl font-bold text-green-600">{program.tuition}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <span className="font-medium text-gray-700">Age Group</span>
                        <span className="font-semibold text-blue-600">{program.ageGroup}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                        <span className="font-medium text-gray-700">Class Size</span>
                        <span className="font-semibold text-purple-600">{program.classSize}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Fee Payment Policies Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Fee Payment Policies</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Important guidelines for fee payment and consequences of non-payment
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {feePaymentPolicies.map((policy, index) => (
              <div key={policy.id} className="group">
                <Card variant="elevated" className="h-full transform group-hover:scale-105 transition-all duration-500 hover:shadow-2xl border-0 bg-gradient-to-br from-white to-orange-50/30">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                      {policy.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">{policy.description}</p>
                  
                  <div className="space-y-4 mb-6">
                    {policy.rules.map((rule, ruleIndex) => (
                      <div key={ruleIndex} className="flex items-start group/rule">
                        <div className="w-6 h-6 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mr-4 mt-0.5 group-hover/rule:scale-110 transition-transform duration-200">
                          <div className="w-2 h-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-full"></div>
                        </div>
                        <span className="text-gray-700 leading-relaxed text-sm">{rule}</span>
                      </div>
                    ))}
                  </div>
                  
                  {policy.penalties && policy.penalties.length > 0 && (
                    <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200 group-hover:from-red-100 group-hover:to-orange-100 transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        </div>
                        <h4 className="text-lg font-bold text-red-800">Penalties & Consequences</h4>
                      </div>
                      <div className="space-y-3">
                        {policy.penalties.map((penalty, penaltyIndex) => (
                          <div key={penaltyIndex} className="p-4 bg-white/60 rounded-xl border border-red-100">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-red-700">{penalty.type}</span>
                              {penalty.amount && (
                                <span className="text-sm font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full">
                                  {penalty.amount}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-red-600">{penalty.consequence}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* Quick Actions Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Quick Actions</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Easy access to fee payment and school services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card variant="elevated" className="text-center group hover:scale-105 transition-all duration-500 hover:shadow-2xl border-0 bg-white/10 backdrop-blur-sm">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Pay Fees Online</h3>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">Secure online payment for all school fees</p>
              <Link href="/online-fee-payment" className="inline-flex items-center text-green-300 hover:text-green-200 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                Pay Now 
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </Card>

            <Card variant="elevated" className="text-center group hover:scale-105 transition-all duration-500 hover:shadow-2xl border-0 bg-white/10 backdrop-blur-sm">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Download Fee Structure</h3>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">Get detailed fee structure document</p>
              <button className="inline-flex items-center text-blue-300 hover:text-blue-200 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                Download PDF 
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
            </Card>

            <Card variant="elevated" className="text-center group hover:scale-105 transition-all duration-500 hover:shadow-2xl border-0 bg-white/10 backdrop-blur-sm">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Parent Portal</h3>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">Access student information and updates</p>
              <Link href="/facilities/parent-portal" className="inline-flex items-center text-purple-300 hover:text-purple-200 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                Access Portal 
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


