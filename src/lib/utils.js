import { LS_VALUE } from "../lib/api";

const updateTextSummaryLS = (textSummary, docId) => {
  const data = JSON.parse(localStorage.getItem(LS_VALUE));
  const updatedData = data.map((item) => {
    if (item.id === docId) {
      item.summary = textSummary;
    }
    return item;
  });

  localStorage.setItem(LS_VALUE, JSON.stringify(updatedData));
};

export const updateLSForSummary = (textSummary, docId) => {
  updateTextSummaryLS(textSummary, docId);
};
