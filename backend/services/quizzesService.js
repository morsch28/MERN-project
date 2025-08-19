import Quiz from "../model/quiz.js";

async function getRandomQuestion() {
  const count = await Quiz.countDocuments();
  if (count == 0) {
    return { status: false, msg: "No questions in database" };
  }
  const random = Math.floor(Math.random() * count);
  const question = await Quiz.findOne()
    .skip(random)
    .select("_id question answers");
  if (!question) {
    return { status: false, msg: "not found question" };
  }
  return {
    status: true,
    msg: "return question successfully",
    data: { question, totalCount: count },
  };
}

async function checkCorrectAnswer(questionId, indexOfAnswer) {
  if (!questionId || indexOfAnswer == null || indexOfAnswer == undefined) {
    return { status: false, msg: "missing parameters" };
  }
  const question = await Quiz.findById(questionId);
  if (!question) {
    return { status: false, msg: "not found question" };
  }
  if (indexOfAnswer < 0 || indexOfAnswer >= question.answers.length) {
    return { status: false, msg: "answer index out of range" };
  }
  const correct = question.correctAnswer == indexOfAnswer;

  return {
    status: true,
    msg: "check correct answer successfully",
    data: correct,
  };
}

async function getCorrectAnswer(id) {
  if (!id) {
    return { status: false, msg: "missing parameters" };
  }
  const question = await Quiz.findById(id).select(
    "question answers correctAnswer"
  );
  if (!question) {
    return { status: false, msg: "not found question" };
  }
  const answerIndex = question.correctAnswer;
  const correctText = question.answers[answerIndex];
  return {
    status: true,
    msg: "return correct answer successfully",
    data: correctText,
  };
}

const quizzesService = {
  getRandomQuestion,
  checkCorrectAnswer,
  getCorrectAnswer,
};

export default quizzesService;
