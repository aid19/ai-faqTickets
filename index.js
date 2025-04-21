import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const openAIClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Sample support tickets
const supportTickets = [
  { id: 1, issue: "IntelliJ IDEA is running slow after the last update." },
  { id: 2, issue: "How can I configure Git inside PyCharm?" },
  {
    id: 3,
    issue: "JetBrains AI Assistant is not suggesting code completions.",
  },
  { id: 4, issue: "I get a ‘License expired’ error when opening WebStorm." },
  { id: 5, issue: "How do I enable dark mode in JetBrains Rider?" },
];

async function generateFAQ(tickets) {
  let prompt = "Here are some common support issues:\n\n";

  // Add ticket issues to the prompt
  tickets.forEach((ticket) => {
    prompt += `- ${ticket.issue}\n`;
  });

  prompt +=
    "\nGenerate concise FAQ-style questions and answers based on these issues.";

  try {
    const response = await openAIClient.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an AI that generates FAQs for support issues.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const faqOutput = response.choices[0].message.content.trim();
    console.log("Generated FAQ:\n", faqOutput);
  } catch (error) {
    console.error(
      "Error generating FAQ:",
      error.response ? error.response.data : error.message
    );
  }
}

// Run the function with the mock support tickets
generateFAQ(supportTickets);
