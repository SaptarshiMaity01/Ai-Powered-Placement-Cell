import Groq from 'groq-sdk'

export const createGroqClient = (apiKey) => {
    // For testing, you can hardcode the API key here
    const testKey = "gsk_GaEe8aAJHTLqmNhzqN"; // Replace with your actual key
    return new Groq({
      apiKey: apiKey || testKey
    });
  };