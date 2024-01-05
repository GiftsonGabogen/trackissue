import prisma from "@/prisma/client";
import {
  Avatar,
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import React from "react";
import { IssueStatusBadge } from "./components";
import { cn } from "./utils/cn";
import Link from "next/link";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      assignedToUser: true,
    },
  });
  return (
    <Card>
      <Heading className="p-4" size="6" mb="2">
        Latest Issues
      </Heading>
      <Flex direction="column" gap="4">
        {issues.map((issue, i, issues) => (
          <Flex
            key={issue.id}
            className={cn("border-gray-300 p-4", {
              "border-b": i + 1 !== issues.length,
            })}
            justify="between"
            align="center"
          >
            <Flex direction="column" align="start" gap="2">
              <Link href={`issues/${issue.id}`}>
                <Text>{issue.title}</Text>
              </Link>
              <IssueStatusBadge status={issue.status} />
            </Flex>
            {issue?.assignedToUser && (
              <Avatar
                fallback="?"
                src={issue.assignedToUser.image!}
                radius="full"
                size="2"
              />
            )}
          </Flex>
        ))}
      </Flex>
    </Card>
  );
};

export default LatestIssues;
