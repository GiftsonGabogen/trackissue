import authOptions from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const checkIfUserExist = async (id: string) => {
  const assignedUser = await prisma.user.findUnique({
    where: { id },
  });
  return assignedUser;
};

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.redirect("/auth/signin");

  const id = parseInt(params.id);

  const issue = await prisma.issue.findUnique({ where: { id } });
  if (!issue) {
    return NextResponse.json({ message: "issue not found" }, { status: 404 });
  }

  const data: Pick<Issue, "title" | "description" | "assignedToUserId"> =
    await request.json();
  const validation = patchIssueSchema.safeParse(data);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  if (data.assignedToUserId) {
    const assignedUser = await checkIfUserExist(data.assignedToUserId);
    if (!assignedUser) {
      return NextResponse.json({ message: "user not found" }, { status: 400 });
    }
  }

  try {
    await prisma.issue.update({ where: { id }, data });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("something went wrong", { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.redirect("/auth/signin");

  const id = parseInt(params.id);

  const issue = await prisma.issue.findUnique({ where: { id } });
  if (!issue) {
    return NextResponse.json({ message: "issue not found" }, { status: 404 });
  }
  try {
    await prisma.issue.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("something went wrong", { status: 400 });
  }
}
