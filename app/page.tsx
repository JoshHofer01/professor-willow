import { BoostedShinies } from "@/components/BoostedShinies";
import { CurrentEventsCarousel } from "@/components/ClientComponents/EventCarousel";
import { DashboardCard } from "@/components/CustomCards/DashboardCard";
import UpcomingEventsDashboard from "@/components/EventsGroup/UpcomingEventsDash";
import { Button } from "@/components/shadcn/button";
import { getEvents } from "@/utils/getEvents";
import { CalendarDays } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const { liveEvents } = await getEvents();
  return (
    <main className="container max-w-full p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 ">
        {/* Current Events Carousel */}
        <DashboardCard
          title={`Live Events`}
          action={
            <Link href={"events/live"}>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          }
          className="md:col-span-2 md:row-span-2 xl:row-span-1 2xl:row-span-2"
        >
          <CurrentEventsCarousel eventData={liveEvents} />
        </DashboardCard>

        {/* All Events */}
        <DashboardCard
          title="Happening soon!"
          description="Nearest upcoming events at a glance"
          button={{
            text: "See more",
            href: "/events/upcoming",
            icon: CalendarDays,
          }}
          className="md:col-span-2 lg:col-span-1 xl:col-span-1"
        >
          <UpcomingEventsDashboard />
        </DashboardCard>

        {/* Welcome */}
        <DashboardCard
          title="Welcome to ProfessorWillow"
          description="ProfessorWillow will become your best Pokemon GO companion, helping you plan for upcoming events, and finding out the information you want at a glance!"
          className="row-span-1"
        >
          <div className="flex items-center justify-center h-full bg-linear-to-br from-green-500/20 to-blue-500/20 rounded-lg">
            <span className="text-4xl p-3">🎲</span>
          </div>
        </DashboardCard>

        {/* Boosted Shiny Spawns */}
        <DashboardCard
          title="Boosted Shinies"
          action={
            <div className="flex flex-col text-sm text-right">
              <p>Last edit:</p>
              <p className="font-semibold">6th Jan</p>
            </div>
          }
          className="2xl:col-span-2"
        >
          <BoostedShinies />
        </DashboardCard>

        {/* Boosted Spawns */}
        {/* <DashboardCard
          title="Boosted Spawns"
          action={<div className="flex flex-col text-sm text-right"><p>Last edit:</p><p className="font-semibold">22nd Dec</p></div>}
        >
          <div className="flex items-center justify-center h-32 xl:h-full bg-linear-to-br from-foreground/20 to-background/20 rounded-lg">
            <span className="text-xl font-semibold">Coming soon</span>
          </div>
        </DashboardCard> */}

        {/* Discord */}
        <DashboardCard
          title="Discord"
          button={{
            text: "Register",
            href: "/",
            className: "w-full",
          }}
          className="xl:col-span-1 2xl:col-span-2"
        >
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <span className="text-4xl">💬</span>
            <p className="text-sm text-muted-foreground text-center">
              Register interest for ProfessorWillow community server
            </p>
          </div>
        </DashboardCard>

        {/* GBL Builds */}
        <DashboardCard
          title="GBL Builds"
          description="Recommended builds for GO Battle League"
          action={
            <Button variant="ghost" size="sm">
              Coming soon
            </Button>
          }
        >
          <div className="flex flex-col gap-2 h-full">
            <div className="flex-1 bg-muted rounded-lg flex items-center justify-center">
              <span className="text-4xl py-2">⚔️</span>
            </div>
          </div>
        </DashboardCard>

        {/* IV Calculator */}
        {/* <DashboardCard
          title="IV Calculator"
          description="Precisely assess your Pokemon"
        >
          <div className="flex items-center justify-center h-24 bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-lg">
            <span className="text-3xl">🧮</span>
          </div>
        </DashboardCard> */}
      </div>
    </main>
  );
}
