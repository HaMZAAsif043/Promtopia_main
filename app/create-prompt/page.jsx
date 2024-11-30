"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompt = () => {
  const { data: session } = useSession(); // Removed unused status
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const router = useRouter();

  const createPrompt = async (e) => {
    e.preventDefault(); // Fixed typo

    setSubmitting(true);
    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });
      console.log(res);
      if (res.ok) {
        setPost({ prompt: "", tag: "" }); // Reset the form
        router.push("/"); // Navigate to the home page
      }
    } catch (error) {
      console.error("Failed to create prompt:", error); // Log the error
    } finally {
      setSubmitting(false); // Ensure submitting is reset
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      submitting={submitting}
      setPost={setPost}
      handleSubmit={createPrompt} // Pass the corrected function
    />
  );
};

export default CreatePrompt;
