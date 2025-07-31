import Quiz from "../model/quiz.js";
import { categories } from "./challengesEnum.js";

const quizzes = [
  // Nutrition
  {
    category: categories.Nutrition,
    question: "Which vitamin helps with calcium absorption in the body?",
    answers: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
    correctAnswer: 2,
  },
  {
    category: categories.Nutrition,
    question: "What is a great plant-based source of protein?",
    answers: ["Tomato", "Rice and lentils", "Tofu", "Banana"],
    correctAnswer: 2,
  },
  {
    category: categories.Nutrition,
    question: "Which food has the highest amount of iron?",
    answers: ["White rice", "Spinach", "Beef", "Chicken"],
    correctAnswer: 2,
  },
  {
    category: categories.Nutrition,
    question:
      "What is an essential part of an athlete’s diet to maintain energy?",
    answers: ["Fat", "Carbohydrates", "Water", "Vitamins"],
    correctAnswer: 1,
  },
  {
    category: categories.Nutrition,
    question: "How many calories are in one gram of fat?",
    answers: ["4", "7", "9", "12"],
    correctAnswer: 1,
  },
  {
    category: categories.Nutrition,
    question: "What is the benefit of drinking water during a workout?",
    answers: [
      "Improves sleep",
      "Regulates body temperature",
      "Prevents dehydration",
      "Increases appetite",
    ],
    correctAnswer: 2,
  },
  {
    category: categories.Nutrition,
    question: "What is recommended to eat after a workout?",
    answers: ["Chocolate", "Protein and carbohydrates", "Water only", "Coffee"],
    correctAnswer: 1,
  },
  {
    category: categories.Nutrition,
    question: "What is the glycemic index?",
    answers: [
      "Protein percentage in food",
      "Fat level",
      "Rate of blood sugar rise",
      "Fiber amount",
    ],
    correctAnswer: 2,
  },

  // Mentality
  {
    category: categories.Mental,
    question: "What is mindfulness?",
    answers: [
      "Meditation about the past",
      "Positive thinking",
      "Awareness of the present moment",
      "Planning the future",
    ],
    correctAnswer: 2,
  },
  {
    category: categories.Mental,
    question: "What helps reduce daily stress?",
    answers: [
      "Meditation",
      "Maintaining a workout routine",
      "Lack of sleep",
      "Working late",
    ],
    correctAnswer: 1,
  },
  {
    category: categories.Mental,
    question: "What does work-life balance mean?",
    answers: [
      "Always working",
      "Focusing only on family",
      "Balancing career and personal life",
      "Taking long vacations",
    ],
    correctAnswer: 2,
  },
  {
    category: categories.Mental,
    question: "What is an important mental factor for success in training?",
    answers: ["Motivation", "Consistency", "Anger", "Fatigue"],
    correctAnswer: 1,
  },
  {
    category: categories.Mental,
    question: "What can help boost self-confidence?",
    answers: [
      "Comparing yourself to others",
      "Self-criticism",
      "Small consistent achievements",
      "Ignoring success",
    ],
    correctAnswer: 2,
  },
  {
    category: categories.Mental,
    question: "What is a positive mindset?",
    answers: [
      "Thinking about the worst",
      "Seeing opportunities",
      "Expecting failure",
      "Avoiding risks",
    ],
    correctAnswer: 1,
  },
  {
    category: categories.Mental,
    question: "What is the healthy way to deal with failure?",
    answers: ["Ignore it", "Blame others", "Learn from it", "Stop trying"],
    correctAnswer: 2,
  },
  {
    category: categories.Mental,
    question: "What helps build healthy habits?",
    answers: [
      "Only working hard",
      "Stress",
      "Lack of sleep",
      "Starting small and building routine",
    ],
    correctAnswer: 3,
  },

  // Training
  {
    category: categories.Fitness,
    question: "What is aerobic training?",
    answers: [
      "Strength training",
      "Training that raises heart rate over time",
      "Yoga",
      "Weightlifting",
    ],
    correctAnswer: 1,
  },
  {
    category: categories.Fitness,
    question: "What is the benefit of warming up before exercise?",
    answers: [
      "Better sleep",
      "Increased fatigue",
      "Injury prevention",
      "Improved nutrition",
    ],
    correctAnswer: 2,
  },
  {
    category: categories.Fitness,
    question: "How many times a week is it generally recommended to work out?",
    answers: [
      "As often as you can stick to",
      "3–5 times",
      "7 times",
      "Twice a month",
    ],
    correctAnswer: 0,
  },
  {
    category: categories.Fitness,
    question: "What is interval training?",
    answers: [
      "Short bursts of high effort with rest",
      "Training with variable breaks",
      "Yoga",
      "Continuous workout",
    ],
    correctAnswer: 0,
  },
  {
    category: categories.Fitness,
    question: "What is the benefit of strength training?",
    answers: [
      "Reduced coordination",
      "Increased stress",
      "Stronger muscles and bones",
      "Improved vision",
    ],
    correctAnswer: 2,
  },
  {
    category: categories.Fitness,
    question: "What is important to include in your daily routine?",
    answers: [
      "Bright lighting",
      "Food",
      "Cold drinks",
      "Daily functional movements",
    ],
    correctAnswer: 3,
  },
  {
    category: categories.Fitness,
    question: "Which exercise improves posture?",
    answers: ["Plank", "Push-ups", "Running", "Pilates"],
    correctAnswer: 0,
  },
  {
    category: categories.Fitness,
    question: "What is true about rest between workouts?",
    answers: [
      "Not important",
      "Essential for recovery",
      "Slows progress",
      "Causes weight gain",
    ],
    correctAnswer: 1,
  },
];

async function initialQuizzes() {
  await Quiz.deleteMany();

  for (const quiz of quizzes) {
    await new Quiz(quiz).save();
  }
}

export default initialQuizzes;
