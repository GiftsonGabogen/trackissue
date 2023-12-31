import { Flex, Table } from "@radix-ui/themes";
import React from "react";
import { Skeleton, CreateNewIssueButton } from "@/app/components";
import IssueStatusFilter from "./_components/IssueStatusFilter";

const LoadingIssuesPage = () => {
  const issues = new Array(1, 2, 3, 4, 5);
  return (
    <div className="space-y-5">
      <Flex justify="between">
        <CreateNewIssueButton />
        <IssueStatusFilter />
      </Flex>
      <Table.Root>
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
            issues.map((issue, id) => (
              <Table.Row key={id}>
                <Table.RowHeaderCell>
                  <Skeleton />
                  <p className="md:hidden">
                    <Skeleton />
                  </p>
                </Table.RowHeaderCell>
                <Table.Cell className="hidden md:table-cell">
                  <Skeleton />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <Skeleton />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingIssuesPage;
