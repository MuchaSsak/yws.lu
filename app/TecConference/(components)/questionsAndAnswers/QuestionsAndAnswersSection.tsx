import React from "react";

import QuestionsAndAnswersHeader from "@/app/TecConference/(components)/questionsAndAnswers/QuestionsAndAnswersHeader";
import QuestionsAndAnswersCards from "@/app/TecConference/(components)/questionsAndAnswers/QuestionsAndAnswersCards";

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
