import { connectDB } from "@utils/database";
import { Prompt } from "@models/prompt";

export const GET = async (req, { params }) => {
  try {
    // Connect to the database
    await connectDB();

    // Find the prompt by ID and populate the related data if needed
    const prompt = await Prompt.findById(params.id); // Make sure to specify the field to populate if needed

    if (!prompt) {
      return new Response(JSON.stringify({ message: "Prompt not found" }), {
        status: 404,
      });
    }

    // Return the found prompt as a response
    return new Response(
      JSON.stringify({
        prompt: prompt,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching prompt:", error);

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

export const PATCH = async (req, { params }) => {
  try {
    await connectDB();
    const existingPrompt = await Prompt.findById({ _id: params.id }).populate;
    if (!existingPrompt) {
      return new Response({ message: "Prompt not found" }, { status: 404 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(
      JSON.stringify({
        message: "Prmopt updated successfully",
        prompt: existingPrompt,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log("Error", error.massage);
    return new Response(
      JSON.stringify({
        massage: "Internal server error",
        status: 500,
      })
    );
  }
};
export const DELETE = async (req, { params }) => {
  try {
    // Connect to the database
    await connectDB();

    // Delete the prompt
    const deletedPrompt = await Prompt.findByIdAndDelete(params.id);

    if (!deletedPrompt) {
      return new Response(JSON.stringify({ message: "Prompt not found" }), {
        status: 404,
      });
    }

    // Return success response
    return new Response(
      JSON.stringify({ message: "Prompt deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    // Log the error with the correct property
    console.error("Error:", error.message);

    // Return error response
    return new Response(
      JSON.stringify({ message: "Internal server error" }), // Corrected 'massage' to 'message'
      {
        status: 500,
      }
    );
  }
};
