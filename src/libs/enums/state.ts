enum State {
  GeneratingReviewError = -2,
  GeneratingQuestionsError = -1,
  LoadingQuestions = 0,
  QuestionsLoaded = 1,
  GeneratingReview = 2,
  ReviewGenerated = 3,
  Chatting = 4,
  ReviewSent = 5,
  SavingReviewError = 6,
}

export default State;
