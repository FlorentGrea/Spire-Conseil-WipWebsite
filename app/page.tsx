"use client";

import { useState, useRef } from "react";
import HomeScreen from "@/components/screens/homeScreen";
import HeadLine from "@/components/headLine";
import ProductsScreen from "@/components/screens/productsScreen";
import ReviewsScreen from "@/components/screens/reviewsScreen";
import TeamScreen from "@/components/screens/teamScreen";

export default function Home() {

  return (
    <div className="w-full overflow-x-hidden" style={{ backgroundColor: 'var(--color-sc-primary)' }}>
      <HeadLine />
      <HomeScreen />
      <ProductsScreen />
      <ReviewsScreen />
      <TeamScreen />
      {/*
        <SubsidiariteScreen />
        <NotreEquipeScreen />
      <ContactScreen />
      <FooterScreen /> */}
    </div>
  );
}
