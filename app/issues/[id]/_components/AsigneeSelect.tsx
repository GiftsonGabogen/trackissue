"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";

const AsigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => fetch("/api/users").then((res) => res.json()),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) return <Skeleton />;
  if (error) return null;
  return (
    <Select.Root
      onValueChange={(value) =>
        fetch(`/api/issues/${issue.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            assignedToUserId: value === "Unassigned" ? null : value || null,
          }),
        })
      }
      defaultValue={issue?.assignedToUserId || "Unassigned"}
    >
      <Select.Trigger />
      <Select.Content position="popper">
        <Select.Item value="Unassigned">Unassign</Select.Item>
        {users?.map((user) => (
          <Select.Item key={user.id} value={user.id}>
            {user.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default AsigneeSelect;
