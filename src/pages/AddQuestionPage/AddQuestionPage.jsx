import styles from "./AddQuestionPage.module.css";
import { Button } from "../../components/Button";
import { useActionState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../../constants";
import { parseJsonResponse } from "../../hooks/useFetch";

const createCardAction = async (_prevState, formData) => {
  try {
    const resourcesRaw = formData.get("resources")?.toString() ?? "";
    const response = await fetch(`${API_URL}/react`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: formData.get("question"),
        answer: formData.get("answer"),
        description: formData.get("description"),
        resources: resourcesRaw
          .split(",")
          .map((link) => link.trim())
          .filter(Boolean),
        level: Number(formData.get("level")),
        completed: false,
      }),
    });
    const question = await parseJsonResponse(response);
    toast.success(`Question ${question.question} added successfully`);
    return { clearForm: false };
  } catch (error) {
    toast.error(error.message);
  }
};
function AddQuestionPage() {
  const [formState, formAction, isPending] = useActionState(createCardAction, { clearForm: true });
  return (
    <>
      <h1 className={styles.formTitle}>Add new Question</h1>
      <div className={styles.formContainer}>
        <form action={formAction} className={styles.form}>
          <div className={styles.formControl}>
            <label htmlFor="questionField">Question:</label>
            <textarea
              defaultValue={formState.question}
              name="question"
              id="questionField"
              cols="30"
              rows="2"
              required
              placeholder="Enter your question"
            ></textarea>
          </div>

          <div className={styles.formControl}>
            <label htmlFor="answerField">Short answer:</label>
            <textarea
              defaultValue={formState.answer}
              name="answer"
              id="answerField"
              cols="30"
              rows="2"
              required
              placeholder="Enter your short answer"
            ></textarea>
          </div>

          <div className={styles.formControl}>
            <label htmlFor="answerField">Description:</label>
            <textarea
              defaultValue={formState.description}
              name="description"
              id="descriptionField"
              cols="30"
              rows="5"
              required
              placeholder="Enter your full description"
            ></textarea>
          </div>

          <div className={styles.formControl}>
            <label htmlFor="resourcesField">Resources:</label>
            <textarea
              defaultValue={formState.resources}
              name="resources"
              id="resourcesField"
              cols="30"
              rows="5"
              required
              placeholder="Enter your resources separated be commas "
            ></textarea>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="levelsField">Level:</label>
            <select defaultValue={formState.level ?? "1"} name="level" id="levelsField" required>
              <option disabled value="">
                Question level
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <label htmlFor="clearFormField" className={styles.clearFormControl}>
            <input
              className={styles.checkbox}
              type="checkbox"
              name="clearForm"
              id="clearFormField"
              defaultChecked={formState.clearForm}
            />
            <span>Clear form ?</span>
          </label>

          <Button isDisabled={isPending} type="submit">
            {isPending ? "Adding..." : "Add Question"}
          </Button>
        </form>
      </div>
    </>
  );
}

export default AddQuestionPage;
