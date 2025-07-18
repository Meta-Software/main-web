"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, type ReactNode } from "react";
import LogoIconSVG from "@/assets/logo-icon.svg";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

interface PreloaderProps {
  onComplete?: () => void;
  minDisplayTime?: number;
  children: ReactNode;
}

export default function Preloader({
  children,
  onComplete,
  minDisplayTime = 2000,
}: PreloaderProps) {
  const isDev = process.env.NEXT_PUBLIC_DEV === 'true';
  const [logoComplete, setLogoComplete] = useState(false);
  const [minTimeComplete, setMinTimeComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(isDev ? false : true);

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

  useEffect(() => {
    const timer = setTimeout(() => setMinTimeComplete(true), minDisplayTime);
    return () => clearTimeout(timer);
  }, [minDisplayTime]);

  const canHide = logoComplete && minTimeComplete;

  useEffect(() => {
    if (canHide) {
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 300); // small delay for smooth transition
      return () => clearTimeout(hideTimer);
    }
  }, [canHide, onComplete]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            className="fixed inset-0 z-50 bg-white dark:bg-black flex flex-col justify-center items-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: canHide ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <LogoIcon d={d} strokeDuration={strokeDuration} />
            <Logo onAnimationComplete={() => setLogoComplete(true)} duration={strokeDuration} />

            <motion.div
              className="mt-8 flex space-x-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isVisible && children}
    </>
  );
}

export function LogoIcon({
  d,
  strokeDuration,
  className
}: {
  d: string,
  strokeDuration: number
  className?: string
}) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn("w-48 h-24", className)}
    >
      {d && (
        <motion.path
          d={d}
          className="stroke-cyan-700 dark:stroke-cyan-200"
          strokeWidth={0.2}
          strokeLinejoin="miter"
          strokeLinecap="butt"
          fill="transparent"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: {
              duration: strokeDuration,
              ease: "easeInOut",
              delay: 0.2
            },
            opacity: {
              ease: "easeOut",
              delay: 0.2
            },
          }}
        />
      )}
    </motion.svg>
  );
}
