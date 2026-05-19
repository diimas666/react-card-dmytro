import { useState } from "react";
export const useFetch = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFn = async (args) => {
    setIsLoading(true);
    setError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await callback(args);
      return response;
      //   console.log(questions);
    } catch (error) {
      setError("Error fetching questions:", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return [fetchFn, isLoading, error];
};
