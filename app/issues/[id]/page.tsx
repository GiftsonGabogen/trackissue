import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./_components/EditIssueButton";
import IssueDetails from "./_components/IssueDetails";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

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
  const session = await getServerSession(authOptions);
  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="4">
      <Box className="col-span-4 w-full">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <EditIssueButton issue={issue} />
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
