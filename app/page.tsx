import HomeScreen from "@/app/homeScreen/homeScreen";
import OffersScreen from "@/app/timelineScreen/offersScreen";
import SubsidiariteScreen from "@/app/subsidiariteScreen/subsidiariteScreen";
import TemoignagesScreen from "@/app/temoignagesScreen/temoignagesScreen";
import NotreEquipeScreen from "@/app/notreEquipeScreen/notreEquipeScreen";
import ContactScreen from "@/app/contactScreen/contactScreen";
import HeadLine from "@/components/headLine";

export default function Home() {
  return (
    <div className="h-screen w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory relative">
      <HeadLine />
      <HomeScreen />
      <OffersScreen />
      <SubsidiariteScreen />
      <TemoignagesScreen />
      <NotreEquipeScreen />
      <ContactScreen />
    </div>
  );
}
