import React from "react";

export const ContentSection = (
  {title, children}: {title: string, children?: React.ReactNode}
) => {
  return (
    <section className="mb-6">
      <h2 className="text-2xl font-semibold mb-3 text-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
};

const Settings = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="text-muted-foreground p-8 rounded-lg shadow-md max-w-4xl mx-auto my-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-foreground">
          Legal Information
        </h1>

        <ContentSection title="Diclaimer">
          <p className="mb-4">
            This project is a non-commercial, educational, and fan-made
            creation. It is not affiliated with, endorsed by, or connected to
            Nintendo, The Pokémon Company, Niantic, or any of their affiliates
            or partners.
          </p>
          <p>
            All assets, including images, names, and data related to Pokémon,
            are the property of their respective owners. The use of these assets
            in this project is for informational and educational purposes only,
            under the principles of Fair Use.
          </p>
        </ContentSection>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Fair Use Notice</h2>
          <p className="mb-4">
            This project may contain copyrighted material the use of which has
            not always been specifically authorized by the copyright owner. We
            are making such material available in our efforts to advance
            understanding of various concepts related to the Pokémon franchise.
            We believe this constitutes a fair use of any such copyrighted
            material as provided for in section 107 of the US Copyright Law.
          </p>
          <p>
            In accordance with Title 17 U.S.C. Section 107, the material on this
            site is distributed without profit to those who have expressed a
            prior interest in receiving the included information for research
            and educational purposes.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">No Warranty</h2>
          <p>
            This project is provided as is without warranty of any kind,
            express or implied. The creators of this project make no
            representations or warranties in relation to this website or the
            information and materials provided.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">API Information</h2>
          <p className="mb-4">
            This project utilizes the{" "}
            <a
              href="https://scrapeduck.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              ScrapedDuck API
            </a>{" "}
            for event information. The ScrapedDuck API regularly scrapes data
            from LeekDuck with permission.
          </p>
          <p>
            Pokedex and Pokémon information are sourced from the{" "}
            <a
              href="https://pokemon-go-api.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Pokémon Go API
            </a>{" "}
            (pokemon-go-api.github.io).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact</h2>
          <p>
            If you have any questions or concerns about the content on this
            site, or if you are a copyright holder and believe your material has
            been used inappropriately, please contact us.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Settings;
