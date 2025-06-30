// Define the generateChatCompletion function

export const generateChatCompletion = async (messages, apiKey) => {
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "qwen-qwq-32b",
          messages,
          temperature: 0.7,
          max_tokens: 1024
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to generate response");
      }
  
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error generating chat completion:", error);
      throw error;
    }
  };
  
  // Optional: Export the ChatMessage shape as a JSDoc comment
  /**
   * @typedef {Object} ChatMessage
   * @property {"user" | "assistant" | "system"} role
   * @property {string} content
   */
  