"use client";

import { FC } from "react";
import { ChevronBack } from "./icons";
// import { useRouter } from "next/router";

type LayoutProps = {
  children: React.ReactNode;
  canGoBack?: boolean;
  title: string;
};

const Layout: FC<LayoutProps> = ({ children, canGoBack, title }) => {
  // const router = useRouter();

  return (
    <>
      <header className="bg-white/30 shadow-sm px-4 py-2 sticky top-0 backdrop-blur">
        <div className="w-full max-w-screen-xl m-auto">
          <div className="flex flex-row items-center">
            {canGoBack && (
              <div
                onClick={() => {}}
                className="bg-white border mr-4 flex justify-center items-center w-8 h-8 rounded-full"
              >
                <ChevronBack />
              </div>
            )}
            <h4 className="h4">{title}</h4>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
