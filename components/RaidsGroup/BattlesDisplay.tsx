import React from 'react';
import { getMaxBattles } from '@/utils/getRaids';
import { MapBattleLists } from './MapRaidsBattles';

const BattlesDisplay = async () => {

  const battles = await getMaxBattles();
  if (!battles) {
    return null;
  }

  const { tier1, tier2, tier3, tier4, tier5, tier6 } = battles;

  const maxBattleTiers = [
    { tier: '6', items: tier6 },
    { tier: '5', items: tier5 },
    { tier: '4', items: tier4 },
    { tier: '3', items: tier3 },
    { tier: '2', items: tier2 },
    { tier: '1', items: tier1 },
  ];

  return (
      <MapBattleLists tiers={maxBattleTiers} />
  );
};

export default BattlesDisplay;