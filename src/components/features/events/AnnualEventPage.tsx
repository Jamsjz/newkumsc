
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SubEventCard from './SubEventCard';

interface SubEvent {
  title: string;
  description: string;
  image: string;
}

interface Event {
  year: number;
  title: string;
  description: string;
  image: string;
  subEvents?: SubEvent[];
}

interface AnnualEventPageProps {
  title: string;
  description: string;
  events: Event[];
}

const AnnualEventPage: React.FC<AnnualEventPageProps> = ({ title, description, events }) => {
  const latestEvent = events.reduce((latest, current) => (current.year > latest.year ? current : latest), events[0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <motion.section
        className="relative h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url(${latestEvent.image})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />

        {/* Flying Infinity Symbols */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ x: Math.random() * window.innerWidth - window.innerWidth / 2, y: Math.random() * window.innerHeight - window.innerHeight / 2, z: -500, opacity: 0 }}
            animate={{ x: Math.random() * window.innerWidth - window.innerWidth / 2, y: Math.random() * window.innerHeight - window.innerHeight / 2, z: 500, opacity: 1 }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            style={{
              width: `${Math.random() * 50 + 20}px`,
              height: `${Math.random() * 50 + 20}px`,
            }}
          >
            <div className="w-full h-full bg-white rounded-full" />
          </motion.div>
        ))}

        <motion.div
          className="relative z-10 text-center p-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex justify-center items-center mb-4">
            <div className="w-48 h-48 bg-white rounded-full p-4 flex items-center justify-center">
              <div className="w-32 h-32 bg-gray-900 rounded-full" />
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight drop-shadow-lg">{title}</h1>
          <p className="text-xl md:text-2xl mt-4 max-w-3xl mx-auto text-gray-300">{description}</p>
        </motion.div>
      </motion.section>

      {/* Latest Event Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold">Latest Edition: {latestEvent.title}</h2>
            <p className="text-lg text-gray-400 mt-2">{latestEvent.description}</p>
          </motion.div>

          {latestEvent.subEvents && (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {latestEvent.subEvents.map((subEvent, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <SubEventCard subEvent={subEvent} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Past Events Section */}
      <section className="py-24 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Past Editions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {events
              .filter(event => event.year !== latestEvent.year)
              .map(event => (
                <motion.div
                  key={event.year}
                  className="border border-gray-700 rounded-lg overflow-hidden shadow-lg bg-gray-900"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image src={event.image} alt={event.title} width={400} height={250} className="w-full object-cover" />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold">{event.title}</h3>
                    <p className="text-gray-400 mt-2">{event.description}</p>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnnualEventPage;
