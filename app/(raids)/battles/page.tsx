import PageContainer from "@/components/PageContainer";
import BattlesDisplay from "@/components/RaidsGroup/BattlesDisplay";
import React from "react";

const MaxBattles = async () => {
  return (
    <PageContainer title="Current Max Battle Rotation">
      <BattlesDisplay />
    </PageContainer>
  );
};

export default MaxBattles;
