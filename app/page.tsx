import { CardWithButton } from "@/components/CardWithButton";
import { TitleTextCard } from "@/components/TitleTextCard";

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl font-bold pb-2">Home</h1>
      <TitleTextCard 
      title="Welcome to ProfessorWillow.me"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."/>
      <CardWithButton 
      title="This is my card with a Button"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      buttonText="Test Button"/>
    </main>
  );
}
