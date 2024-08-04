"use client";

import { FC } from "react";
import { ChevronBack, GithubIcon } from "./icons";
import Link from "next/link";

type LayoutProps = {
  children: React.ReactNode;
  goBack?: () => void;
  title: string;
  bodyClassName?: any;
};

const Layout: FC<LayoutProps> = ({
  children,
  goBack,
  title,
  bodyClassName,
}) => {
  return (
    <>
      <header className="bg-white/30 shadow-sm px-4 py-2 sticky top-0 backdrop-blur z-10">
        <div className="w-full max-w-screen-xl m-auto flex items-center justify-between">
          <div className="flex flex-row items-center">
            {goBack && (
              <div
                onClick={goBack}
                className="bg-white border mr-4 flex justify-center items-center w-8 h-8 rounded-full cursor-pointer"
              >
                <ChevronBack />
              </div>
            )}
            <h1 className="h4">{title}</h1>
          </div>

          <Link
            href="https://github.com/developaul/optimize-resume"
            target="_blank"
            rel="noreferrer"
            aria-label="Github del proyecto"
          >
            <GithubIcon />
          </Link>
        </div>
      </header>
      <main
        className={`py-16 px-4 bg-cover bg-center ${bodyClassName}`}
        style={{ backgroundImage: "url('/background.webp')" }}
      >
        {children}
      </main>
    </>
  );
};

export default Layout;
