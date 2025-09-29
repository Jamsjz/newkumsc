"use client";

import React from 'react';
import Image from 'next/image';
import { Mail, Linkedin } from 'lucide-react';

interface CommitteeMember {
  name: string;
  position: string;
  year: string;
  major: string;
  bio: string;
  achievements: string[];
  email: string;
  linkedin: string;
  image: string;
  color: string;
}

interface CommitteeMemberCardProps {
  member: CommitteeMember;
}

const CommitteeMemberCard: React.FC<CommitteeMemberCardProps> = ({ member }) => {
  return (
    <div className="flip-card bg-transparent w-full h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flip-card-inner relative w-full h-full text-center transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
        {/* Front of the card */}
        <div className="flip-card-front absolute w-full h-full backface-hidden bg-[#f4f1de] rounded-2xl overflow-hidden flex flex-col justify-between">
          <div className="relative h-2/3 w-full">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
            />
            <div className={`absolute top-4 left-4 ${member.color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
              {member.position}
            </div>
          </div>
          <div className="p-4 text-center flex-grow flex flex-col justify-center">
            <h3 className="text-xl font-bold text-[#2f3033] mb-1">{member.name}</h3>
            <div className="text-[#6b8891] font-medium text-sm">{member.major}</div>
          </div>
        </div>

        {/* Back of the card */}
        <div className="flip-card-back absolute w-full h-full backface-hidden rotate-y-180 bg-[#2f3033] text-white rounded-2xl overflow-hidden p-6 flex flex-col justify-center items-center">
          <h3 className="text-xl font-bold mb-2">{member.name}</h3>
          <p className="text-sm leading-relaxed text-center mb-4 line-clamp-4">{member.bio}</p>
          <div className="mb-4 text-center">
            <h4 className="font-semibold text-sm mb-2">Key Achievements</h4>
            <ul className="text-xs space-y-1 list-disc list-inside">
              {member.achievements.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>
          </div>
          <div className="flex items-center space-x-3 mt-auto">
            <a 
              href={`mailto:${member.email}`}
              className="flex items-center justify-center w-10 h-10 bg-white rounded-full text-[#264653] hover:bg-[#264653] hover:text-white transition-all duration-200"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a 
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-white rounded-full text-[#264653] hover:bg-[#264653] hover:text-white transition-all duration-200"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitteeMemberCard;
