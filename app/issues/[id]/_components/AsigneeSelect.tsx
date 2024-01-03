"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import toast, { Toaster } from "react-hot-toast";

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
    <>
      <Select.Root
        onValueChange={async (value) => {
          try {
            const res = await fetch(`/api/issues/${issue.id}`, {
              method: "PATCH",
              body: JSON.stringify({
                assignedToUserId: value === "Unassigned" ? null : value || null,
              }),
            });
            if (!res.ok) {
              throw new Error("could not save the changes");
            }
          } catch (error) {
            toast.error("could not save the changes");
          }
        }}
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
      <Toaster />
    </>
  );
};

export default AsigneeSelect;
