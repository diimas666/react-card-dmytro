import { useNavigate, useParams } from "react-router-dom";
import styles from "./QuestionPage.module.css";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";
import { useId, useState, useEffect } from "react";
import { useFetch, parseJsonResponse } from "../../hooks/useFetch";
import { API_URL } from "../../constants";

function QuestionPage() {
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const { id } = useParams();
  const [fetchCard, isCardLoading] = useFetch(async () => {
    const response = await fetch(`${API_URL}/react/${id}`);
    const data = await parseJsonResponse(response);
    setCard(data);
    setIsChecked(Boolean(data.completed));
    return data;
  });

  const [updateCard, isCardUpdating] = useFetch(async (isChecked) => {
    const response = await fetch(`${API_URL}/react/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ completed: isChecked }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await parseJsonResponse(response);
    setCard(data);
  });

  const checkboxId = useId();
  const levelVariant =
    card?.level == 1 ? "primary" : card?.level == 2 ? "success" : card?.level == 3 ? "warning" : "alert";

  const onChangeCheckboxHandler = () => {
    setIsChecked(!isChecked);
    updateCard(!isChecked);
  };
  useEffect(() => {
    setCard(null);
    fetchCard();
  }, [id]);
  return (
    <>
      <Loader isLoading={isCardLoading} />
      {card?.id && (
        <div className={styles.container}>
          <div className={styles.cardLabels}>
            <Badge variant={levelVariant}>Level: {card.level}</Badge>
            <Badge variant={card.completed ? "success" : "alert"}>
              {card.completed ? "Completed" : "Not Completed"}
            </Badge>
            {card?.editDate && <p className={styles.editDate}>Edited: {card.editDate}</p>}
          </div>
          <h5 className={styles.cardTitle}>{card.question}</h5>
          <p className={styles.cardDescription}>{card.description}</p>
          <div className={styles.cardAnswers}>
            <label>short answer: </label>
            <p className={styles.cardAnswer}>{card.answer}</p>
          </div>
          <ul className={styles.cardLinks}>
            Resources:
            {card.resources.map((link, index) => {
              return (
                <li key={index}>
                  <a href={link.trim()} target="_blank" rel="noopener noreferrer">
                    {link.trim()}
                  </a>
                </li>
              );
            })}
          </ul>
          <label htmlFor={checkboxId}>
            <input
              type="checkbox"
              id={checkboxId}
              className={styles.checkbox}
              checked={isChecked}
              onChange={onChangeCheckboxHandler}
              disabled={isCardUpdating}
            />
            <span>mark as completed</span>
          </label>
          <Button isDisabled={isCardUpdating} onClick={() => navigate(`/editquestion/${card.id}`)}>
            Edit Question
          </Button>
          <Button isDisabled={isCardUpdating} onClick={() => navigate("/")}>
            Back
          </Button>
        </div>
      )}
    </>
  );
}

export default QuestionPage;
