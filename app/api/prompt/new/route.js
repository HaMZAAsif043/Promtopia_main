import { connectDB } from "@utils/database";
import { Prompt } from "@models/prompt";

export const POST = async (req) => {
  // Method should be lowercase "post"
  try {
    const { prompt, userId, tag } = await req.json(); // Use req.json() to parse the body

    // Connect to the database
    await connectDB();

    // Create and save the new prompt
    const newPrompt = new Prompt({
      creator: userId,
      prompt, // Use the destructured variable
      tag,
    });
    await newPrompt.save();

    // Return a success response
    return new Response(
      JSON.stringify({
        message: "Prompt created successfully",
        prompt: newPrompt,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating prompt:", error);

    // Return an error response
    return new Response(
      JSON.stringify({
        message: "Internal server error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
