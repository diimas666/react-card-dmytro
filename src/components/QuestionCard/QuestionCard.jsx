import React from "react";
import styles from "./QuestionCard.module.css";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { Badge } from "../Badge/Badge";
function QuestionCard({ card }) {
  const navigate = useNavigate();
  const levelVariant =
    card.level == 1
      ? "primary"
      : card.level == 2
        ? "success"
        : card.level == 3
          ? "warning"
          : "alert";
  return (
    <div className={styles.card}>
      <div className={styles.cardLabels}>
        <Badge variant={levelVariant}>Level: {card.level}</Badge>
        <Badge variant={card.completed ? "success" : "alert"}>
          {card.completed ? "Completed" : "Not Completed"}
        </Badge>
      </div>
      <h5 className={styles.cardTitle}>{card.question}</h5>
      <div className={styles.cardAnswers}>
        <label>short answer: </label>
        <p className={styles.cardAnswer}>{card.answer}</p>
      </div>
      <Button onClick={() => navigate(`/question/${card.id}`)}>View</Button>
    </div>
  );
}

export default QuestionCard;
