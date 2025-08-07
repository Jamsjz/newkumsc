"use client";

import React, { useState } from 'react';
import { ArrowRight, Users, Calendar, BookOpen, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const CallToAction: React.FC = () => {
	const [email, setEmail] = useState('');
	const [isSubscribed, setIsSubscribed] = useState(false);

	const handleSubscribe = (e: React.FormEvent) => {
		e.preventDefault();
		if (email) {
			setIsSubscribed(true);
			setTimeout(() => {
				setIsSubscribed(false);
				setEmail('');
			}, 3000);
		}
	};

	return (
		<React.Fragment>
			<section className="py-16 bg-gradient-to-br from-[#2f3033] to-[#264653] relative overflow-hidden">
				{/* Mathematical Background Elements */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute top-10 left-10 text-8xl text-white font-light">∑</div>
					<div className="absolute top-20 right-20 text-6xl text-white font-light">∫</div>
					<div className="absolute bottom-20 left-20 text-7xl text-white font-light">π</div>
					<div className="absolute bottom-10 right-10 text-5xl text-white font-light">∞</div>
				</div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
					<div className="text-center mb-12">
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
							Ready to Join Our Mathematical Journey?
						</h2>
						<p className="text-xl text-[#6b8891] max-w-3xl mx-auto leading-relaxed">
							Become part of a community that celebrates mathematical excellence, fosters innovation,
							and creates lasting impact in the world of mathematics.
						</p>
					</div>

					<div className="grid lg:grid-cols-2 gap-12 items-center">
						{/* Left Side - Benefits */}
						<div className="space-y-6">
							<div className="flex items-start space-x-4">
								<div className="flex-shrink-0 w-12 h-12 bg-[#ff8c42] rounded-xl flex items-center justify-center">
									<Users className="h-6 w-6 text-white" />
								</div>
								<div>
									<h3 className="text-xl font-semibold text-white mb-2">
										Join 150+ Active Members
									</h3>
									<p className="text-[#6b8891] leading-relaxed">
										Connect with passionate mathematicians, collaborate on projects, and build lifelong friendships.
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="flex-shrink-0 w-12 h-12 bg-[#ffd700] rounded-xl flex items-center justify-center">
									<Calendar className="h-6 w-6 text-[#2f3033]" />
								</div>
								<div>
									<h3 className="text-xl font-semibold text-white mb-2">
										Exclusive Events & Workshops
									</h3>
									<p className="text-[#6b8891] leading-relaxed">
										Attend cutting-edge workshops, guest lectures, and competitions designed to enhance your skills.
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="flex-shrink-0 w-12 h-12 bg-[#264653] rounded-xl flex items-center justify-center">
									<BookOpen className="h-6 w-6 text-white" />
								</div>
								<div>
									<h3 className="text-xl font-semibold text-white mb-2">
										Contribute to Bismaya Magazine
									</h3>
									<p className="text-[#6b8891] leading-relaxed">
										Share your mathematical insights and research with our community through our flagship publication.
									</p>
								</div>
							</div>
						</div>

						{/* Right Side - Action Cards */}
						<div className="space-y-6">
							{/* Membership Card */}
							<div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl hover:bg-white/15 transition-all duration-300">
								<h3 className="text-2xl font-bold text-white mb-4">Become a Member</h3>
								<p className="text-[#6b8891] mb-6">
									Join our community and gain access to all club activities, resources, and networking opportunities.
								</p><Link href="/contact#contact-form">
									<Button className="w-full bg-[#ff8c42] hover:bg-cta-orange-hover text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 group">
										<span>Contact Us</span>
										<ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
									</Button></Link>
							</div>

							{/* Newsletter Signup */}
							<div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl">
								<h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
								<p className="text-[#6b8891] mb-6">
									Get the latest news about events, competitions, and club activities delivered to your inbox.
								</p>

								{!isSubscribed ? (
									<form onSubmit={handleSubscribe} className="space-y-4">
										<div className="relative">
											<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#6b8891]" />
											<Input
												type="email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												placeholder="Enter your email address"
												className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-[#6b8891] focus:outline-none focus:ring-2 focus:ring-[#ff8c42] focus:border-transparent"
												required
											/>
										</div>
										<Button
											type="submit"
											className="w-full bg-[#264653] hover:bg-cta-dark-blue-hover text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200"
										>
											Subscribe to Newsletter
										</Button>
									</form>
								) : (
									<div className="flex items-center justify-center space-x-2 text-[#ffd700] py-3">
										<CheckCircle className="h-5 w-5" />
										<span className="font-semibold">Successfully subscribed!</span>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		</React.Fragment>
	);
};

export default CallToAction;
