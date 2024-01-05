import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

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
    <IssueSummary
      closed={closedIssuesCount}
      open={openIssuesCount}
      inProgress={inProgressIsssuesCount}
    />
  );
}
