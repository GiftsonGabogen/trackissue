"use client";
import { Issue, Status, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const { isLoading, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => fetch("/api/users").then((res) => res.json()),
    staleTime: 60 * 1000,
    retry: 3,
  });

  const onSelectChange = async (value: Status) => {
    try {
      const res = await fetch(`/api/issues/${issue.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          status: value,
        }),
      });
      if (!res.ok) {
        throw new Error("could not save the changes");
      }
    } catch (error) {
      toast.error("could not save the changes");
    }
  };

  if (isLoading) return <Skeleton />;
  if (error) return null;
  return (
    <>
      <Select.Root
        onValueChange={(value: Status) => onSelectChange(value)}
        defaultValue={issue.status}
      >
        <Select.Trigger />
        <Select.Content position="popper">
          {Object.keys(Status).map((_status) => (
            <Select.Item key={_status} value={_status}>
              {_status}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default StatusSelect;
