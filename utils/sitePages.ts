import { Calendar, ClockCheck, Inbox, LucideIcon, Swords } from "lucide-react";

interface PageProps {
  title: string;
  href: string;
  icon: LucideIcon;
  hasMenu: boolean;
  components?: {
    title: string;
    href: string;
    description: string;
  }[];
  hidesAt: string;
  showsOnSidebar: boolean;
  showsAtMin: boolean;
}

export const pages: PageProps[] = [
  {
    title: "Events",
    href: "/events",
    icon: Calendar,
    hasMenu: true,
    components: [
      {
        title: "Overview",
        href: "/events",
        description:
          "Overview of live, upcoming, and completed events currently in LeekDuck database",
      },
      {
        title: "Live Events",
        href: "/events/live",
        description: "",
      },
      {
        title: "Upcoming Events",
        href: "/events/upcoming",
        description: "",
      },
      {
        title: "Completed Events",
        href: "/events/completed",
        description: "",
      },
    ],
    hidesAt: "",
    showsOnSidebar: true,
    showsAtMin: true,
  },
  {
    title: "Raids",
    href: "/raids",
    icon: Swords,
    hasMenu: true,
    components: [
      {
        title: "Raid Bosses",
        href: "/raids",
        description:
          "Check important information about the current Raid Boss rotation",
      },
      {
        title: "Max Battles",
        href: "/battles",
        description: "View all Max Battle Pokemon currently in rotation",
      },
    ],
    hidesAt: "",
    showsOnSidebar: true,
    showsAtMin: true,
  },
  {
    title: "Pokedex",
    href: "/pokemon?gen=1",
    icon: Inbox,
    hasMenu: false,
    hidesAt: "hidden sm:block",
    showsOnSidebar: true,
    showsAtMin: false,
  },
  {
    title: "Research",
    href: "/research",
    icon: ClockCheck,
    hasMenu: false,
    hidesAt: "hidden sm:block",
    showsOnSidebar: true,
    showsAtMin: false
  },
  {
    title: "More",
    href: "/",
    icon: Calendar,
    hasMenu: true,
    components: [
      {
        title: "Pokedex",
        href: "/pokemon?gen=1",
        description:
          "View a list of all 1,025 Pokemon that includes variants, species differences, and special forms",
      },
      {
        title: "Research Rewards",
        href: "/research",
        description:
          "See all current research tasks with Pokemon as the reward",
      },
    ],
    hidesAt: "block sm:hidden",
    showsOnSidebar: false,
    showsAtMin: true
  }
];
