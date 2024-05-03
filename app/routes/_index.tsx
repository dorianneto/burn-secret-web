import {
  Button,
  Card,
  CardBody,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";

export async function action({ request }: ActionFunctionArgs) {
  // const body = await request.formData();
  return redirect("s/new");
}

export default function Index() {
  const navigation = useNavigation();

  return (
    <Form method="post" className="flex flex-col gap-6">
      <Card variant="elevated">
        <CardBody>
          <Textarea placeholder="Secret content goes here..." name="secret" />
        </CardBody>
      </Card>
      <Card variant="elevated">
        <CardBody className="flex gap-8">
          <InputGroup>
            <InputLeftAddon>Passphrase</InputLeftAddon>
            <Input
              name="passphrase"
              placeholder="A world or phrase that is difficult to guess"
            />
          </InputGroup>
          <Select placeholder="Lifetime" name="lifetime">
            <option value="option1">7 days</option>
            <option value="option2">3 days</option>
            <option value="option3">1 day</option>
            <option value="option3">12 hours</option>
            <option value="option3">4 hours</option>
            <option value="option3">1 hour</option>
            <option value="option3">30 minutes</option>
            <option value="option3">15 minutes</option>
          </Select>
        </CardBody>
      </Card>
      <Button
        colorScheme="orange"
        type="submit"
        {...(navigation.state === "submitting" ? { isLoading: true } : {})}
      >
        Create a secret link
      </Button>
    </Form>
  );
}
