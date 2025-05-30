"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Editor } from "@tinymce/tinymce-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "../ui/form";
import { Input } from "../ui/input";
import { questionsSchema } from "@/lib/validations";
import React, { useRef } from "react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { createQuestion } from "@/lib/actions/question.action";
import { useRouter } from "next/navigation";
const type: string = "create";

function Question({ mongoUserId }: { mongoUserId: string }) {
  const router = useRouter();
  const editorRef = useRef(null);
  const form = useForm<z.infer<typeof questionsSchema>>({
    resolver: zodResolver(questionsSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });
  async function onSubmit(values: z.infer<typeof questionsSchema>) {
    console.log(values);
    try {
      await createQuestion({
        title: values.title,
        content: values.explanation,
        tags: values.tags,
        author: JSON.parse(mongoUserId),
        path: "/",
      });
      router.push("/");
    } catch (error) {
    } finally {
      form.reset(
        {},
        {
          keepErrors: true,
          keepDirty: true,
          keepIsSubmitted: false,
          keepTouched: true,
        }
      );
    }
  }

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();
      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters",
          });
        }
        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };
  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex  w-full flex-col gap-10 "
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col ">
              <FormLabel className="paragraph-semibold text-dark400_light800 ">
                Question Title<span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light900 min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and imagine your asking a question to another person
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800 ">
                Detailed explanation of your problem
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Editor
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  // @ts-ignore
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  initialValue=""
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks ",
                      "codesample",
                      "fullscreen",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "codesample | bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist ",
                    content_style: "body { font-family:Inter; font-size:16px }",
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduce the problem and expand ....
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col ">
              <FormLabel className="paragraph-semibold text-dark400_light800 ">
                Add tags<span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <Input
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light900 min-h-[56px] border"
                  />
                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 gap-2">
                      {field.value.map((tag, index) => (
                        <Badge
                          key={tag + index}
                          className="subte-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md py-2 capitalize"
                        >
                          {tag}
                          <Image
                            onClick={() => {
                              handleTagRemove(tag, field);
                            }}
                            alt="close icon"
                            src={"/assets/icons/close.svg"}
                            width={12}
                            height={12}
                            className="inert-0 darK:invert cursor-pointer object-contain"
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to 3 tags, press. You need to press enter to add a tag
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>{type === "edit" ? "Editing" : "Submiting"}</>
          ) : (
            <>{type === "edit" ? "Edit" : "Submit"}</>
          )}
        </Button>
      </form>
    </Form>
  );
}

export default Question;
