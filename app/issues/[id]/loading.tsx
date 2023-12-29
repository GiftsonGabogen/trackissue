import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const IssueDetailPageLoading = () => {
  return (
    <Box>
      <Heading>
        <Skeleton width="10rem" />
      </Heading>
      <Flex gap="4" my="2">
        <Skeleton width="8rem" />
        <Skeleton width="4rem" />
      </Flex>
      {/* prose is for adding style on markdown that is converted to hmtl, remove and check what is the difference */}
      <Card className="prose mt-4">
        <Skeleton count={4} />
      </Card>
    </Box>
  );
};

export default IssueDetailPageLoading;
