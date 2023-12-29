import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

enum StatusColors {
  RED = "red",
  VIOLET = "violet",
  GREEN = "green",
}

const statusMap: Record<Status, { label: string; color: StatusColors }> = {
  OPEN: { label: "open", color: StatusColors.RED },
  IN_PROGRESS: { label: "in progress", color: StatusColors.VIOLET },
  CLOSED: { label: "closed", color: StatusColors.GREEN },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
