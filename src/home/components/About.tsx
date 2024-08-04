import { BehanceIcon, GithubIcon, LinkedinIcon } from "@/components/icons";
import Link from "next/link";
import { FC } from "react";

interface MemberProps {
  name: string;
  role: string;
  linkedin?: string;
  github?: string;
  behance?: string;
}

const TeamMemberCard: FC<MemberProps> = ({
  name,
  role,
  linkedin,
  github,
  behance,
}) => {
  return (
    <div className="bg-[#F1F5F9] rounded-lg py-3 px-6 flex flex-row justify-between items-center mb-3">
      <div className="flex flex-col">
        <h4 className="h4">{name}</h4>
        <small className="small">{role}</small>
      </div>
      <div className="flex flex-row gap-4">
        {linkedin && (
          <Link href={linkedin} target="_blank" rel="noreferrer">
            <LinkedinIcon />
          </Link>
        )}
        {github && (
          <Link href={github} target="_blank" rel="noreferrer">
            <GithubIcon />
          </Link>
        )}
        {behance && (
          <Link href={behance} target="_blank" rel="noreferrer">
            <BehanceIcon />
          </Link>
        )}
      </div>
    </div>
  );
};

const About = () => {
  const members = [
    {
      name: "Paul Chávez",
      role: "Full Stack Developer",
      linkedin: "https://www.linkedin.com/in/developaul/",
      github: "https://github.com/developaul",
    },
    {
      name: "Luis Sullca H",
      role: "Back-End Developer",
      // linkedin: "https://linkedin.com",
      github: "https://github.com/Louiso",
    },
    {
      name: "Micaela Leguizamon",
      role: "UX / UI Designer",
      linkedin: "https://www.linkedin.com/in/micaela-leguiz/",
      behance: "https://www.behance.net/micaela-leguiz",
    },
    {
      name: "Juan De León",
      role: "Front-End Developer",
      linkedin: "https://www.linkedin.com/in/juan-dl/",
      github: "https://github.com/deleonjuan",
    },
  ];

  return (
    <section>
      <div className="w-full max-w-screen-xl m-auto flex flex-col md:flex-row gap-16">
        <div className="flex-1">
          <h4 className="h4">Sobre el proyecto</h4>
          <p className="p">
            Desarrollamos <strong>Optimize resume</strong> para participar de
            una hackathon organizada por Vercel. Nos propusimos crear una
            solución innovadora para hacer más eficientes las búsquedas de
            empleo. Estamos orgullosos de lo que hemos logrado y esperamos que
            les sea tan útil como lo imaginamos
          </p>
        </div>
        <div className="flex-1">
          <h4 className="h4 mb-4">Nuestro equipo</h4>
          {members.map((member) => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
