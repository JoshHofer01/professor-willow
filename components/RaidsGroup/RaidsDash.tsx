import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/accordion";
import { getRaids } from "@/utils/getRaids";
import { RaidPokemon } from "@/interfaces/interfaces";
import Image from "next/image";
import { weServTransformURL } from "@/utils/weServTransform";
import { PokemonTypeBadge } from "../PokemonGroup/PokemonIdDisplays";

const ContentSection = ({
  title,
  children,
  itemNumber,
}: {
  title: React.ReactElement;
  children?: React.ReactNode;
  itemNumber: string;
}) => {
  return (
    <AccordionItem value={itemNumber}>
      <AccordionTrigger className="text-xl font-semibold text-foreground">
        {title}
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
};

const RaidInfo = ({ raids }: { raids: RaidPokemon[] }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {raids.map((raid) => (
        <div
          key={raid.id}
          className="flex flex-col items-center rounded-xl shadow-md p-3 w-full"
        >
          {raid.shiny && (
            <Image
              src="/ShinySparkles.png"
              width={18}
              height={18}
              alt="shiny image"
              className="relative left-8 top-2"
            />
          )}
          {/* Image */}
          <div className="relative w-20 h-20">
            <Image
              src={weServTransformURL(raid.assets.image, "pokedexImage")}
              alt={raid.names.English}
              fill
              className="object-contain"
              priority
            />
          </div>

          <hr className="gap-y-2" />

          {/* Name */}
          <div className="mt-2 text-center text-sm font-semibold">
            {raid.names.English}
          </div>

          {/* Types */}
          <div className="flex flex-row sm:flex-col gap-1 mt-1 justify-center items-center">
            {raid.types.map((type) => (
              <div key={type}>
                <PokemonTypeBadge type={type} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const RaidBossImage = ({ imageCount }: { imageCount: number }) => {
  return (
    <div className="flex flex-1 justify-between">
      <p>{imageCount === 4 ? "Mega" : `Tier ${imageCount}`}</p>
      <div className="inline-flex">
        {Array.from({ length: imageCount }, (_, i) => (
          <Image
            key={i}
            src="/RaidBoss.png"
            alt="RaidBoss"
            width={20}
            height={20}
            className="object-scale-down"
          />
        ))}
      </div>
    </div>
  );
};

//TODO: Differentiate shadow raids
const RaidsDash = async () => {
  const raidResult = await getRaids();

  if (!raidResult) return null;

  const { tier5, tier3, tier1, mega } = raidResult;
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <ContentSection
        title={<RaidBossImage imageCount={5} />}
        itemNumber="item-1"
      >
        <RaidInfo raids={tier5} />
      </ContentSection>

      <ContentSection
        title={<RaidBossImage imageCount={4} />}
        itemNumber="item-2"
      >
        <RaidInfo raids={mega} />
      </ContentSection>

      <ContentSection
        title={<RaidBossImage imageCount={3} />}
        itemNumber="item-3"
      >
        <RaidInfo raids={tier3} />
      </ContentSection>

      <ContentSection
        title={<RaidBossImage imageCount={1} />}
        itemNumber="item-4"
      >
        <RaidInfo raids={tier1} />
      </ContentSection>
    </Accordion>
  );
};

export default RaidsDash;
