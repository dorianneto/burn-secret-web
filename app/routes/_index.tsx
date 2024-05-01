import { Alert, AlertDescription, AlertIcon, AlertTitle, CircularProgress } from "@chakra-ui/react";

export default function Index() {
  return (
    <div>
      <Alert status='error'>
        <AlertIcon />
        <AlertTitle>Your browser is outdated!</AlertTitle>
        <AlertDescription>Your Chakra experience may be degraded.</AlertDescription>
      </Alert>
      <CircularProgress isIndeterminate color='green.300' />
    </div>
  );
}
