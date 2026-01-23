import React from "react";
import { getRaids } from "@/utils/getRaids";
import { MapRaidLists } from "./MapRaidsBattles";
const RaidsDisplay = async () => {
  const raids = await getRaids();

  if (!raids) return null;

  const { tier5 = [], tier3 = [], tier1 = [], mega = [] } = raids;

  const raidTiers = [
    { tier: "5", items: tier5 },
    { tier: "4", items: mega },
    { tier: "3", items: tier3 },
    { tier: "1", items: tier1 },
  ];

  return (
      <MapRaidLists tiers={raidTiers}/>
  );
};

export default RaidsDisplay;
