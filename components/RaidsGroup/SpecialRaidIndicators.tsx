import Image from "next/image";
import React from "react";

const SpecialRaidIndicators = ({
  isShadow,
  isShiny,
}: {
  isShadow: boolean;
  isShiny: boolean;
}) => {
  return (
    <>
      <div className="absolute top-2 right-2 flex gap-1 z-10 bg-background/20 rounded-sm mt-1 p-1">
        {isShadow && (
          <Image
            src="/Shadow.png"
            width={18}
            height={18}
            alt="Shadow Raid"
            title="Shadow Raid"
            className="object-contain"
          />
        )}
        {isShiny && (
          <Image
            src="/GoldSparkles.png"
            width={18}
            height={18}
            alt="Possible Shiny"
            title="Possible Shiny from Raid"
            className="object-contain"
          />
        )}
      </div>
    </>
  );
};

export default SpecialRaidIndicators;
