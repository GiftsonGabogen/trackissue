"use client";
import "easymde/dist/easymde.min.css";
import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssue = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  const [error, setError] = useState<string | null>(null);

  const onFormSubmit = async (data: IssueForm) => {
    const res = await fetch("/api/issues", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      setError("unexpected behaviour");
    } else {
      router.push("/issues");
    }
  };

  return (
    <div className="max-w-xl space-y-4">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
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
    </div>
  );
};

export default NewIssue;
