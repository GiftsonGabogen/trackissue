import React from "react";
import { Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import IssueStatusBadge from "../components/IssueStatusBadge";
import { CreateNewIssueButton } from "../components/IssueActions";

const delay = async () => {
  const newPromise = new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return newPromise;
};

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  await delay();
  return (
    <div className="space-y-5">
      <CreateNewIssueButton />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {!!issues &&
            issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.RowHeaderCell>
                  {issue.title}
                  <p className="md:hidden">
                    <IssueStatusBadge status={issue.status} />
                  </p>
                </Table.RowHeaderCell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
