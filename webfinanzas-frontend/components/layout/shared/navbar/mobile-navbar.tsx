"use client"

import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { Menu, Link, Banknote } from "lucide-react";
import { Sheet } from "@/components/ui/sheet";
import React from "react";
import { ToggleTheme } from "../../toogle-theme";

export const MobileNavBar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
        <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between bg-card border-secondary"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <Banknote className="border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 text-white" />
                    FireNances
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
              </div>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-2" />

              <ToggleTheme />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    );
};
