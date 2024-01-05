import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";

export default async function Home() {
  const issues = await prisma.issue.findMany();
  const openIssuesCount = issues.filter(
    (issue) => issue.status === "OPEN"
  ).length;
  const closedIssuesCount = issues.filter(
    (issue) => issue.status === "CLOSED"
  ).length;
  const inProgressIsssuesCount = issues.filter(
    (issue) => issue.status === "IN_PROGRESS"
  ).length;
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="4">
      <Flex direction="column" gap="4">
        <IssueSummary
          closed={closedIssuesCount}
          open={openIssuesCount}
          inProgress={inProgressIsssuesCount}
        />
        <IssueChart
          closed={closedIssuesCount}
          open={openIssuesCount}
          inProgress={inProgressIsssuesCount}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
