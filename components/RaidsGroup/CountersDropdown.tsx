"use client";

import React, { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { Button } from "../shadcn/button";
import { PokemonTypeBadge } from "../PokemonGroup/PokemonIdDisplays";

const CountersDropdown = ({
  counters,
}: {
  counters: Record<string, number>;
}) => {
  const { bestCounters, goodCounters } = useMemo(() => {
    const best: string[] = [];
    const good: string[] = [];

    for (const [key, value] of Object.entries(counters)) {
      if (value >= 2.56) best.push(key);
      else if (value >= 1.6) good.push(key);
    }

    return { bestCounters: best, goodCounters: good };
  }, [counters]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Counters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {bestCounters.length > 0 && (
          <>
            <DropdownMenuGroup className="pb-2">
              <DropdownMenuLabel>Best Counters - 2.56x</DropdownMenuLabel>{" "}
              <div className="flex flex-wrap gap-2 mx-2">
                {bestCounters.map((counter) => (
                  <PokemonTypeBadge key={counter} type={counter} />
                ))}{" "}
              </div>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}

        {goodCounters.length > 0 && (
          <>
            <DropdownMenuGroup className="pb-2">
              <DropdownMenuLabel>Good Counters - 1.6x</DropdownMenuLabel>
              <div className="flex flex-wrap gap-2 mx-2">
                {goodCounters.map((counter) => (
                  <PokemonTypeBadge key={counter} type={counter} />
                ))}{" "}
              </div>
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CountersDropdown;
