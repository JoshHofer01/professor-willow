"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcn/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcn/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";

const types = [
  { value: "POKEMON_TYPE_NORMAL", label: "Normal" },
  { value: "POKEMON_TYPE_FIRE", label: "Fire" },
  { value: "POKEMON_TYPE_WATER", label: "Water" },
  { value: "POKEMON_TYPE_GRASS", label: "Grass" },
  { value: "POKEMON_TYPE_ELECTRIC", label: "Electric" },
  { value: "POKEMON_TYPE_ICE", label: "Ice" },
  { value: "POKEMON_TYPE_FIGHTING", label: "Fighting" },
  { value: "POKEMON_TYPE_POISON", label: "Poison" },
  { value: "POKEMON_TYPE_GROUND", label: "Ground" },
  { value: "POKEMON_TYPE_FLYING", label: "Flying" },
  { value: "POKEMON_TYPE_PSYCHIC", label: "Psychic" },
  { value: "POKEMON_TYPE_BUG", label: "Bug" },
  { value: "POKEMON_TYPE_ROCK", label: "Rock" },
  { value: "POKEMON_TYPE_GHOST", label: "Ghost" },
  { value: "POKEMON_TYPE_DRAGON", label: "Dragon" },
  { value: "POKEMON_TYPE_DARK", label: "Dark" },
  { value: "POKEMON_TYPE_STEEL", label: "Steel" },
  { value: "POKEMON_TYPE_FAIRY", label: "Fairy" },
];

const generations = [
  { value: "0", label: "All Generations"},
  { value: "1", label: "Kanto (Gen I)" },
  { value: "2", label: "Johto (Gen II)" },
  { value: "3", label: "Hoenn (Gen III)" },
  { value: "4", label: "Sinnoh (Gen IV)" },
  { value: "5", label: "Unova (Gen V)" },
  { value: "6", label: "Kalos (Gen VI)" },
  { value: "7", label: "Alola (Gen VII)" },
  { value: "8", label: "Galar (Gen VIII)" },
  { value: "9", label: "Paldea (Gen IX)" },
];

type dataTypeProps = "generation" | "type";

const dataTypeMap: Record<dataTypeProps, { value: string; label: string }[]> = {
  generation: generations,
  type: types,
};

export function FilterBox({
  dataType,
  setFilter,
}: {
  dataType: dataTypeProps;
  setFilter: (val: string) => void
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(dataType === "generation" ? "1" : "");
  const searchData = dataTypeMap[dataType];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-50 justify-between"
        >
          {value
            ? searchData.find((element) => element.value === value)?.label
            : `Select ${dataType}...`}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-50 p-0">
        <Command>
          <CommandInput placeholder={`Search ${dataType}...`} className="h-9" />
          <CommandList>
            <CommandEmpty>No {dataType} found.</CommandEmpty>
            <CommandGroup>
              {searchData.map((element) => (
                /* Uses label as value instead of value */
                /* Value should be used as argument to function call */
                <CommandItem
                  key={element.value}
                  value={element.value.toString()}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    setValue(newValue);
                    setFilter(newValue);
                    setOpen(false);
                  }}
                >
                  {element.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === element.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
