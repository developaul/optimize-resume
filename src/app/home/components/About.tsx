import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { FC } from "react";

interface MemberProps {
  name: string;
  role: string;
  linkedin: string;
  github: string;
}

const TeamMemberCard: FC<MemberProps> = ({ name, role, linkedin, github }) => {
  return (
    <div className="bg-white rounded-lg py-3 px-6 flex flex-row justify-between items-center mb-3">
      <div className="flex flex-col">
        <h4 className="h4">{name}</h4>
        <small className="small">{role}</small>
      </div>
      <div className="flex flex-row gap-4">
        {linkedin && (
          <a href={linkedin} target="_blank">
            <LinkedinIcon />
          </a>
        )}
        {github && (
          <a href={github} target="_blank">
            <GithubIcon />
          </a>
        )}
      </div>
    </div>
  );
};

const About = () => {
  const members = [
    {
      name: "jhon Doe",
      role: "foo bar",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
    {
      name: "jhon Doe",
      role: "foo bar",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
    {
      name: "jhon Doe",
      role: "foo bar",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
    {
      name: "jhon Doe",
      role: "foo bar",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  ];

  return (
    <section
      className="py-16 px-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/waves.png')" }}
    >
      <div className="w-full max-w-screen-xl m-auto flex flex-col md:flex-row gap-16">
        <div className="flex-1">
          <h4 className="h4">Sobre el proyecto</h4>
          <p className="p">
            Desarrollamos Resume.AI para participar de una hackathon organizada
            por Vercel. Nos propusimos crear una solución innovadora para hacer
            más eficientes las búsquedas de empleo. Estamos orgullosos de lo que
            hemos logrado y esperamos que les sea tan útil como lo imaginamos
          </p>
        </div>
        <div className="flex-1">
          <h4 className="h4 mb-4">Nuestro equipo</h4>
          {members.map((member) => (
            <TeamMemberCard {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
