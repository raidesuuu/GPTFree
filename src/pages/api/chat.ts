import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const response = await fetch(
        "https://api.voids.top/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_API_KEY`, // Replace with your actual API key
          },
          body: JSON.stringify({
            model: req.body.model, // Use the model specified in the request
            messages: req.body.messages, // Pass the messages from the client
          }),
        }
      );

      if (!response.ok) {
        const a = await response.text();
        console.error(`Error fetching data: ${a}`);
        res.status(500).json({ error: "Server Down" });
        return;
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
