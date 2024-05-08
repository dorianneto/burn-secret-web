import { CopyIcon, UnlockIcon } from "@chakra-ui/icons";
import { Button, Card, CardBody, useToast } from "@chakra-ui/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { useState } from "react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const rawResponse = await fetch(`http://nginx/api/v1/secret/${params.id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const content = await rawResponse.json();

  await fetch(`http://nginx/api/v1/secret/${params.id}/burn`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return json({ content });
};

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <Card variant="elevated">
      <CardBody>
        <p className="text-xl my-8">
          {isRouteErrorResponse(error)
            ? `${error.status} ${error.statusText}`
            : error instanceof Error
            ? error.message
            : "Unknown Error"}
        </p>
      </CardBody>
    </Card>
  );
}

export default function SecretNew() {
  const [isRevealed, setIsRevealed] = useState(false);
  const { content } = useLoaderData<typeof loader>();
  const { data } = content;
  const toast = useToast();

  if (data === null) {
    throw new Response(null, {
      status: 404,
      statusText: "Secret not found",
    });
  }

  return (
    <Card variant="elevated">
      <CardBody>
        {isRevealed === false && (
          <>
            <p className="text-xl my-8">
              Be aware! The following secret can only be revealed one time.
            </p>
            <Button
              leftIcon={<UnlockIcon />}
              colorScheme="orange"
              onClick={() => {
                setIsRevealed(true);
                toast({
                  title: "Secret revealed!",
                  status: "success",
                  duration: 4000,
                  isClosable: true,
                });
              }}
            >
              Reveal secret
            </Button>
          </>
        )}
        {isRevealed === true && (
          <>
            <p id="secret-content" className="text-xl my-8">
              {data.secret}
            </p>
            <Button
              leftIcon={<CopyIcon />}
              colorScheme="orange"
              onClick={() => {
                const secretContent = document.getElementById("secret-content");
                navigator.clipboard.writeText(secretContent?.textContent || "");
                toast({
                  title: "Secret copied!",
                  status: "success",
                  duration: 6000,
                  isClosable: true,
                });
              }}
            >
              Copy secret
            </Button>
          </>
        )}
      </CardBody>
    </Card>
  );
}
