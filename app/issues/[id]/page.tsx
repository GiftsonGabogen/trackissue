import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./_components/EditIssueButton";
import IssueDetails from "./_components/IssueDetails";

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
    <Grid columns={{ initial: "1", md: "5" }} gap="4">
      <Box className="col-span-4 w-full">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issue={issue} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
