import PageContainer from "@/components/PageContainer";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Settings | ProfessorWillow",
  description: "professorwillow.me - Manage your settings",
  openGraph: {
    url: "https://professorwillow.me/settings",
    type: "website",
    title: "Settings | ProfessorWillow",
  },
};

const Settings = () => {
  return (
    <PageContainer title="Settings" description="Edit page settings" />
  );
};

export default Settings;