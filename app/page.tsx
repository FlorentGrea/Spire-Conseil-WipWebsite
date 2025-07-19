"use client";

import { useState, useRef } from "react";
import HomeScreen from "@/app/homeScreen/homeScreen";
import OffersScreen from "@/app/timelineScreen/offersScreen";
import SubsidiariteScreen from "@/app/subsidiariteScreen/subsidiariteScreen";
import TemoignagesScreen from "@/app/temoignagesScreen/temoignagesScreen";
import NotreEquipeScreen from "@/app/notreEquipeScreen/notreEquipeScreen";
import ContactScreen from "@/app/contactScreen/contactScreen";
import HeadLine from "@/components/headLine";

export default function Home() {
  const homeScreenRef = useRef<{ getLineRightPosition: () => number | null }>(null);
  const [lineRightPosition, setLineRightPosition] = useState<number | null>(null);

  // Function to update line position from HomeScreen
  const handleLinePositionUpdate = () => {
    if (homeScreenRef.current) {
      const position = homeScreenRef.current.getLineRightPosition();
      setLineRightPosition(position);
    }
  };

  return (
    <div className="h-screen w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory relative">
      <HeadLine />
      <HomeScreen ref={homeScreenRef} onLinePositionChange={handleLinePositionUpdate} />
      <OffersScreen lineRightPosition={lineRightPosition} />
      <SubsidiariteScreen />
      <TemoignagesScreen />
      <NotreEquipeScreen />
      <ContactScreen />
    </div>
  );
}
