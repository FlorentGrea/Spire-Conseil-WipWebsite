"use client";

import { useState, useRef } from "react";
import HomeScreen from "@/components/screens/homeScreen";
import OffersScreen from "@/components/offersScreen";
import SubsidiariteScreen from "@/components/subsidiariteScreen";
import TemoignagesScreen from "@/components/temoignagesScreen";
import NotreEquipeScreen from "@/components/notreEquipeScreen";
import ContactScreen from "@/components/contactScreen";
import FooterScreen from "@/components/footerScreen";
import HeadLine from "@/components/headLine";
import ProductsScreen from "@/components/screens/productsScreen";
import ReviewsScreen from "@/components/screens/reviewsScreen";

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
    <div className="w-full overflow-x-hidden" style={{ backgroundColor: 'var(--color-sc-primary)' }}>
      <HeadLine />
      <HomeScreen />
      <ProductsScreen />
      {/*<ReviewsScreen />*/}
      {/*
      <SubsidiariteScreen />
      <NotreEquipeScreen />
      <ContactScreen />
      <FooterScreen /> */}
    </div>
  );
}
