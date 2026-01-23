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
import BossCard from "./BossCard";

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
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
      {raids.length > 0 ? (
        raids.map((raid) => (
          <BossCard
            key={raid.names.English}
            raidBoss={raid}
            weather={raid.weather}
          />
        ))
      ) : (
        <div>No current raids in this tier</div>
      )}
    </div>
  );
};

export const RaidBossImages = ({ imageCount }: { imageCount: string }) => {
  const imageCountNumber = parseInt(imageCount);
  return (
    <div className="inline-flex justify-center mt-1">
      {Array.from({ length: imageCountNumber }, (_, i) => (
        <Image
          key={i}
          src="/RaidBoss.png"
          alt="RaidBoss"
          width={20}
          height={20}
          className="object-scale-down w-5 h-5"
        />
      ))}
    </div>
  );
};

const RaidsDash = async () => {
  const raidResult = await getRaids();

  if (!raidResult) return null;

  const { tier5 = [], tier3 = [], tier1 = [], mega = [] } = raidResult;
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <ContentSection
        title={
          <div className="flex flex-1 justify-between">
            <p>Tier 5</p>
            <RaidBossImages imageCount="5" />
          </div>
        }
        itemNumber="item-1"
      >
        <RaidInfo raids={tier5} />
      </ContentSection>

      <ContentSection
        title={
          <div className="flex flex-1 justify-between">
            <p>Mega</p>
            <RaidBossImages imageCount="4" />
          </div>
        }
        itemNumber="item-2"
      >
        <RaidInfo raids={mega} />
      </ContentSection>

      <ContentSection
        title={
          <div className="flex flex-1 justify-between">
            <p>Tier 3</p>
            <RaidBossImages imageCount="3" />
          </div>
        }
        itemNumber="item-3"
      >
        <RaidInfo raids={tier3} />
      </ContentSection>

      <ContentSection
       title={
          <div className="flex flex-1 justify-between">
            <p>Tier 1</p>
            <RaidBossImages imageCount="1" />
          </div>
        }
        itemNumber="item-4"
      >
        <RaidInfo raids={tier1} />
      </ContentSection>
    </Accordion>
  );
};

export default RaidsDash;
