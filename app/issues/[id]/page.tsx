import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";

interface IssueDetailPageParams {
  id: string;
}

const IssueDetailPage = async ({
  params,
}: {
  params: IssueDetailPageParams;
}) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  return (
    <Box>
      <Heading>{issue?.title}</Heading>
      <Flex gap="4" my="2">
        <p>{issue?.createdAt?.toDateString()}</p>
        <IssueStatusBadge status={issue?.status} />
      </Flex>
      <Card className="prose mt-4">
        <ReactMarkdown>{issue?.description}</ReactMarkdown>
      </Card>
    </Box>
  );
};

export default IssueDetailPage;
