import React from "react";
import BossCard from "./BossCard";
import { BattlePokemon, RaidPokemon } from "@/interfaces/interfaces";
import PokemonPopout from "../PokemonGroup/PokemonPopout";
import { Button } from "../shadcn/button";
import CountersDropdown from "./CountersDropdown";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../shadcn/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { RaidBossImages } from "./RaidsDash";

interface RaidProps {
  tier: string;
  items: RaidPokemon[];
}

interface BattleProps {
  tier: string;
  items: BattlePokemon[];
}

const TierDisplay = ({ tier }: { tier: string }) => {
  return (
    <div className="flex justify-between items-center w-full mb-4 rounded-lg p-2 border-b-8 border-r-6 hover:border-muted-foreground hover:bg-linear-to-tr to-accent/75 from-primary/75 hover:cursor-pointer">
      <h2 className="text-3xl font-bold">{`Tier ${tier}`}</h2>
      <div className="inline-flex gap-2">
        <RaidBossImages imageCount={tier} />
        <ChevronsUpDown className="ml-auto" />
      </div>
    </div>
  );
};

export const MapRaidLists = ({ tiers }: { tiers: RaidProps[] }) => {
  return (
    <div className="flex flex-col gap-6">
      {tiers.map(
        (tier) =>
          tier.items.length > 0 && (
            <Collapsible key={`Tier ${tier.tier}`} defaultOpen>
              <CollapsibleTrigger asChild>
                <TierDisplay tier={tier.tier} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {tier.items.map((raidBoss) => (
                    <BossCard
                      key={raidBoss.names.English}
                      raidBoss={raidBoss}
                      weather={raidBoss.weather}
                    >
                      <>
                        {/* Button Group */}
                        <div className="flex flex-wrap justify-center gap-2 my-2">
                          {/* Shiny Image (Click to open) */}
                          {raidBoss.shiny && (
                            <PokemonPopout
                              pokemonName={`Shiny ${raidBoss.names.English}`}
                              shinyImage={raidBoss.assets.shinyImage}
                            >
                              <Button variant="outline" size="sm">
                                Shiny
                              </Button>
                            </PokemonPopout>
                          )}
                          {/* Best Counters (Dropdown) */}
                          <CountersDropdown counters={raidBoss.counter} />
                        </div>

                        {/* CP Range */}
                        <div className="text-center text-muted-foreground">
                          <p className="font-bold text-sm">100% CP</p>
                          <hr />
                          <div className="flex flex-col gap-1 text-xs">
                            <p>Regular • {raidBoss.cpRange[1]}</p>
                            <p>WB • {raidBoss.cpRangeBoost[1]}</p>
                          </div>
                        </div>

                        <hr />

                        {/* Top Counters - RaidPokemon */}
                      </>
                    </BossCard>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ),
      )}
    </div>
  );
};

export const MapBattleLists = ({ tiers }: { tiers: BattleProps[] }) => {
  return (
    <div className="flex flex-col gap-8">
      {tiers.map(
        (tier) =>
          tier.items.length > 0 && (
            <Collapsible key={`Tier ${tier.tier}`} defaultOpen>
              <CollapsibleTrigger asChild>
                <TierDisplay tier={tier.tier} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {tier.items.map((battleBoss) => (
                    <BossCard
                      key={battleBoss.names.English}
                      raidBoss={battleBoss}
                    >
                      <>
                        {/* Shiny Image (Click to open) */}
                        {battleBoss.shiny && (
                          <PokemonPopout
                            pokemonName={`Shiny ${battleBoss.names.English}`}
                            shinyImage={battleBoss.assets.shinyImage}
                          >
                            <div className="text-primary underline-offset-4 hover:underline text-sm font-semibold mt-2">
                              View Shiny
                            </div>
                          </PokemonPopout>
                        )}

                        {/* CP Range */}
                        <div className="inline-flex gap-1 text-muted-foreground mt-1">
                          <p className="text-md font-bold">100% CP</p>
                          <p>•</p>
                          <p>{battleBoss.cpRange[1]}</p>
                        </div>
                      </>
                    </BossCard>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ),
      )}
    </div>
  );
};
