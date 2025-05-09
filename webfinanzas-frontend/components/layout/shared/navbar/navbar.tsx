"use client";

import { Github } from "lucide-react";
import React from "react";
import { Button } from "../../../ui/button";
import Link from "next/link";
import { ToggleTheme } from "../../toogle-theme";
import { MobileNavBar } from "./mobile-navbar";
import { DesktopNavBar } from "./desktop-navbar";

import { useEffect, useState } from "react";


export const Navbar = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload();
  };

  return (
    <header className="w-[90%] md:w-[90%] lg:w-[90%] lg:[100%] top-5 mx-auto sticky z-40 flex justify-between items-center p-4">
      <Link href="/" className="font-bold text-lg flex items-center">
        FireNances
      </Link>

      <MobileNavBar />

      <DesktopNavBar />

      {username ? (
        <div className="hidden lg:flex items-center">
          <Button 
          variant="link"
          className="font-bold cursor-default text-white"
          >
            {username}
          </Button>
          <Button
            asChild
            variant="ghost"
            className="font-bold mr-4 text-primary"
            onClick={handleLogout}
          >
            <Link
              href="/"
            >
              Cerrar sesión
            </Link>
          </Button>
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
      ) : (
        <div className="hidden lg:flex items-center">
          <Button
            asChild
            variant="ghost"
            className="font-bold"
          >
            <Link
              href="/login"
            >
              Iniciar sesión
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="font-bold mr-4 text-primary"
          >
            <Link
              href="/register"
            >
              Crear una cuenta
            </Link>
          </Button>
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
      )}
    </header>
  );
};
