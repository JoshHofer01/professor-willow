"use client";

import ErrorPage from "@/components/ErrorPage";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/shadcn/button";
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

// Route-level error boundary: renders inside the root layout, so the
// navigation stays available. app/global-error.tsx only handles layout errors.
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <PageContainer title="Something went wrong">
      <div className="flex flex-col items-start gap-4">
        <ErrorPage />
        <Button onClick={reset}>Try again</Button>
      </div>
    </PageContainer>
  );
}
