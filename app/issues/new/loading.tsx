import { Box } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const CreateNewIssuePageLoading = async () => {
  return (
    <Box className="max-w-xl space-y-4">
      <Box className="space-y-4">
        <Skeleton />
        <Skeleton height="20rem" />
      </Box>
      <Skeleton width="4rem" className="mt-5" />
    </Box>
  );
};

export default CreateNewIssuePageLoading;
