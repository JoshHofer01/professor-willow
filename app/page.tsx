import { BoostedShinies } from "@/components/BoostedShinies";
import { CurrentEventsCarousel } from "@/components/ClientComponents/EventCarousel";
import { DashboardCard } from "@/components/CustomCards/DashboardCard";
import { Button } from "@/components/ui/button";
import { getEvents } from "@/utils/getEvents";
import { CalendarDays } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const { liveEvents } = await getEvents();
  return (
    <main className="container max-w-full p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
        {/* Current Events Carousel */}
        <DashboardCard
          title="Current Events"
          size="wide"
          action={
            <Link href={"events/live"}>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          }
        >
          <CurrentEventsCarousel eventData={liveEvents} />
        </DashboardCard>

        {/* Welcome */}
        <DashboardCard
          title="Welcome to ProfessorWillow"
          description="ProfessorWillow is a web app that tracks current and recent Pokémon GO events, with built-in tools like an IV calculator and GBL build guides to help you play more efficiently."
        >
          <div className="flex items-center justify-center h-32 xl:h-full bg-linear-to-br from-green-500/20 to-blue-500/20 rounded-lg">
            <span className="text-4xl">🎲</span>
          </div>
        </DashboardCard>

        {/* All Events */}
        <DashboardCard
          title="All Events"
          description="Overview of live, upcoming, and recent events in Pokemon GO"
          className=""
          button={{
            text: "View Events",
            href: "/events",
            icon: CalendarDays,
          }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <span className="text-4xl">&#128197;</span>
          </div>
        </DashboardCard>

        {/* Boosted Shiny Spawns */}
        <DashboardCard
          title="Boosted Shinies Today"
          action={
            <Button variant="ghost" size="sm">
              View All
            </Button>
          }
        >
          <BoostedShinies />
        </DashboardCard>

        {/* GBL Builds */}
        <DashboardCard
          title="GBL Builds"
          description="Recommended builds for GO Battle League"
          action={
            <Button variant="ghost" size="sm">
              View More
            </Button>
          }
        >
          <div className="flex flex-col gap-2 h-full">
            <div className="flex-1 bg-muted rounded-lg flex items-center justify-center">
              <span className="text-4xl py-2">⚔️</span>
            </div>
            {/* <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-muted rounded" />
              ))}
            </div> */}
          </div>
        </DashboardCard>

        {/* IV Calculator */}
        <DashboardCard
          title="IV Calculator"
          description="Precisely assess your Pokemon"
        >
          <div className="flex items-center justify-center h-24 bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-lg">
            <span className="text-3xl">🧮</span>
          </div>
        </DashboardCard>

        {/* Discord */}
        <DashboardCard
          title="Discord"
          size="xlWide"
          button={{
            text: "Register",
            href: "/",
            className: "w-full",
          }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <span className="text-4xl">💬</span>
            <p className="text-sm text-muted-foreground text-center">
              Register interest for ProfessorWillow community server
            </p>
          </div>
        </DashboardCard>
      </div>
    </main>
  );
}
