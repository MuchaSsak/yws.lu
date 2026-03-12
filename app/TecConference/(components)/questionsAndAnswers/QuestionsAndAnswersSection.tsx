import React from "react";

import QuestionsAndAnswersHeader from "@/app/tecConference/(components)/questionsAndAnswers/QuestionsAndAnswersHeader";
import QuestionsAndAnswersCards from "@/app/tecConference/(components)/questionsAndAnswers/QuestionsAndAnswersCards";

function QuestionsAndAnswersSection() {
  return (
    <section className="px-side pb-20">
      {/* Header */}
      <QuestionsAndAnswersHeader />

      {/* Cards */}
      <QuestionsAndAnswersCards />
    </section>
  );
}

export default QuestionsAndAnswersSection;
