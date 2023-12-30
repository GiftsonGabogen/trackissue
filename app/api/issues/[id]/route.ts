import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const id = parseInt(params.id);

  const issue = await prisma.issue.findUnique({ where: { id } });
  if (!issue) {
    return NextResponse.json({ message: "issue not found" }, { status: 404 });
  }

  const data: Pick<Issue, "title" | "description"> = await request.json();
  const validation = issueSchema.safeParse(data);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  try {
    const newIssue = await prisma.issue.update({ where: { id }, data });
    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("something went wrong", { status: 400 });
  }
}
