enum State {
  GeneratingQuestionsError = -1,
  LoadingQuestions = 0,
  QuestionsLoaded = 1,
  GeneratingReview = 2,
  ReviewGenerated = 3,
  Chatting = 4,
}

export default State;
