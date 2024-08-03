import { FC, PropsWithChildren, useMemo } from "react";

import { IPersonalInfo } from "@/server/types";
import { getFullName } from "@/lib/utils";
import Link, { LinkProps } from "next/link";

const PersonalInfo: FC<IPersonalInfo> = ({
  firstName,
  lastName,
  email,
  phone,
  linkedin,
  github,
  portfolio,
  description,
}) => {
  const fullName = useMemo(
    () => getFullName(firstName, lastName),
    [firstName, lastName]
  );

  return (
    <section>
      <h1 className="text-3xl font-bold text-center">{fullName}</h1>

      <ContanctInfo
        email={email}
        phone={phone}
        portfolio={portfolio}
        linkedin={linkedin}
        github={github}
      />

      <hr className="my-2 h-0.5 bg-black" />

      <p>{description}</p>
    </section>
  );
};

interface ContanctInfoProps
  extends Pick<
    IPersonalInfo,
    "email" | "phone" | "portfolio" | "linkedin" | "github"
  > {}

const ContanctInfo: FC<ContanctInfoProps> = ({
  email,
  phone,
  portfolio,
  linkedin,
  github,
}) => {
  const {
    addSeparatorEmail,
    addSeparatorPhone,
    addSeparatorPortfolio,
    addSeparatorLinkedin,
  } = useMemo(() => {
    const addSeparatorEmail = Boolean(phone || portfolio || linkedin || github);
    const addSeparatorPhone = Boolean(portfolio || linkedin || github);
    const addSeparatorPortfolio = Boolean(linkedin || github);
    const addSeparatorLinkedin = Boolean(github);

    return {
      addSeparatorEmail,
      addSeparatorPhone,
      addSeparatorPortfolio,
      addSeparatorLinkedin,
    };
  }, [phone, portfolio, linkedin, github]);

  return (
    <p className="text-center">
      {email && (
        <ContactLink href={`mailto:${email}`} addSeparator={addSeparatorEmail}>
          {email}
        </ContactLink>
      )}

      {phone && (
        <ContactLink href={`tel:${phone}`} addSeparator={addSeparatorPhone}>
          {phone}
        </ContactLink>
      )}

      {portfolio && (
        <ContactLink href={portfolio} addSeparator={addSeparatorPortfolio}>
          {portfolio}
        </ContactLink>
      )}

      {linkedin && (
        <ContactLink href={linkedin} addSeparator={addSeparatorLinkedin}>
          {linkedin}
        </ContactLink>
      )}

      {github && <ContactLink href={github}>github</ContactLink>}
    </p>
  );
};

interface ContactLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>,
    LinkProps,
    PropsWithChildren {
  addSeparator?: boolean;
}

const ContactLink: FC<ContactLinkProps> = ({
  href,
  children,
  addSeparator = false,
  ...props
}) => {
  return (
    <>
      <Link
        target="_blank"
        rel="noreferrer"
        className="text-blue underline"
        href={href}
        {...props}
      >
        {children}
      </Link>

      {addSeparator && " · "}
    </>
  );
};

export default PersonalInfo;
