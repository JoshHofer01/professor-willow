import { getResearch } from "@/utils/getResearch";
import React from "react";
import { Card } from "../shadcn/card";
import ResearchPokemonGrid from "./ResearchPokemonGrid";

const ResearchDisplay = async () => {
  const researchResult = await getResearch();

  if (!researchResult) {
    return null;
  }

  const { research } = researchResult;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-350 mx-auto">
      {research.map((task) => (
        <Card key={task.text} className="rounded-lg p-2">
          <p className="text-xl font-semibold mb-4">{task.text}</p>
          <ResearchPokemonGrid rewards={task.rewards} />
        </Card>
      ))}
    </div>
  );
};

export default ResearchDisplay;
