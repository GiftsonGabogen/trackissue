import { Status } from "@prisma/client";
import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "title is required").max(255).optional(),
  description: z.string().min(1, "Description is required").optional(),
  status: z.nativeEnum(Status).optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required")
    .optional()
    .nullable(),
});
