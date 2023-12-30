import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <div className="w-full">
      <Heading>{issue?.title}</Heading>
      <Flex gap="4" my="2">
        <p>{issue?.createdAt?.toDateString()}</p>
        <IssueStatusBadge status={issue?.status} />
      </Flex>
      <Card className="prose max-w-full mt-4">
        <ReactMarkdown>{issue?.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetails;
