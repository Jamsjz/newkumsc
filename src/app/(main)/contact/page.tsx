"use client";
import React, { useState } from 'react';
import { Users, Calendar, BookOpen, Mail, CheckCircle, MapPin, Phone, Heart, Star, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from "sonner";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    year: '',
    major: '',
    interests: [] as string[],
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const membershipBenefits = [
    {
      icon: Users,
      title: 'Vibrant Community',
      description: 'Connect with passionate mathematicians and build lasting friendships.',
      color: 'bg-[#ff8c42]'
    },
    {
      icon: Calendar,
      title: 'Exclusive Events',
      description: 'Access workshops, guest lectures, and competitions.',
      color: 'bg-[#264653]'
    },
    {
      icon: BookOpen,
      title: 'Research Opportunities',
      description: 'Engage in projects and contribute to publications like Bismaya.',
      color: 'bg-[#c41e3a]'
    },
    {
      icon: Award,
      title: 'Mentorship Programs',
      description: 'Receive guidance from experienced faculty and alumni.',
      color: 'bg-[#ffd700]'
    }
  ];

  const volunteerOpportunities = [
    {
      title: 'Event Organizer',
      description: 'Help plan and execute club events, from workshops to social gatherings.',
      commitment: '5-10 hours/month',
      skills: 'Organization, Communication',
      color: 'bg-[#ff8c42]'
    },
    {
      title: 'Content Creator',
      description: 'Contribute to Bismaya magazine, social media, or website content.',
      commitment: 'Flexible',
      skills: 'Writing, Design, Research',
      color: 'bg-[#264653]'
    },
    {
      title: 'Academic Mentor',
      description: 'Provide tutoring and academic support to fellow students.',
      commitment: '2-4 hours/week',
      skills: 'Subject Expertise, Patience',
      color: 'bg-[#c41e3a]'
    },
    {
      title: 'Outreach Ambassador',
      description: 'Represent the club at university events and community programs.',
      commitment: 'Ad-hoc',
      skills: 'Public Speaking, Enthusiasm',
      color: 'bg-[#ffd700]'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, year: value }));
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    // Append interests as a single string or multiple fields
    formData.interests.forEach(interest => {
      data.append('interests[]', interest);
    });

    // Append other form data
    for (const key in formData) {
      if (key !== 'interests') {
        data.append(key, formData[key as keyof typeof formData] as string);
      }
    }

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/jamsjz63@gmail.com", // Replace with your FormSubmit endpoint
        {
          method: "POST",
          body: data,
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (response.ok) {
        toast.success("Application submitted successfully!");
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            year: '',
            major: '',
            interests: [],
            message: ''
          });
        }, 3000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message.");
      }
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message || "Something went wrong. Please try again later.");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    }
    finally {
      setIsSubmitting(false);
    }
  };

  const interestOptions = [
    'Pure Mathematics',
    'Applied Mathematics',
    'Statistics',
    'Mathematical Modeling',
    'Research',
    'Teaching/Tutoring',
    'Event Organization',
    'Publications',
    'Community Outreach',
    'Competitions'
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2f3033] to-[#264653] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-8xl text-white font-light">∑</div>
          <div className="absolute bottom-20 right-20 text-6xl text-white font-light">∫</div>
          <div className="absolute top-40 right-10 text-5xl text-white font-light">π</div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Get Involved
            </h1>
            <p className="text-xl sm:text-2xl text-[#6b8891] leading-relaxed">
              Join our vibrant mathematical community and be part of something extraordinary. Your journey in mathematics starts here.
            </p>
          </div>
        </div>
      </section>

      {/* Membership Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2f3033] mb-4">
              Become a Member
            </h2>
            <p className="text-lg text-[#6b8891] max-w-3xl mx-auto">
              Join 150+ passionate mathematicians and gain access to exclusive opportunities, resources, and a supportive community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {membershipBenefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className={`${benefit.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#2f3033] mb-3">{benefit.title}</h3>
                <p className="text-[#6b8891] leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Membership Requirements */}
          <div className="bg-[#f4f1de] p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-[#2f3033] mb-6 text-center">Membership Requirements</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-[#2f3033] mb-4">Eligibility</h4>
                <ul className="space-y-2 text-[#6b8891]">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#ff8c42]" />
                    <span>Current KU student (any major welcome)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#ff8c42]" />
                    <span>Passion for mathematics and learning</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#ff8c42]" />
                    <span>Commitment to club values and activities</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#ff8c42]" />
                    <span>Willingness to contribute to community</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#2f3033] mb-4">Process</h4>
                <ol className="space-y-2 text-[#6b8891]">
                  <li className="flex items-start space-x-2">
                    <span className="bg-[#ff8c42] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                    <span>Submit membership application</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-[#264653] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                    <span>Attend orientation session</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-[#c41e3a] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                    <span>Participate in welcome activities</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-[#ffd700] text-[#2f3033] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                    <span>Receive membership confirmation</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-16 bg-[#f4f1de]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2f3033] mb-4">
              Volunteer Opportunities
            </h2>
            <p className="text-lg text-[#6b8891] max-w-3xl mx-auto">
              Make a difference in the mathematical community through various volunteer roles that match your interests and schedule.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {volunteerOpportunities.map((opportunity, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className={`${opportunity.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#2f3033] mb-3">{opportunity.title}</h3>
                    <p className="text-[#6b8891] mb-4 leading-relaxed">{opportunity.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-[#6b8891]">Time Commitment:</span>
                        <div className="font-semibold text-[#2f3033]">{opportunity.commitment}</div>
                      </div>
                      <div>
                        <span className="text-[#6b8891]">Skills Needed:</span>
                        <div className="font-semibold text-[#2f3033]">{opportunity.skills}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-[#2f3033] mb-6">Join Our Community</h2>
              <p className="text-[#6b8891] mb-8 leading-relaxed">
                Ready to become part of our mathematical family? Fill out the form below and we&apos;ll get back to you soon!
              </p>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-[#6b8891]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8c42] focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-[#6b8891]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8c42] focus:border-transparent"
                        placeholder="your.email@ku.edu.np"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#6b8891]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8c42] focus:border-transparent"
                        placeholder="+977-XXXXXXXXXX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="year">Academic Year *</Label>
                      <Select onValueChange={handleSelectChange} value={formData.year} required>
                        <SelectTrigger className="w-full px-4 py-3 border border-[#6b8891]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8c42] focus:border-transparent">
                          <SelectValue placeholder="Select your year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1st Year">1st Year</SelectItem>
                          <SelectItem value="2nd Year">2nd Year</SelectItem>
                          <SelectItem value="3rd Year">3rd Year</SelectItem>
                          <SelectItem value="4th Year">4th Year</SelectItem>
                          <SelectItem value="Graduate">Graduate Student</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="major">Major/Field of Study *</Label>
                    <Input
                      type="text"
                      name="major"
                      value={formData.major}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#6b8891]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8c42] focus:border-transparent"
                      placeholder="e.g., Mathematics, Computer Science, Engineering"
                    />
                  </div>

                  <div>
                    <Label>Areas of Interest</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {interestOptions.map((interest) => (
                        <div key={interest} className="flex items-center space-x-2">
                          <Checkbox
                            id={interest}
                            checked={formData.interests.includes(interest)}
                            onCheckedChange={() => handleInterestChange(interest)}
                            className="rounded border-[#6b8891]/30 text-[#ff8c42] focus:ring-[#ff8c42]"
                          />
                          <Label htmlFor={interest} className="text-sm font-normal text-[#2f3033] cursor-pointer">{interest}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-[#6b8891]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8c42] focus:border-transparent"
                      placeholder="Tell us about yourself and why you want to join..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#ff8c42] hover:bg-[#e67220] text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 group"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-[#ff8c42] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#2f3033] mb-2">Application Submitted!</h3>
                  <p className="text-[#6b8891]">Thank you for your interest. We&apos;ll contact you soon with next steps.</p>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="bg-[#f4f1de] p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-[#2f3033] mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-[#ff8c42] mt-1" />
                  <div>
                    <h4 className="font-semibold text-[#2f3033] mb-1">Visit Us</h4>
                    <p className="text-[#6b8891]">
                      Department of Mathematics<br />
                      Kathmandu University<br />
                      Dhulikhel, Kavre, Nepal
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-[#ff8c42] mt-1" />
                  <div>
                    <h4 className="font-semibold text-[#2f3033] mb-1">Email Us</h4>
                    <p className="text-[#6b8891]">mathclub@ku.edu.np</p>
                    <p className="text-[#6b8891]">membership@kumathclub.org</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-[#ff8c42] mt-1" />
                  <div>
                    <h4 className="font-semibold text-[#2f3033] mb-1">Call Us</h4>
                    <p className="text-[#6b8891]">+977-11-490909</p>
                    <p className="text-[#6b8891] text-sm">Office Hours: Mon-Fri, 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-[#6b8891]/20">
                <h4 className="font-semibold text-[#2f3033] mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-[#264653] rounded-full flex items-center justify-center text-white hover:bg-[#1b3640] transition-colors duration-200">
                    <span className="text-sm font-bold">f</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-[#264653] rounded-full flex items-center justify-center text-white hover:bg-[#1b3640] transition-colors duration-200">
                    <span className="text-sm font-bold">ig</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-[#264653] rounded-full flex items-center justify-center text-white hover:bg-[#1b3640] transition-colors duration-200">
                    <span className="text-sm font-bold">in</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsor Information */}
      <section className="py-16 bg-[#2f3033] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Partnership Opportunities</h2>
            <p className="text-xl text-[#6b8891] max-w-3xl mx-auto">
              Support mathematical education and innovation by partnering with KU Mathematics Club.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff8c42] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Event Sponsorship</h3>
              <p className="text-[#6b8891] leading-relaxed">Support our workshops, competitions, and guest lectures</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#ffd700] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-[#2f3033]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Scholarship Programs</h3>
              <p className="text-[#6b8891] leading-relaxed">Help deserving students pursue mathematical excellence</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#264653] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Research Support</h3>
              <p className="text-[#6b8891] leading-relaxed">Fund student research projects and publications</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-[#ff8c42] hover:bg-[#e67220] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200">
              Learn About Partnership
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
