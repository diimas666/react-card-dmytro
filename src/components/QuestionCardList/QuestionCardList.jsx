import React from "react";
import styles from "./QuestionCardList.module.css";
import { QuestionCard } from "../QuestionCard";
import { memo } from "react";
export const QuestionCardList = memo(({ cards = [] }) => {
  return (
    <div className={styles.cardList}>
      {cards.map((card, index) => {
        return <QuestionCard card={card} key={index} />;
      })}
    </div>
  );
});
QuestionCardList.displayName = "QuestionCardList";
