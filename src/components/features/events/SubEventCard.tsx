
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface SubEvent {
  title: string;
  description: string;
  image: string;
}

interface SubEventCardProps {
  subEvent: SubEvent;
}

const SubEventCard: React.FC<SubEventCardProps> = ({ subEvent }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
    >
      <div className="relative h-64">
        <Image src={subEvent.image} alt={subEvent.title} layout="fill" objectFit="cover" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{subEvent.title}</h3>
        <p className="text-gray-700">{subEvent.description}</p>
      </div>
    </motion.div>
  );
};

export default SubEventCard;
