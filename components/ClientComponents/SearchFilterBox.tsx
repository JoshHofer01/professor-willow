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
import { Input } from "../shadcn/input";

const types = [
  { value: "Normal", label: "Normal" },
  { value: "Fire", label: "Fire" },
  { value: "Water", label: "Water" },
  { value: "Grass", label: "Grass" },
  { value: "Electric", label: "Electric" },
  { value: "Ice", label: "Ice" },
  { value: "Fighting", label: "Fighting" },
  { value: "Poison", label: "Poison" },
  { value: "Ground", label: "Ground" },
  { value: "Flying", label: "Flying" },
  { value: "Psychic", label: "Psychic" },
  { value: "Bug", label: "Bug" },
  { value: "Rock", label: "Rock" },
  { value: "Ghost", label: "Ghost" },
  { value: "Dragon", label: "Dragon" },
  { value: "Dark", label: "Dark" },
  { value: "Steel", label: "Steel" },
  { value: "Fairy", label: "Fairy" },
];

const generations = [
  { value: "all", label: "All Generations" },
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
  initialValue,
}: {
  dataType: dataTypeProps;
  setFilter: (val: string) => void;
  initialValue: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(initialValue);
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

export function SearchBox({
  setQuery,
  initialValue,
  className
}: {
  setQuery: (val: string) => void;
  initialValue: string;
  className?: string
}) {
  return (
    <Input
      onChange={(currentValue) => {
        setQuery(currentValue.target.value);
      }}
      type="search"
      placeholder="Search Pokedex..."
      defaultValue={initialValue}
      className={className}
    />
  );
}
