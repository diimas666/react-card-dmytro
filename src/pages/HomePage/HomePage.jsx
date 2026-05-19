import React from "react";
import styles from "./HomePage.module.css";
import { API_URL } from "../../constants";
import { useState, useEffect, useRef } from "react";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../components/SearchInput";
import { useMemo } from "react";
import { Button } from "../../components/Button";
const DEFAULT_PER_PAGE = 10;
function HomePage() {
  const [searchParams, setSearchParams] = useState(
    `?_page=1&_per_page=${DEFAULT_PER_PAGE}`,
  );
  const [questions, setQuestions] = useState({ data: [], pages: 0 });
  const [search, setSearch] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");

  const controlsContainerRef = useRef(null);

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const data = await response.json();
    const totalCount =
      Number(response.headers.get("X-Total-Count")) || data.length;
    const pages = Math.ceil(totalCount / DEFAULT_PER_PAGE);
    setQuestions({ data, pages });
    return { data, pages };
  });
  const activePage = useMemo(() => {
    const params = new URLSearchParams(searchParams.replace(/^\?/, ""));
    return Number(params.get("_page")) || 1;
  }, [searchParams]);
  const cards = useMemo(() => {
    const list = questions?.data ?? [];
    if (search.trim()) {
      return list.filter((card) =>
        card.question.toLowerCase().includes(search.trim().toLowerCase()),
      );
    }
    return list;
  }, [questions, search]);
  const pagination = useMemo(() => {
    const totalPages = questions?.pages || 0;
    return Array(totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }, [questions]);
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

  const paginationHandler = (e) => {
    if (e.target.tagName === "BUTTON") {
      setSearchParams(
        `?_page=${e.target.textContent}&_per_page=${DEFAULT_PER_PAGE}&${sortSelectValue}`,
      );
      controlsContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <div className={styles.controlsContainer} ref={controlsContainerRef}>
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
      {!isLoading && cards.length === 0 && <div>No cards found</div>}
      {!isLoading && cards.length > 0 && pagination.length > 1 && (
        <div className={styles.paginationContainer} onClick={paginationHandler}>
          {pagination.map((value) => (
            <Button isActive={value === activePage} key={value}>
              {value}
            </Button>
          ))}
        </div>
      )}
      {/* <button onClick={getQuestions}>Get Questions</button> */}
    </>
  );
}

export default HomePage;
