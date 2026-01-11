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
    <main className="container max-w-full p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-lg text-muted-foreground">Edit page settings</p>
      </div>
    </main>
  );
};

export default Settings;