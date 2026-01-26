import { CurrentEventsCarousel } from "@/components/ClientComponents/EventCarousel";
import { DashboardCard } from "@/components/CustomCards/DashboardCard";
import UpcomingEventsDashboard from "@/components/EventsGroup/UpcomingEventsDash";
import PageContainer from "@/components/PageContainer";
import { BoostedShinies } from "@/components/PokemonGroup/BoostedShinies";
import RaidsDash from "@/components/RaidsGroup/RaidsDash";
import { Button } from "@/components/shadcn/button";
import { getEvents } from "@/utils/getEvents";
import { CalendarDays } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ProfessorWillow | Dashboard",
  description:
    "professorwillow.me - Dashboard for everything Pokemon GO, events, shiny pokemon, community, and more!",
  keywords: [
    "pokemon go",
    "pokemon go events",
    "current events",
    "event calendar",
    "professor willow",
    "shiny pokemon",
    "gbl builds",
    "iv calculator",
    "boosted shiny pokemon go",
  ],
  openGraph: {
    url: "https://professorwillow.me/",
    type: "website",
    title: "ProfessorWillow | Dashboard",
    description:
      "professorwillow.me - Dashboard for everything Pokemon GO, events, shiny pokemon, community, and more!",
    images: [
      {
        url: "https://professorwillow.me/branding/card.png", //ABSOLUTE PATH
        width: 1200,
        height: 630,
        alt: "professorwillow.me",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ProfessorWillow | Pokemon GO Companion",
    description:
      "professorwillow.me - Dashboard for everything Pokemon GO, events, shiny pokemon, community, and more!",
    images: [
      {
        url: "https://professorwillow.me/branding/card.png",
        width: 1200,
        height: 630,
        alt: "professorwillow.me",
      },
    ],
  },
};

export default async function DashboardPage() {
  const { liveEvents } = await getEvents();
  return (
    <PageContainer>
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
          button={{
            text: "View all upcoming",
            href: "/events/upcoming",
            icon: CalendarDays,
          }}
          className="md:col-span-2 lg:col-span-1"
        >
          <UpcomingEventsDashboard />
        </DashboardCard>

        {/* Welcome */}
        <DashboardCard
          title="Welcome to ProfessorWillow"
          description="ProfessorWillow will become your best Pokemon GO companion, helping you plan for upcoming events, and finding out the information you want at a glance!"
          className="row-span-1"
        >
          <div className="flex items-center justify-center h-full bg-linear-to-br from-primary/65 to-accent/65 rounded-lg">
            <Image
              src="/ProfessorWillowHS.png"
              alt="ProfessorWillow"
              width={100}
              height={100}
              className="p-2"
            />
          </div>
        </DashboardCard>

        {/* Boosted Shiny Spawns */}
        <DashboardCard title="Boosted Shinies">
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

        {/* Raids */}
        <DashboardCard
          title="Current Raid Bosses"
          className="row-span-3"
          action={
            <Link href={"/raids"}>
              <Button variant="ghost" size="sm" aria-label="More Raid Details">
                More Details
              </Button>
            </Link>
          }
        >
          <RaidsDash />
        </DashboardCard>

        {/* Discord */}
        <DashboardCard
          title="Discord"
          button={{
            text: "Join professorwillow.me",
            href: "https://discord.gg/dvHNCQ8byh",
            className: "w-full",
            target: "_blank",
          }}
          className="xl:col-span-1 2xl:col-span-2"
        >
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <span className="text-4xl">💬</span>
            <p className="text-sm text-muted-foreground text-center">
              Join the ProfessorWillow community server and meet likeminded
              researchers!
            </p>
          </div>
        </DashboardCard>

        {/* GBL Builds */}
        {/* <DashboardCard
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
        </DashboardCard> */}

        {/* Dev Notes */}
        <DashboardCard
          title="Dev Log"
          description="Thank you so much for using ProfesorWillow!!"
           action={
            <Link href={"https://github.com/JoshHofer01/professor-willow/commits/main/"}>
              <Button variant="ghost" size="sm">
                Full Log
              </Button>
            </Link>
          }
        >
          <div className="flex flex-col text-xs gap-1">
            <div className="inline-flex gap-2">
              <p>- Improved Raid Boss widget</p>
              <p className="text-muted-foreground">22nd Jan</p>
            </div>
            <div className="inline-flex gap-2">
              <p>
                - Added{" "}
                <Link
                  href="/raids"
                  className="text-blue-300 hover:underline hover:underline-offset-2"
                >
                  Raids
                </Link>{" "}
                and{" "}
                <Link
                  href="/battles"
                  className="text-blue-300 hover:underline hover:underline-offset-2"
                >
                  Max Battles{" "}
                </Link>
                pages.
              </p>
              <p className="text-muted-foreground">22nd Jan</p>
            </div>
            <div className="inline-flex gap-2">
              <p>
                - Boosted Shinies now display according to your local time.
                Raids & Battles include shiny/shadow icons
              </p>
              <p className="text-muted-foreground">20th Jan</p>
            </div>
            <div className="inline-flex gap-2">
              <p>- Added Raid & Battles dashboard widget</p>
              <p className="text-muted-foreground">18th Jan</p>
            </div>
            {/* <div className="inline-flex gap-2">
              <p>
                - Upgraded{" "}
                <Link
                  href="pokemon"
                  className="text-blue-300 hover:underline hover:underline-offset-2"
                >
                  pokedex
                </Link>{" "}
                display to include Elite moves & Gigantamax/Mega forms{" "}
                <Link
                  href="pokemon/venusaur"
                  className="text-blue-300 hover:underline hover:underline-offset-2"
                >
                  (Venusaur Example)
                </Link>
              </p>
              <p className="text-muted-foreground">17th Jan</p>
            </div> */}
          </div>
        </DashboardCard>
      </div>
    </PageContainer>
  );
}
