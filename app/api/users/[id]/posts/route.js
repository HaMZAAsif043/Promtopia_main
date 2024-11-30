import { connectDB } from "@utils/database";
import { Prompt } from "@models/prompt";
import User from "@models/user";

export const GET = async (req, { params }) => {
  try {
    await connectDB();

    // Fetch all prompts for a specific user (populate the "creator" field)
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};
