import React from "react";
import styles from "./HomePage.module.css";
import { API_URL } from "../../constants";
import { useState, useEffect } from "react";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../components/SearchInput";
import { useMemo } from "react";
const DEFAULT_PER_PAGE = 10;
function HomePage() {
  const [searchParams, setSearchParams] = useState(
    `?page=1&_per_page=${DEFAULT_PER_PAGE}`,
  );
  const [questions, setQuestions] = useState({});
  const [search, setSearch] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");
  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const questions = await response.json();
    setQuestions(questions);
    return questions;
  });

  const cards = useMemo(() => {
    if (questions?.data) {
      if (search.trim()) {
        return questions.data.filter((card) =>
          card.question.toLowerCase().includes(search.trim().toLowerCase()),
        );
      } else {
        return questions.data;
      }
    }
    return [];
  }, [questions, search]);

  useEffect(() => {
    // getQuestion(`react?${searchParams}`);
    getQuestions(`react${searchParams}`);
  }, [searchParams]);

  const searchValueHandler = (e) => {
    setSearch(e.target.value);
  };

  const onChangeSelectHandler = (e) => {
    setSortSelectValue(e.target.value);
    setSearchParams(`?_page=1&_per_page=${DEFAULT_PER_PAGE}&${e.target.value}`);
  };
  return (
    <>
      <div className={styles.controlsContainer}>
        <SearchInput value={search} onChange={searchValueHandler} />
        {/* controls  */}
        <select
          value={sortSelectValue}
          onChange={onChangeSelectHandler}
          className={styles.select}
        >
          <option value="">Sort By</option>
          <option disabled>────────</option>
          <option value="_sort=level">Level ASC</option>
          <option value="_sort=-level">Level DESC</option>
          <option value="_sort=completed">Completed ASC</option>
          <option value="_sort=-completed">Completed DESC</option>
        </select>
      </div>
      <Loader isLoading={isLoading} />
      {error && <div>{error}</div>}
      <QuestionCardList cards={cards} />
      {cards.length === 0 && <div>No cards found</div>}
      {/* <button onClick={getQuestions}>Get Questions</button> */}
    </>
  );
}

export default HomePage;
