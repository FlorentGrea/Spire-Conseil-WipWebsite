"use client";

import { useState, useRef } from "react";
import HomeScreen from "@/components/homeScreen";
import OffersScreen from "@/components/offersScreen";
import SubsidiariteScreen from "@/components/subsidiariteScreen";
import TemoignagesScreen from "@/components/temoignagesScreen";
import NotreEquipeScreen from "@/components/notreEquipeScreen";
import ContactScreen from "@/components/contactScreen";
import FooterScreen from "@/components/footerScreen";
import HeadLine from "@/components/headLine";

export default function Home() {
  const homeScreenRef = useRef<{ getLineRightPosition: () => number | null }>(null);
  const [lineRightPosition, setLineRightPosition] = useState<number | null>(null);
  const [currentLandscape, setCurrentLandscape] = useState<number | null>(1);

  // Function to update line position from HomeScreen
  const handleLinePositionUpdate = () => {
    if (homeScreenRef.current) {
      const position = homeScreenRef.current.getLineRightPosition();
      setLineRightPosition(position);
    }
  };

  return (
    <div className="h-screen w-full overflow-y-scroll overflow-x-hidden relative">
      <HeadLine />
      <HomeScreen ref={homeScreenRef} onLinePositionChange={handleLinePositionUpdate} />
      <OffersScreen lineRightPosition={lineRightPosition} />
      <SubsidiariteScreen />
      <TemoignagesScreen />
      <NotreEquipeScreen />
      <ContactScreen />
      <FooterScreen />
    </div>
  );
}
