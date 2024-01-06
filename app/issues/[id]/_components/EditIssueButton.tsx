"use client";
import { Issue } from "@prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { DeleteButton } from "./DeleteButton";
import AsigneeSelect from "./AsigneeSelect";
import StatusSelect from "./StatusSelect";

const EditIssueButton = ({ issue }: { issue: Issue }) => {
  return (
    <Flex direction="column" gap="2" width="max-content">
      <AsigneeSelect issue={issue} />
      <StatusSelect issue={issue} />
      <Button>
        <Pencil2Icon />
        <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
      </Button>
      <DeleteButton title={issue.title} id={issue.id} />
    </Flex>
  );
};

export default EditIssueButton;
