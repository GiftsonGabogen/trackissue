import { Button } from "@radix-ui/themes";
import Link from "next/link";

export const CreateNewIssueButton = () => {
  return (
    <Button>
      <Link href="/issues/new">create new issue</Link>
    </Button>
  );
};
