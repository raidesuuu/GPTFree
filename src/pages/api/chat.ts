import { NextRequest } from "next/server";

export const runtime = "edge";

export default async function handler(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const { model, messages } = await req.json();

      const response = await fetch(
        "https://api.voids.top/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_API_KEY`, // Replace with your actual API key
          },
          body: JSON.stringify({
            model: model, // Use the model specified in the request
            messages: messages, // Pass the messages from the client
          }),
        }
      );

      if (!response.ok) {
        const a = await response.text();
        console.error(`Error fetching data: ${a}`);
        return new Response(JSON.stringify({ error: "Server Down" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
        return;
      }

      const data = await response.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  } else {
    return new Response(
      JSON.stringify({ error: `Method ${req.method} Not Allowed` }),
      {
        status: 405,
        headers: {
          Allow: "POST",
          "Content-Type": "application/json",
        },
      }
    );
  }
}
