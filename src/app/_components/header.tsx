"use client";

import { useState } from "react";
import Link from "next/link";
import { CMS_NAME } from "@/lib/constants";
import Container from "@/app/_components/container";
import { IBM_Plex_Serif } from "next/font/google";
import Image from "next/image";

const ibmSerif = IBM_Plex_Serif({ weight: ["400", "700"], subsets: ["latin"] });

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Container>
      <div className="flex justify-between items-center py-4">
        <Link href="/" className="select-none">
          <Image
            src="/logo.png"
            width={136 / 4}
            height={100 / 4}
            alt="lObserver logo"
            quality={100}
          />
          <h2
            className={`${ibmSerif.className} text-xl text-emerald-50 font-bold tracking-tight md:tracking-tighter leading-tight`}
          >
            LObserver
          </h2>
        </Link>
        <div className="hidden md:flex space-x-6 font-bold text-sm">
          <Link href="/" className="text-white hover:text-emerald-950">
            Home
          </Link>
          <Link href="/posts" className="text-white hover:text-emerald-950">
            Blog
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isMenuOpen ? (
              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mb-10">
          <ul className="flex flex-col space-y-4 mt-4">
            <li>
              <Link
                href="/"
                onClick={toggleMenu}
                className="text-white hover:underline block"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                onClick={toggleMenu}
                className="text-white hover:underline block"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>
      )}
    </Container>
  );
};

export default Header;
