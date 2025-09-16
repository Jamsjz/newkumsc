import HeroSection from '@/components/shared/HeroSection';
import { Mail, Linkedin, Calendar, Users, Award, BookOpen } from 'lucide-react';
import leadershipData from '@/data/leadership.json';
import Image from 'next/image';


const Leadership: React.FC = () => {
  // const [activeYear, setActiveYear] = useState('2025'); // Future feature for year filtering

  return (
    <div className="pt-16">
      <HeroSection
        title="Leadership"
        description="Meet the dedicated individuals who guide our club&apos;s vision, manage our initiatives, and inspire mathematical excellence."
      />

      {/* Current Executive Committee */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2f3033] mb-4">
              Executive Committee 2025
            </h2>
            <p className="text-lg text-[#6b8891] max-w-3xl mx-auto">
              Our current leadership team brings diverse skills and perspectives to guide the club&apos;s mission and activities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipData.executiveCommittee['2025'].map((member, index) => (
              <div key={index} className="bg-[#f4f1de] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute top-4 left-4 ${member.color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                    {member.position}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#2f3033] mb-2">{member.name}</h3>
                  <div className="text-[#6b8891] mb-4">
                    <div className="font-medium">{member.year} • {member.major}</div>
                  </div>
                  
                  <p className="text-[#6b8891] text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-[#2f3033] text-sm mb-2">Key Achievements</h4>
                    <ul className="text-xs text-[#6b8891] space-y-1">
                      {member.achievements.map((achievement, i) => (
                        <li key={i}>• {achievement}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center space-x-3">
                    <a 
                      href={`mailto:${member.email}`}
                      className="flex items-center justify-center w-10 h-10 bg-white rounded-full text-[#264653] hover:bg-[#264653] hover:text-white transition-all duration-200"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                    <a 
                      href={member.linkedin}
                      className="flex items-center justify-center w-10 h-10 bg-white rounded-full text-[#264653] hover:bg-[#264653] hover:text-white transition-all duration-200"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="py-16 bg-[#f4f1de]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2f3033] mb-4">
              Advisory Board
            </h2>
            <p className="text-lg text-[#6b8891] max-w-3xl mx-auto">
              Experienced faculty members who provide guidance, mentorship, and strategic direction for our club&apos;s growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipData.advisoryBoard.map((advisor, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                {advisor.image ? (
                  <Image
                    src={advisor.image}
                    alt={advisor.name}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center shadow-lg">
                    <Users className="h-8 w-8 text-gray-500" />
                  </div>
                )}
                <h3 className="text-xl font-bold text-[#2f3033] mb-2">{advisor.name}</h3>
                <div className="text-[#ff8c42] font-semibold mb-1">{advisor.position}</div>
                <div className="text-[#6b8891] text-sm mb-3">{advisor.department}</div>
                <div className="text-[#264653] font-medium text-sm mb-4">{advisor.specialization}</div>
                <p className="text-[#6b8891] text-sm leading-relaxed">{advisor.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2f3033] mb-4">
              Organizational Structure
            </h2>
            <p className="text-lg text-[#6b8891] max-w-3xl mx-auto">
              Understanding our club&apos;s hierarchy and the responsibilities of each position.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff8c42] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#2f3033] mb-2">Executive Committee</h3>
              <p className="text-[#6b8891] text-sm">Strategic planning and overall club management</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#264653] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#2f3033] mb-2">Academic Team</h3>
              <p className="text-[#6b8891] text-sm">Tutoring, workshops, and academic support</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#c41e3a] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#2f3033] mb-2">Event Team</h3>
              <p className="text-[#6b8891] text-sm">Planning and executing club activities</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#ffd700] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-[#2f3033]" />
              </div>
              <h3 className="text-lg font-bold text-[#2f3033] mb-2">Special Committees</h3>
              <p className="text-[#6b8891] text-sm">Publications, outreach, and special projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* Past Leaders */}
      <section className="py-16 bg-[#f4f1de]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2f3033] mb-4">
              Alumni Leaders
            </h2>
            <p className="text-lg text-[#6b8891] max-w-3xl mx-auto">
              Honoring former leaders who laid the foundation for our club&apos;s success and continue to inspire us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipData.pastLeaders.map((leader, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover shadow-lg"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-[#2f3033]">{leader.name}</h3>
                    <div className="text-[#ff8c42] font-semibold text-sm">{leader.position}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <span className="text-[#6b8891] text-sm">Currently: </span>
                    <span className="text-[#2f3033] font-medium text-sm">{leader.current}</span>
                  </div>
                  <div>
                    <span className="text-[#6b8891] text-sm">Legacy: </span>
                    <span className="text-[#264653] font-medium text-sm">{leader.achievement}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Leadership;
