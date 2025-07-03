import TimelineScreen from "@/app/timelineScreen/timelineScreen";
import SubsidiariteScreen from "@/app/subsidiariteScreen/subsidiariteScreen";
import TemoignagesScreen from "@/app/temoignagesScreen/temoignagesScreen";
import NotreEquipeScreen from "@/app/notreEquipeScreen/notreEquipeScreen";
import ContactScreen from "@/app/contactScreen/contactScreen";
import HeadLine from "@/components/headLine";

export default function Home() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <HeadLine />
      <TimelineScreen />
      <SubsidiariteScreen />
      <TemoignagesScreen />
      <NotreEquipeScreen />
      <ContactScreen />
    </div>
  );
}
