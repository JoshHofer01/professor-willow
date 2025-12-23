import React from "react";

const ErrorPage = ({ message }: { message?: string }) => {
  return (
    <>
      {message ? (
        <div>ErrorPage {message}</div>
      ) : (
        <div>
          <span>
            Something went wrong, but don&apos;t worry! Sentry has logged your
            issue and our developers will get round to fixing it as soon as we
            are notified!
          </span>
          <span>
            If this issue has persisted for longer than you think is alright,
            please contact our developers on Github or Discord
          </span>
        </div>
      )}
    </>
  );
};

export default ErrorPage;
