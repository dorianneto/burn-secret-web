import { CopyIcon } from "@chakra-ui/icons";
import { Button, Card, CardBody, useToast } from "@chakra-ui/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return null;
};

export default function SecretNew() {
  //   const { contact } = useLoaderData<typeof loader>();
  const toast = useToast();

  return (
    <Card variant="elevated">
      <CardBody>
        <p id="secret-link" className="text-xl my-8">
          http://burnsecret.link/s/abc-123-def-456-ghi-789
        </p>
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
