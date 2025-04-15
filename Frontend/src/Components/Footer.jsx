import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#333] text-[#f2f2f2] text-center px-4 py-5 font-sans border-t-2 border-[#444] w-screen absolute left-0">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center gap-2.5">
        <p className="text-sm m-0">
          © 2025 Mayur K Setty. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/mayurksetty.photography"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-[#f2f2f2] text-xl transition-colors duration-300 hover:text-[#c4e510] active:scale-90"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/mayurksetty"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#f2f2f2] text-xl transition-colors duration-300 hover:text-[#c4e510] active:scale-90"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/mayur-driod"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[#f2f2f2] text-xl transition-colors duration-300 hover:text-[#c4e510] active:scale-90"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
