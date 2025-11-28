import { Calculator, Calendar, Inbox, Settings } from "lucide-react";

export const pages = [
  {
    title: "Events",
    href: "/events",
    icon: Calendar,
    hasMenu: true,
    components: [
      {
        title: "Calendar",
        href: "/events",
        description:
          "Overview of live, upcoming, and completed events currently in {GO} database",
      },
      {
        title: "Live Events",
        href: "/events/live",
        description:
          "",
      },
      {
        title: "Upcoming Events",
        href: "/events/upcoming",
        description:
          "",
      },
      {
        title: "Completed Events",
        href: "/events/completed",
        description:
          "",
      },
    ],
  },
  {
    title: "More",
    href: "/",
    icon: Calendar,
    hasMenu: true,
    components: [
      {
        title: "Pokedex",
        href: "/pokemon",
        description:
          "",
      },
      {
        title: "IV Calculator",
        href: "/",
        description:
          "",
      },
      {
        title: "Settings",
        href: "/settings",
        description:
          "",
      },
    ],
    hidesAt: "block sm:hidden",
  },
  {
    title: "Pokedex",
    href: "/pokemon",
    icon: Inbox,
    hidesAt: "hidden sm:block",
  },
  {
    title: "IV Calculator",
    href: "/",
    icon: Calculator,
    hidesAt: "hidden sm:block",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    hidesAt: "hidden sm:block",
  },
];
