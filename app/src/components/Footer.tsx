"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

import {
  Footer,
  FooterBottom,
  FooterColumn,
  FooterContent,
} from "@/components/ui/footer";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { LogoIcon } from "./Preloader";
import LogoIconSVG from "@/assets/logo-icon.svg";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  logo?: ReactNode;
  name?: string;
  columns?: FooterColumnProps[];
  copyright?: string;
  policies?: FooterLink[];
  showModeToggle?: boolean;
  className?: string;
}

export default function FooterSection({
  name = "Meta Software",
  columns = [
    {
      title: "Company",
      links: [
        { text: "About", href: "#" },
        { text: "Blog", href: "#" },
      ],
    },
    {
      title: "Contact",
      links: [
        { text: "Discord", href: "#" },
        { text: "Twitter", href: "#" },
        { text: "Github", href: "#", },
      ],
    },
  ],
  copyright = "© 2025 Meta Software. All rights reserved",
  policies = [
    { text: "Privacy Policy", href: "#" },
    { text: "Terms of Service", href: "#" },
  ],
  showModeToggle = true,
  className,
}: FooterProps) {

  const [strokeDuration, setStrokeDuration] = useState(4);
  const jsx = LogoIconSVG({});
  let d = "";
  const iconChildren = jsx.props.children;
  const pathElement = Array.isArray(iconChildren)
    ? iconChildren.find((el) => el?.type === "path")
    : iconChildren?.type === "path"
      ? iconChildren
      : null;

  if (pathElement?.props?.d)
    d = pathElement.props.d;

  useEffect(() => {
    if (d) {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", d);
      const length = path.getTotalLength();
      const duration = Math.max(2, length * 0.015); // Minimum of 2s, scale with length
      setStrokeDuration(duration);
    }
  }, [d]);

  return (
    <footer className={cn("bg-background w-full px-4", className)}>
      <div className="max-w-container mx-auto">
        <Footer>
          <FooterContent>
            <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <LogoIcon d={d} strokeDuration={strokeDuration} className="w-10 h-8 fill-red-500" />
                <h3 className="text-xl font-bold">{name}</h3>
              </div>
            </FooterColumn>
            {columns.map((column, index) => (
              <FooterColumn key={index}>
                <h3 className="text-md pt-1 font-semibold">{column.title}</h3>
                {column.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.href}
                    className="text-muted-foreground text-sm"
                  >
                    {link.text}
                  </a>
                ))}
              </FooterColumn>
            ))}
          </FooterContent>
          <FooterBottom>
            <div>{copyright}</div>
            <div className="flex items-center gap-4">
              {policies.map((policy, index) => (
                <a key={index} href={policy.href}>
                  {policy.text}
                </a>
              ))}
              {showModeToggle && <ModeToggle />}
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
