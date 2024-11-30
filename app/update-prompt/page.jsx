"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });

    const router = useRouter();
    useEffect(() => {
        const getPrompt = async () => {
            const res = await fetch(`/api/prompt/${promptId}`);
            const data = await res.json();
            setPost({
                prompt: data.prompt.prompt,
                tag: data.prompt.tag
            });
        }
        if (promptId) {
            getPrompt();
        }
    }, [promptId])
    const editPrompt = async (e) => {
        e.preventDefault(); // Fixed typo
        if (!promptId) {
            alert("Enter a valid ID")
        }
        setSubmitting(true);
        try {
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: post.prompt,
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
            type="Edit"
            post={post}
            submitting={submitting}
            setPost={setPost}
            handleSubmit={editPrompt} // Pass the corrected function
        />
    );
};

export default EditPrompt;
