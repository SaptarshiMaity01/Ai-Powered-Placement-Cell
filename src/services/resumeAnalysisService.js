import { generateContent } from "./aiService";

// Analyze Grammar and ATS
export const analyzeGrammarAndATS = async (resumeData, apiKey) => {
  const resumeText = createResumeTextForAnalysis(resumeData);

  const prompt = `Analyze the following resume content for grammar issues and ATS (Applicant Tracking System) optimization:

${resumeText}

Provide your response in the following JSON format exactly, with nothing else:
{
  "grammar": {
    "score": [number between 1-10],
    "issues": ["list", "of", "specific", "grammar", "issues"],
    "suggestions": ["list", "of", "specific", "grammar", "improvement", "suggestions"]
  },
  "ats": {
    "score": [number between 1-10],
    "optimization": ["list", "of", "suggestions", "to", "make", "the", "resume", "more", "ATS", "friendly"],
    "keywords": ["list", "of", "keywords", "that", "would", "improve", "ATS", "performance", "for", "this", "role"]
  }
}
`;

  try {
    const response = await generateContent(prompt, apiKey);
    const parsedResponse = JSON.parse(response);
    return {
      grammar: parsedResponse.grammar,
      ats: parsedResponse.ats,
    };
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw new Error("Failed to analyze resume. Please try again.");
  }
};

// Score Resume
export const scoreResume = async (resumeData, apiKey) => {
  const resumeText = createResumeTextForAnalysis(resumeData);

  const prompt = `Score and provide feedback for the following resume content:

${resumeText}

Provide a score for clarity (how clearly information is presented), impact (how well achievements are highlighted), and relevance (how relevant the content is for the stated job title). Also provide overall feedback.

Respond in the following JSON format exactly, with nothing else:
{
  "clarity": [number between 1-10],
  "impact": [number between 1-10],
  "relevance": [number between 1-10],
  "overall": [number between 1-10],
  "feedback": "detailed feedback with specific suggestions for improvement"
}
`;

  try {
    const response = await generateContent(prompt, apiKey);
    const parsedResponse = JSON.parse(response);
    return parsedResponse;
  } catch (error) {
    console.error("Error scoring resume:", error);
    throw new Error("Failed to score resume. Please try again.");
  }
};

// Helper to format resume into plain text
const createResumeTextForAnalysis = (resumeData) => {
  const { personalInfo, experiences, education, skills, projects } = resumeData;

  let resumeText = `# ${personalInfo.fullName}\n`;
  resumeText += `${personalInfo.title}\n`;
  resumeText += `${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}\n`;

  if (personalInfo.linkedin) {
    resumeText += `LinkedIn: ${personalInfo.linkedin}\n`;
  }

  if (personalInfo.website) {
    resumeText += `Website: ${personalInfo.website}\n`;
  }

  resumeText += `\n## Summary\n${personalInfo.summary}\n`;

  resumeText += "\n## Experience\n";
  experiences.forEach((exp) => {
    resumeText += `${exp.title} at ${exp.company}, ${exp.location}\n`;
    resumeText += `${exp.startDate} - ${exp.current ? "Present" : exp.endDate}\n`;
    resumeText += `${exp.description}\n\n`;
  });

  resumeText += "\n## Education\n";
  education.forEach((edu) => {
    resumeText += `${edu.degree} in ${edu.field}, ${edu.institution}, ${edu.location}\n`;
    resumeText += `${edu.startDate} - ${edu.endDate}\n\n`;
  });

  resumeText += "\n## Skills\n";
  resumeText += skills.map((skill) => skill.name).join(", ") + "\n";

  resumeText += "\n## Projects\n";
  projects.forEach((project) => {
    resumeText += `${project.name}\n`;
    resumeText += `${project.startDate} - ${project.current ? "Present" : project.endDate}\n`;
    resumeText += `${project.description}\n\n`;
  });

  return resumeText;
};
