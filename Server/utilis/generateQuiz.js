const { StructuredOutputParser } = require("langchain/output_parsers");
const { PromptTemplate } = require("langchain/prompts");
const { z } = require("zod");
const { OpenAI } = require("langchain/llms/openai");
const { Questions } = require("../models/questions");
const { v4: uuidv4 } = require("uuid"); // Import UUID library
const { QuestionsCollection } = require("../models/questionsCollection");

const parser = StructuredOutputParser.fromZodSchema(
  z
    .array(
      z.object({
        question: z.string().describe("The question being asked."),
        optionA: z.string().describe("Option A for the question."),
        optionB: z.string().describe("Option B for the question."),
        optionC: z.string().describe("Option C for the question."),
        optionD: z.string().describe("Option D for the question."),
        correctAnswer: z
          .enum(["A", "B", "C", "D"])
          .describe("The correct option (A, B, C, or D)."),
      })
    )
    .length(5)
);
const formatInstructions = parser.getFormatInstructions();

const quizQuestions = [
  {
    question: "What is the capital city of France?",
    optionA: "Berlin",
    optionB: "Paris",
    optionC: "Rome",
    optionD: "Madrid",
    correctAnswer: "B",
  },
  {
    question: "What is the chemical symbol for water?",
    optionA: "W",
    optionB: "H2O",
    optionC: "O2",
    optionD: "Ag",
    correctAnswer: "B",
  },
];

const generateQuizzes = async (category, subcategory, userId) => {
  const model = new OpenAI({
    modelName: "gpt-3.5-turbo-0613",
    openAIApiKey: process.env.LANGCHAIN_API_KEY,
  });

  const prompt = new PromptTemplate({
    template: `You are an esteemed expert in crafting quizzes for a prestigious educational magazine. Your current assignment involves creating a compelling quiz series centered around the topic of {category}. For this task, you are required to focus on the {subcategory} aspect of the topic.

    To achieve this, you are tasked with generating multiple-choice questions and options. Each question should have four options (A, B, C, and D), and only one of the options should be the correct answer. Remember to format the quiz properly for clarity.
    
    Example Questions:
    ###
    ${quizQuestions}
    ###
    
    \n{format_instructions}

    Your Solution Here
      `,
    inputVariables: ["category", "subcategory"],
    partialVariables: { format_instructions: formatInstructions },
  });

  const loadedChain = await prompt.format({
    category: category,
    subcategory: subcategory,
  });

  try {
    console.log("Hello world");
    const response = await model.call(loadedChain);
    const questions = await parser.parse(response);
    console.log(questions);
    const questionUUID = uuidv4();

    const newQuestionCollection = new QuestionsCollection({
      questionCollectionId: questionUUID,
      user: userId,
      category: category,
      subcategory: subcategory,
    });

    await newQuestionCollection.save();

    // Save the questions to the database

    if (questions) {
      for (
        let questionIndex = 0;
        questionIndex < questions.length;
        questionIndex++
      ) {
        const { question, optionA, optionB, optionC, optionD, correctAnswer } =
          questions[questionIndex];

        const newQuestion = new Questions({
          questionId: questionUUID,
          question,
          optionA,
          optionB,
          optionC,
          optionD,
          correctAnswer,
          user: userId,
          category,
          subcategory,
          questionCollection: newQuestionCollection._id, // Add other fields like userId, created_at, etc. if needed
        });

        // Save the question to the database
        await newQuestion.save();
      }
    }
  } catch (error) {
    console.log({ error });
    throw new Error("Failed to generate skeleton array: ");
  }
};

module.exports = generateQuizzes;
