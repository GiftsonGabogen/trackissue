import NextLink from "next/link";
import { Flex, Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import { CreateNewIssueButton, IssueStatusBadge, Link } from "@/app/components";
import IssueStatusFilter from "./_components/IssueStatusFilter";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";

const IssuesList = ({ issues }: { issues: Issue[] }) => {
  if (!!issues?.length) {
    return issues.map((issue) => (
      <Table.Row key={issue.id}>
        <Table.RowHeaderCell>
          <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
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
    ));
  }
  return null;
};

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: { status: Status; orderBy: keyof Issue };
}) => {
  const tableHeaders: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = tableHeaders
    .map((header) => header.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
  });
  return (
    <div className="space-y-5">
      <Flex justify="between">
        <CreateNewIssueButton />
        <IssueStatusFilter />
      </Flex>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {tableHeaders.map((header) => (
              <Table.ColumnHeaderCell
                key={header.value}
                className={header.className}
              >
                <NextLink
                  href={{ query: { ...searchParams, orderBy: header.value } }}
                >
                  {header.label}
                </NextLink>
                {header.value === searchParams?.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <IssuesList issues={issues} />
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
