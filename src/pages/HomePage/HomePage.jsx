import React from "react";
import styles from "./HomePage.module.css";
import { API_URL } from "../../constants";
import { useState, useEffect, useRef } from "react";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { useFetch, parseJsonResponse } from "../../hooks/useFetch";
import { SearchInput } from "../../components/SearchInput";
import { useMemo } from "react";
import { Button } from "../../components/Button";
const DEFAULT_PER_PAGE = 10;
function HomePage() {
  const [searchParams, setSearchParams] = useState(
    `?_page=1&_limit=${DEFAULT_PER_PAGE}`,
  );
  const [questions, setQuestions] = useState({ data: [], pages: 0 });
  const [search, setSearch] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");
  const [countSelectValue, setCountSelectValue] = useState(DEFAULT_PER_PAGE);
  const controlsContainerRef = useRef(null);

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const data = await parseJsonResponse(response);
    const totalCount =
      Number(response.headers.get("X-Total-Count")) || data.length;
    const params = new URLSearchParams(url.split("?")[1] || "");
    const perPage = Number(params.get("_limit")) || DEFAULT_PER_PAGE;
    const pages = Math.ceil(totalCount / perPage);
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
    setSearchParams(`?_page=1&_limit=${countSelectValue}&${e.target.value}`);
  };

  const paginationHandler = (e) => {
    if (e.target.tagName === "BUTTON") {
      setSearchParams(
        `?_page=${e.target.textContent}&_limit=${countSelectValue}&${sortSelectValue}`,
      );
      controlsContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const onCountSelectChangeHandler = (e) => {
    setCountSelectValue(e.target.value);
    setSearchParams(`?_page=1&_limit=${e.target.value}&${sortSelectValue}`);
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

        <select
          value={countSelectValue}
          onChange={onCountSelectChangeHandler}
          className={styles.select}
        >
          <option disabled>count</option>
          <option disabled>────────</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="100">100</option>
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
