import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Linkedin, Github, Mail, Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { TeamMember } from "@shared/schema";

const fallbackTeamMembers = [
  {
    name: "Hadi Setiawan",
    role: "Lead AI Developer",
    expertise: ["AI/ML", "Full-Stack", "Architecture"],
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hadi",
    bio: "10+ tahun pengalaman dalam pengembangan AI dan sistem enterprise",
    social: {
      linkedin: "#",
      github: "#",
      email: "hadi@domain.com"
    }
  },
  {
    name: "Sarah Wijaya",
    role: "UI/UX Designer",
    expertise: ["Product Design", "User Research", "Prototyping"],
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    bio: "Spesialis dalam menciptakan pengalaman pengguna yang intuitif",
    social: {
      linkedin: "#",
      github: "#",
      email: "sarah@domain.com"
    }
  },
  {
    name: "Budi Santoso",
    role: "Backend Engineer",
    expertise: ["Node.js", "Python", "Database"],
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi",
    bio: "Expert dalam membangun sistem backend yang scalable",
    social: {
      linkedin: "#",
      github: "#",
      email: "budi@domain.com"
    }
  },
  {
    name: "Dewi Lestari",
    role: "Data Scientist",
    expertise: ["ML", "Analytics", "AI Models"],
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dewi",
    bio: "Mengubah data menjadi insights yang actionable dengan AI",
    social: {
      linkedin: "#",
      github: "#",
      email: "dewi@domain.com"
    }
  }
];

export default function Team() {
  const { data: teamMembers, isLoading, error } = useQuery<TeamMember[]>({
    queryKey: ["team-members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('status', 'active')
        .order('display_order', { ascending: true });

      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  const displayMembers = teamMembers && teamMembers.length > 0 ? teamMembers : fallbackTeamMembers;

  if (isLoading) {
    return (
      <section className="section-mobile bg-white animate-fade-in" id="team">
        <div className="max-w-7xl mx-auto container-mobile">
          <div className="text-center space-y-4 mb-12 md:mb-16 animate-slide-up">
            <Badge className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 border-primary-200/50 hover:bg-primary-100 transition-all duration-300 text-mobile-sm px-4 py-1.5 rounded-full font-medium">
              <Award className="w-3.5 h-3.5" />
              Tim Profesional
            </Badge>
            <h2 className="text-mobile-2xl tracking-tight text-gray-900 font-bold">
              Bertemu dengan Tim Kami
            </h2>
            <p className="text-mobile-base text-gray-600 max-w-2xl mx-auto font-normal">
              Tim ahli yang berdedikasi untuk menghadirkan solusi AI terbaik untuk bisnis Anda
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden p-2 sm:p-3 md:p-4 lg:p-6 hover:shadow-lg transition-all">
                <div className="space-y-5">
                  <Skeleton className="w-28 h-28 mx-auto rounded-full" />
                  <div className="text-center space-y-2.5">
                    <Skeleton className="h-5 w-32 mx-auto" />
                    <Skeleton className="h-4 w-24 mx-auto" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-mobile bg-white animate-fade-in" id="team">
      <div className="max-w-7xl mx-auto container-mobile">
        <div className="text-center space-y-4 mb-12 md:mb-16 animate-slide-up">
          <Badge className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 border-primary-200/50 hover:bg-primary-100 transition-all duration-300 text-mobile-sm px-4 py-1.5 rounded-full font-medium">
            <Award className="w-3.5 h-3.5" />
            Tim Profesional
          </Badge>
          <h2 className="text-mobile-2xl tracking-tight text-gray-900 font-bold">
            Bertemu dengan Tim Kami
          </h2>
          <p className="text-mobile-base text-gray-600 max-w-2xl mx-auto font-normal">
            Tim ahli yang berdedikasi untuk menghadirkan solusi AI terbaik untuk bisnis Anda
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {displayMembers.map((member: any, index: number) => (
            <Card
              key={index}
              className="bg-white border border-gray-100 rounded-2xl hover:border-primary-200 hover:shadow-xl hover:scale-[1.03] transition-all duration-300 animate-slide-up group overflow-hidden p-2 sm:p-3 md:p-4 lg:p-6"
              style={{ animationDelay: `${index * 0.1}s` }}
              data-testid={`card-team-${index + 1}`}
            >
              <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5">
                {/* Avatar with gradient border */}
                <div className="relative pt-1 sm:pt-1.5 md:pt-2">
                  <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full blur-sm sm:blur-md opacity-30 group-hover:opacity-60 transition-all duration-300"></div>
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 mx-auto rounded-full overflow-hidden border-2 sm:border-3 md:border-4 border-white shadow-lg sm:shadow-xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="text-center space-y-1 sm:space-y-1.5 md:space-y-2.5">
                  <div>
                    <h3 className="text-xs sm:text-sm md:text-base font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-0.5 sm:mb-1">
                      {member.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs md:text-sm font-semibold gradient-text-accent">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground leading-relaxed min-h-[1.5rem] sm:min-h-[2rem] md:min-h-[2.5rem] line-clamp-2">
                    {member.bio}
                  </p>
                </div>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-0.5 sm:gap-1 md:gap-1.5 justify-center">
                  {member.expertise.slice(0, 2).map((skill: string, idx: number) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px] px-0.5 sm:px-1 md:px-1.5 py-[1px] sm:py-0.5 font-medium leading-none h-auto min-h-0"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {member.expertise.length > 2 && (
                    <Badge variant="secondary" className="text-[6px] sm:text-[7px] md:text-[8px] px-0.5 sm:px-1 py-[1px] sm:py-0.5 leading-none h-auto min-h-0">
                      +{member.expertise.length - 2}
                    </Badge>
                  )}
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-0.5 sm:gap-1 pt-1 border-t border-border/50">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9 hover:text-primary"
                    asChild
                  >
                    <a href={member.linkedinUrl || member.social?.linkedin || '#'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9 hover:text-primary"
                    asChild
                  >
                    <a href={member.githubUrl || member.social?.github || '#'} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <Github className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9 hover:text-primary"
                    asChild
                  >
                    <a href={`mailto:${member.email || member.social?.email || ''}`} aria-label="Email">
                      <Mail className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
