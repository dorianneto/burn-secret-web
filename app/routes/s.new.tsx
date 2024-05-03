import { CopyIcon } from "@chakra-ui/icons";
import { Button, Card, CardBody, Tooltip, useToast } from "@chakra-ui/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return null;
};

export default function SecretNew() {
  //   const { contact } = useLoaderData<typeof loader>();
  const toast = useToast();

  return (
    <Card variant="elevated">
      <CardBody>
        <Tooltip label="Reminder: this link will be burned within 12 hours" placement="top">
          <p id="secret-link" className="text-xl my-8">
            https://burnsecret.link/s/abc-123-def-456-ghi-789
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
