import { CopyIcon } from "@chakra-ui/icons";
import { Button, Card, CardBody, Tooltip, useToast } from "@chakra-ui/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useLocation } from "@remix-run/react";
import { commitSession, getSession } from "~/sessions";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const secretKey = session.get("secretKey") || null;

  return json(
    { secretKey },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};

export default function SecretNew() {
  const { secretKey } = useLoaderData<typeof loader>();
  const location = useLocation();
  const toast = useToast();

  return (
    <Card variant="elevated">
      <CardBody>
        <Tooltip
          label="Reminder: this link will be burned within 12 hours"
          placement="top"
        >
          <p id="secret-link" className="text-xl my-8">
            {`http://localhost:3000/s/${secretKey}`}
          </p>
        </Tooltip>
        <Button
          leftIcon={<CopyIcon />}
          colorScheme="orange"
          onClick={() => {
            const secretLink = document.getElementById("secret-link");
            navigator.clipboard.writeText(secretLink?.textContent || "");
            toast({
              title: "Secret link copied!",
              status: "success",
              duration: 6000,
              isClosable: true,
            });
          }}
        >
          Copy secret link
        </Button>
      </CardBody>
    </Card>
  );
}
