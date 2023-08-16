import { doc, onSnapshot } from "firebase/firestore";

import { database } from "../../lib/firebase.config";
import { useState, useEffect } from "react";

import { DOC_SUMMARY_STATUS, TEXT_DB_NAME } from "../../lib/api";
import LoadingIndicator from "../../components/loader/loadingComponent";
import { useLoading } from "../context/loadingContext";
import { copy, download, tick } from "../../assets";

const DocumentChangesListener = ({ documentId }) => {
  const [documentData, setDocumentData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const { setIsLoading } = useLoading();
  const [copied, setCopied] = useState("");

  useEffect(() => {
    if (documentId) {
      const docRef = doc(database, TEXT_DB_NAME, documentId);

      const unsubscribe = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          const status = data.status;

          if (status && status.state == DOC_SUMMARY_STATUS) {
            setDocumentData(data);
            const filteredData = { ...data };
            delete filteredData.id;
            delete filteredData.status;

            setFilteredData(filteredData);
            setIsLoading(false);
          }
        } else {
          setDocumentData(null);
          setIsLoading(false);
        }
      });

      return () => unsubscribe();
    }
  }, [documentId]);

  const handleCopy = (data) => {
    const textToCopy = data.summary;
    setCopied(textToCopy);
    navigator.clipboard.writeText(textToCopy);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleDownload = (text) => {
    const element = document.createElement("a");
    const file = new Blob([text.summary], { type: "text/plain" });
    element.href = URL.createObjectURL(file);

    const currentTimestamp = new Date().toISOString();
    element.download = `${currentTimestamp}.txt`;

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section>
      <LoadingIndicator />
      <div className="my-6 max-w-4xl justify-center items-center relative">
        {filteredData ? (
          <div className="flex flex-col gap-3">
            <div className="summary_box card-body flex overflow-hidden">
              <h3 className="text-xl font-bold mb-2 text-blue-600 font-mono">
                Summary
              </h3>
              <pre className="font-medium text-sm text-gray-700 break-all whitespace-pre-wrap">
                {filteredData.summary}
              </pre>

              <h4 className="text-xl font-bold mb-2 mt-5 text-blue-500 font-mono">
                Input Text
              </h4>
              <pre className="font-medium text-sm text-gray-700 break-all whitespace-pre-wrap">
                {filteredData.text}
              </pre>
            </div>
          </div>
        ) : null}
        {filteredData ? (
          <div className="absolute top-0 right-0 m-2 flex space-x-2">
            <div className="copy_btn" onClick={() => handleCopy(filteredData)}>
              <img
                src={copied === filteredData ? tick : copy}
                alt="my_icon"
                className="w-[40%] h-[40%] object-contain"
              />
            </div>
            <div
              className="copy_btn"
              onClick={() => handleDownload(filteredData)}
            >
              <img
                src={download}
                alt="my_icon"
                className="w-[40%] h-[40%] object-contain"
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default DocumentChangesListener;
