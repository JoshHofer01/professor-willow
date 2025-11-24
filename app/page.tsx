import { CurrentEventsCarousel } from "@/components/CurrentEvents";
import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
export default function DashboardPage() {
  return (
    <main className="container max-w-full p-4 md:p-6 lg:p-8">
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
        <DashboardCard
          title="Welcome to ProfessorWillow"
          description="ProfessorWillow is a web app that tracks current and recent Pokémon GO events, with built-in tools like an IV calculator and GBL build guides to help you play more efficiently."
          size="wide"
        >
          <div className="flex items-center justify-center h-32 bg-linear-to-br from-green-500/20 to-blue-500/20 rounded-lg">
            <span className="text-4xl">🎲</span>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Current Events"
          size="tall"
        >
          <CurrentEventsCarousel />
        </DashboardCard>


        <DashboardCard
          title="All Events"
          description="View interactive calendar of live and recent events in Pokemon GO"
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

        <DashboardCard
          title="GBL Builds"
          description="View recommended builds for GO Battle League"
          size="tall"
        >
          <div className="flex flex-col gap-2 h-full">
            <div className="flex-1 bg-muted rounded-lg flex items-center justify-center">
              <span className="text-6xl">⚔️</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-muted rounded" />
              ))}
            </div>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Boosted Spawns Today"
          action={
            <Button variant="ghost" size="sm">
              View All
            </Button>
          }
        >
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded" />
            ))}
          </div>
        </DashboardCard>

        <DashboardCard
          title="Discord"
          size="wide"
          button={{
            text: "Register",
            href: "/",
            className: "w-full"
          }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <span className="text-4xl">💬</span>
            <p className="text-sm text-muted-foreground text-center">
              Register interest for ProfessorWillow community server
            </p>
          </div>
        </DashboardCard>

        <DashboardCard
          title="IV Calculator"
          description="Plan your ascension materials"
        >
          <div className="flex items-center justify-center h-24 bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-lg">
            <span className="text-3xl">🧮</span>
          </div>
        </DashboardCard>
      </div>
    </main>
  );
}