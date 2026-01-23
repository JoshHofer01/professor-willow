import React from "react";

const PageContainer = ({
  children,
  title,
  description,
}: {
  children?: React.ReactNode;
  title?: string;
  description?: string;
}) => {
  return (
    <main className="container max-w-full p-4 md:p-6 lg:p-8">
      {title && (
        <div className="mb-5">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          {description && (
            <p className="text-lg text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      {children}
    </main>
  );
};

export default PageContainer;
