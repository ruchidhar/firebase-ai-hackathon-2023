import React from "react";
import { useLoading } from "../context/loadingContext";

const LoadingIndicator = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="flex justify-center items-center">
      <div className="loading"></div>
    </div>
  );
};

export default LoadingIndicator;
