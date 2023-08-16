import React from "react";

import TopSection from "./top_section";
import TextSummarize from "./text_summarize";

const home = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>

      <div className="app">
        <TopSection />
        <TextSummarize />
      </div>
    </main>
  );
};

export default home;
