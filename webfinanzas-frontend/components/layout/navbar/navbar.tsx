"use client";
import { Github } from "lucide-react";
import React from "react";
import { Button } from "../../ui/button";
import Link from "next/link";
import { ToggleTheme } from "../toogle-theme";
import { MobileNavBar } from "./platform/mobile-navbar";
import { DesktopNavBar } from "./platform/desktop-navbar";

export const Navbar = () => {
  return (
    <header className="w-[90%] md:w-[90%] lg:w-[90%] lg:[100%] top-5 mx-auto sticky z-40 flex justify-between items-center p-4">
      <Link href="/" className="font-bold text-lg flex items-center">
        FireNances
      </Link>
      
      <MobileNavBar />

      <DesktopNavBar />

      <div className="hidden lg:flex">
        <ToggleTheme />

        <Button asChild size="sm" variant="ghost" aria-label="View on GitHub">
          <Link
            aria-label="View on GitHub"
            href="https://github.com/Michillas"
            target="_blank"
          >
            <Github className="size-5" />
          </Link>
        </Button>
      </div>
    </header>
  );
};
