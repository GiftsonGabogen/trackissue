"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const statuses: { value?: Status; label: string }[] = [
  {
    label: "All",
  },
  {
    label: "Open",
    value: "OPEN",
  },
  {
    label: "In Progress",
    value: "IN_PROGRESS",
  },
  {
    label: "Closed",
    value: "CLOSED",
  },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const onSelectionChange = (value: string) => {
    const query = value ? `?status=${value}` : "";
    router.push(`/issues${query}`);
  };

  return (
    <Select.Root
      defaultValue="ALL"
      onValueChange={(value) => onSelectionChange(value)}
    >
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content position="popper">
        {statuses.map((status) => (
          <Select.Item
            key={status?.value || "ALL"}
            value={status?.value || "ALL"}
          >
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
