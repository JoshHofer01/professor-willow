"use client";

import React from "react";
/* import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";
import { useIsMobile } from "@/hooks/use-mobile"; */

//* Page can use 'useIsMobile' hook to dynamically render the Tooltip with second line of text
// To switch, uncomment imports, isMobile declaration, and labelled component section
// Ensure only 1 labelled component section is active

const LastPageUpdate = () => {
  /* const isMobile = useIsMobile(); */

  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString("en-US", { month: "long" });
  const ordinalSuffix = (n: number) => {
    const j = n % 10,
      k = n % 100;
    if (j === 1 && k !== 11) return "st";
    if (j === 2 && k !== 12) return "nd";
    if (j === 3 && k !== 13) return "rd";
    return "th";
  };
  const formattedDate = `${day}${ordinalSuffix(day)} ${month}`;
  return (
    <div className="text-center">
      {/* Using useIsMobile hook */}
      {/* {!isMobile ? (
        <Tooltip>
          <TooltipTrigger>
            <span className="text-xs mx-auto text-muted-foreground">
              Last updated on {formattedDate}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            If this date is incorrect, please refresh the page to force an
            update
          </TooltipContent>
        </Tooltip>
      ) : (
        <div className="flex flex-col mt-4 text-xs mx-auto text-muted-foreground">
          <span>
            Last updated on {formattedDate}
          </span>
          <span>
            If this date is incorrect, please refresh the page to force an
            update
          </span>
        </div>
      )} */}

      {/* Not using useIsMobile hook */}
      <div className="flex flex-col mt-4 text-xs mx-auto text-muted-foreground">
        <span>Last updated on {formattedDate}</span>
        <span>
          If this date is incorrect, please refresh the page to force an update
        </span>
      </div>
    </div>
  );
};

export default LastPageUpdate;
