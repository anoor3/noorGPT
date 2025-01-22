import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyCsEAO6b9axEPfgwK42wORt5ip4hcn1XsQ');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export async function generateResponse(prompt: string): Promise<string> {
  try {
    if (prompt.toLowerCase() === 'who are you?') {
      return 'I am a chatbot made by Abdullah Noor, and my name is NoorGPT.';
    }
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    return 'Sorry, I encountered an error while processing your request.';
  }
}

