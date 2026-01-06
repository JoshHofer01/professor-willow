import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/accordion";

export const ContentSection = ({
  title,
  children,
  itemNumber,
}: {
  title: string;
  children?: React.ReactNode;
  itemNumber: string;
}) => {
  return (
    <AccordionItem value={itemNumber}>
      <AccordionTrigger className="text-2xl font-semibold text-foreground">
        {title}
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
};

const Legal = () => {
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="text-muted-foreground p-8 rounded-lg shadow-md max-w-4xl mx-auto my-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-foreground">
            Legal Information
          </h1>

          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <ContentSection title="Disclaimer" itemNumber="item-1">
              <p className="mb-4">
                This project is a non-commercial, educational, and fan-made
                creation. It is not affiliated with, endorsed by, or connected
                to Nintendo, The Pokémon Company, Scopely, or any of their
                affiliates or partners.
              </p>
              <p>
                All assets, including images, names, and data related to
                Pokémon, are the property of their respective owners. The use of
                these assets in this project is for informational and
                educational purposes only, under the principles of Fair Use.
              </p>
            </ContentSection>

            <ContentSection title="Fair Use Notice" itemNumber="item-2">
              <p>
                This project may contain copyrighted material the use of which
                has not always been specifically authorized by the copyright
                owner.
              </p>
              <p>
                We believe professorwillow.me constitutes a fair use of any such
                copyrighted material due to he material on this site being
                distributed without profit to those who have expressed a prior
                interest in receiving the included information for research and
                educational purposes.
              </p>
            </ContentSection>

            <ContentSection title="API Information" itemNumber="item-3">
              <p className="mb-4">
                This project utilizes the{" "}
                <a
                  href="https://github.com/bigfoott/ScrapedDuck/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  ScrapedDuck API
                </a>{" "}
                for event information. The ScrapedDuck API regularly scrapes
                data from LeekDuck with permission.
              </p>
              <p>
                Pokedex and Pokémon information are sourced from the{" "}
                <a
                  href="https://github.com/pokemon-go-api/pokemon-go-api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Pokémon Go API
                </a>{" "}
              </p>
            </ContentSection>

            <ContentSection title="Copyright" itemNumber="item-4">
              <p>
                If you have any questions or concerns about the content on this
                site, or if you are a copyright holder and believe your material
                has been used inappropriately, please contact us.
              </p>
            </ContentSection>

            <ContentSection
              title="External Links Disclaimer"
              itemNumber="item-5"
            >
              <p>
                professorwillow.me may contain links to other websites or
                content belonging to, or originating from, third parties. uch
                external links are not investigated, monitored, or checked for
                accuracy, adequacy, validity, reliability, availability, or
                completeness by us.
              </p>
              <p>
                We do not warrant, endorse, guarantee, or assume responsibility
                for the accuracy or reliability of any information offered by
                third-party websites linked through the Site or any website or
                feature linked in any banner or other advertising. We will not
                be a party to or in any way be responsible for monitoring any
                transaction between you and third-party providers of products or
                services.
              </p>
            </ContentSection>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default Legal;
