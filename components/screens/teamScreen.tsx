'use client';

import { useState } from 'react';
import Image from 'next/image';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "John Doe",
    role: "CEO",
    image: "/team/john.jpg", 
    description: "Founder and CEO with 15 years of experience in management consulting."
  },
  {
    name: "Jane Smith",
    role: "COO",
    image: "/team/jane.jpg",
    description: "Operations expert specializing in organizational transformation."
  },
  {
    name: "Mike Johnson",
    role: "Lead Consultant",
    image: "/team/mike.jpg",
    description: "Senior consultant focused on leadership development and team building."
  }
];

export default function TeamScreen() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  return (
    <div 
      className="screen-container"
      style={{ backgroundColor: 'color-mix(in srgb, var(--color-sc-tertiary) 9%, transparent)' }}
      data-screen="team"
    >
      <div className="screen-content flex flex-col gap-4">
        <div className="relative px-4 lg:px-6 py-2 z-10" style={{ backgroundColor: 'var(--color-sc-secondary)'}}>
          <div className="absolute top-0 left-0 w-full h-30 z-10" style={{ backgroundColor: 'var(--color-sc-secondary)'}} />
          <h1 className="relative title-text text-center z-20" style={{ color: 'var(--color-sc-primary)'}}>
            Notre équipe
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
          {teamMembers.map((member, index) => (
            <div 
              key={member.name}
              className="flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => setSelectedMember(selectedMember === index ? null : index)}
              style={{ backgroundColor: 'var(--color-sc-secondary)' }}
            >
              <div className="relative w-40 h-40 mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover rounded-full"
                  unoptimized
                />
              </div>
              <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--color-sc-primary)' }}>
                {member.name}
              </h2>
              <h3 className="text-lg mb-2" style={{ color: 'var(--color-sc-primary)' }}>
                {member.role}
              </h3>
              {selectedMember === index && (
                <p className="text-center mt-2" style={{ color: 'var(--color-sc-primary)' }}>
                  {member.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
