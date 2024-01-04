"use client";
import { Spinner } from "@/app/components";
import { Issue } from "@prisma/client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

export const DeleteButton = ({
  title,
  id,
}: {
  title: Issue["title"];
  id: Issue["id"];
}) => {
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const router = useRouter();

  const handleOnIssueDelete = async (id: Issue["id"]) => {
    setIsSubmitting(true);
    try {
      await fetch(`/api/issues/${id}`, { method: "DELETE" });
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setError("something went wrong");
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button
            color="red"
            disabled={isSubmitting}
            className="cursor-pointer"
          >
            <AiOutlineDelete />
            Delete issue
            {isSubmitting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Deleting Issue</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Deleting {title}
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                onClick={() => handleOnIssueDelete(id)}
              >
                Delete issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={!!error} onOpenChange={() => setError("")}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>{error}</AlertDialog.Description>{" "}
          <Flex mt="4">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};
