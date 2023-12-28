"use client";
import "easymde/dist/easymde.min.css";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssue = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const onFormSubmit = async (data: IssueForm) => {
    await fetch("/api/issues", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.push("/issues");
  };
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 max-w-xl">
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />

      <Button type="submit">add issue</Button>
    </form>
  );
};

export default NewIssue;
