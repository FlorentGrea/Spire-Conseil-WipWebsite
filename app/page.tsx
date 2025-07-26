"use client";

import HomeScreen from "@/components/screens/homeScreen";
import HeadLine from "@/components/headLine";
import ProductsScreen from "@/components/screens/productsScreen";
import ReviewsScreen from "@/components/screens/reviewsScreen";
import TeamScreen from "@/components/screens/teamScreen";
import ContactScreen from "@/components/screens/contactScreen";
import Footer from "@/components/footer";
import MethodScreen from "@/components/screens/methodScreen";

export default function Home() {

  return (
    <div className="w-full overflow-x-hidden" style={{ backgroundColor: 'var(--color-sc-primary)' }}>
      <HeadLine />
      <HomeScreen />
      <ProductsScreen />
      {/*<MethodScreen />*/}
      <ReviewsScreen />
      <TeamScreen />
      <ContactScreen />
      <Footer />
    </div>
  );
}
