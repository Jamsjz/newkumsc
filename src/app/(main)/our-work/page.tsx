"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { BookOpen, Download, ExternalLink, Award, Users } from 'lucide-react';
import publicationsData from '@/data/publications.json';
import SponsorsSection from '@/components/features/home/SponsorsSection';

const OurWork: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bismaya');
  // const [searchTerm, setSearchTerm] = useState(''); // Future feature for search functionality

  const tabs = [
    { id: 'bismaya', name: 'Bismaya Magazine', icon: BookOpen },
    { id: 'projects', name: 'Current Projects', icon: Users },
    { id: 'achievements', name: 'Achievements', icon: Award }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2f3033] to-[#264653] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Our Work
            </h1>
            <p className="text-xl sm:text-2xl text-[#6b8891] leading-relaxed">
              Showcasing our publications, research projects, achievements, and contributions to the mathematical community.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-white border-b border-[#f4f1de]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-[#ff8c42] text-white'
                    : 'bg-[#f4f1de] text-[#2f3033] hover:bg-[#264653] hover:text-white'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bismaya Magazine Section */}
      {activeTab === 'bismaya' && (
        <section className="py-12 bg-[#f4f1de]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2f3033] mb-4">
                Bismaya Mathematical Magazine
              </h2>
              <p className="text-lg text-[#6b8891] max-w-3xl mx-auto">
                Our flagship publication featuring student research, mathematical insights, and academic achievements from the KU mathematics community.
              </p>
            </div>

            {/* Featured Issue */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg mb-12">
              <div className="grid lg:grid-cols-2 gap-8 p-8">
                <div>
                  <Image
                    src={publicationsData.bismayaIssues[0].coverImage}
                    alt={`Bismaya Issue ${publicationsData.bismayaIssues[0].id}`}
                    width={800}
                    height={600}
                    className="w-full h-80 object-cover rounded-xl shadow-lg"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="bg-[#ff8c42] text-white px-4 py-2 rounded-full text-sm font-medium inline-block w-fit mb-4">
                    Latest Issue #{publicationsData.bismayaIssues[0].id}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#2f3033] mb-4">
                    {publicationsData.bismayaIssues[0].title}
                  </h3>
                  <p className="text-[#6b8891] text-lg mb-6 leading-relaxed">
                    {publicationsData.bismayaIssues[0].description}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#ff8c42]">{publicationsData.bismayaIssues[0].articles}</div>
                      <div className="text-sm text-[#6b8891]">Articles</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#264653]">{publicationsData.bismayaIssues[0].contributors}</div>
                      <div className="text-sm text-[#6b8891]">Contributors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#c41e3a]">{publicationsData.bismayaIssues[0].downloads}</div>
                      <div className="text-sm text-[#6b8891]">Downloads</div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button className="bg-[#264653] hover:bg-[#1b3640] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 group">
                      <Download className="h-4 w-4" />
                      <span>Download PDF</span>
                    </button>
                    <button className="border-2 border-[#264653] text-[#264653] hover:bg-[#264653] hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 group">
                      <ExternalLink className="h-4 w-4" />
                      <span>View Online</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Archive */}
            <div>
              <h3 className="text-2xl font-bold text-[#2f3033] mb-8">Archive</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {publicationsData.bismayaIssues.slice(1).map((issue) => (
                  <div key={issue.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <Image
                      src={issue.coverImage}
                      alt={`Bismaya Issue ${issue.id}`}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-6">
                      <div className="text-[#ff8c42] font-semibold text-sm mb-2">Issue #{issue.id}</div>
                      <h4 className="text-xl font-bold text-[#2f3033] mb-3">{issue.title}</h4>
                      <p className="text-[#6b8891] text-sm mb-4 leading-relaxed">{issue.description}</p>
                      
                      <div className="flex justify-between text-sm text-[#6b8891] mb-4">
                        <span>{issue.articles} articles</span>
                        <span>{issue.downloads} downloads</span>
                      </div>

                      <div className="flex space-x-2">
                        <button className="flex-1 bg-[#f4f1de] hover:bg-[#264653] text-[#2f3033] hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200">
                          Download
                        </button>
                        <button className="flex-1 border border-[#6b8891] text-[#6b8891] hover:bg-[#6b8891] hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submission Guidelines */}
            <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-[#2f3033] mb-6">Submit to Bismaya</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-[#2f3033] mb-4">Submission Guidelines</h4>
                  <ul className="space-y-2 text-[#6b8891]">
                    <li>• Original mathematical research or insights</li>
                    <li>• Clear, well-structured writing</li>
                    <li>• Proper mathematical notation and formatting</li>
                    <li>• Maximum 5000 words per article</li>
                    <li>• Include author bio and affiliation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#2f3033] mb-4">Upcoming Deadlines</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-[#f4f1de] rounded-lg">
                      <span className="font-medium">Issue #9 Submissions</span>
                      <span className="text-[#c41e3a] font-semibold">March 15, 2025</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-[#f4f1de] rounded-lg">
                      <span className="font-medium">Special Edition</span>
                      <span className="text-[#ff8c42] font-semibold">May 30, 2025</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <button className="bg-[#ff8c42] hover:bg-[#e67220] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200">
                  Submit Your Article
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {activeTab === 'projects' && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2f3033] mb-4">
                Current Projects
              </h2>
              <p className="text-lg text-[#6b8891] max-w-3xl mx-auto">
                Discover our ongoing research initiatives, collaborative projects, and innovative solutions to mathematical challenges.
              </p>
            </div>

            <div className="grid gap-8">
              {publicationsData.projects.map((project) => (
                <div key={project.id} className="bg-[#f4f1de] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="grid lg:grid-cols-3 gap-8 p-8">
                    <div>
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover rounded-xl shadow-lg"
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <div className="flex items-start justify-between mb-4">
                        <span className="bg-[#264653] text-white px-3 py-1 rounded-full text-sm font-medium">
                          {project.category}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          project.status === 'Completed' 
                            ? 'bg-[#ffd700] text-[#2f3033]' 
                            : 'bg-[#ff8c42] text-white'
                        }`}>
                          {project.status}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-[#2f3033] mb-4">{project.title}</h3>
                      <p className="text-[#6b8891] text-lg mb-6 leading-relaxed">{project.description}</p>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-semibold text-[#2f3033] mb-2">Team Members</h4>
                          <ul className="text-[#6b8891] space-y-1">
                            {project.team.map((member, index) => (
                              <li key={index}>• {member}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#2f3033] mb-2">Achievement</h4>
                          <p className="text-[#ff8c42] font-semibold">{project.achievement}</p>
                          <p className="text-[#6b8891] text-sm mt-1">
                            Started: {new Date(project.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <button className="bg-[#264653] hover:bg-[#1b3640] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 group">
                        <span>Learn More</span>
                        <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Achievements Section */}
      {activeTab === 'achievements' && (
        <section className="py-12 bg-[#f4f1de]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2f3033] mb-4">
                Our Achievements
              </h2>
              <p className="text-lg text-[#6b8891] max-w-3xl mx-auto">
                Celebrating our victories, recognitions, and contributions to the mathematical community over the years.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {publicationsData.achievements.map((achievement, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-[#ff8c42] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-[#2f3033]">{achievement.title}</h3>
                        <span className="text-[#ff8c42] font-bold text-lg">{achievement.year}</span>
                      </div>
                      <div className="text-[#264653] font-semibold mb-3">{achievement.award}</div>
                      <p className="text-[#6b8891] leading-relaxed mb-4">{achievement.description}</p>
                      <span className="inline-block bg-[#f4f1de] text-[#2f3033] px-3 py-1 rounded-full text-sm font-medium">
                        {achievement.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Summary */}
            <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-[#2f3033] text-center mb-8">Achievement Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#ff8c42] mb-2">25+</div>
                  <div className="text-[#6b8891]">Awards Won</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#264653] mb-2">8</div>
                  <div className="text-[#6b8891]">National Competitions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#c41e3a] mb-2">15+</div>
                  <div className="text-[#6b8891]">Publications</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#ffd700] mb-2">500+</div>
                  <div className="text-[#6b8891]">Community Impact</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sponsors Section */}
      {activeTab === 'bismaya' && (
        <SponsorsSection showTitle={true} tierFilter={['platinum', 'gold']} />
      )}
    </div>
  );
};

export default OurWork;