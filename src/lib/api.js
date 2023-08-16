import {
  collection,
  addDoc,
  setDoc,
  doc,
  onSnapshot,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { database, storage } from "../lib/firebase.config";
import { v4 as uuidv4 } from "uuid";
import { updateLSForSummary } from "../lib/utils";
import { ref, listAll, uploadBytes, getDownloadURL } from "firebase/storage";

export const TEXT_DB_NAME = "text_documents";
const IMAGE_DB_NAME = "extractedText";
export const LS_VALUE = "userInputText";
export const DOC_SUMMARY_STATUS = "COMPLETED";
const BUCKET_PATH = "users/uploads/";

/**
 * Inserts summary of the text.
 *
 * @param {text} string The input text
 * @returns The firestore document id
 */
const insertSummaryPrompt = async (text) => {
  try {
    const newDocId = uuidv4();
    // const textDocCol = collection(database, "text_documents");
    const textDocRef = doc(database, TEXT_DB_NAME, newDocId);

    await setDoc(textDocRef, {
      text: text,
      id: newDocId,
    });

    return textDocRef.id;
  } catch (error) {
    console.error("insertSummaryPrompt error", error);
  }
};

/**
 * Gets summary of the image.
 *
 * @param {filePath} string The file path which was uploaded
 * @returns The extracted text from the document
 */
const fetchImageText = async (filePath) => {
  try {
    const imageColRef = collection(database, IMAGE_DB_NAME);
    const q = query(imageColRef, where("file", "==", filePath));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const dataArray = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        dataArray.push(data);
      });

      return dataArray;
    }

    return [];
  } catch (error) {
    console.error("fetchImageText error", error);
  }
};

/**
 * Listens to the summary of the text.
 *
 * @param {docId} string The document Id
 * @returns The generated summary
 */
const listenToTextSummary = async (docId, callback) => {
  try {
    const unsub = onSnapshot(doc(database, TEXT_DB_NAME, docId), (doc) => {
      const data = doc.data();
      const status = data.status;

      if (status && status.state == DOC_SUMMARY_STATUS) {
        unsub();
        updateLSForSummary(data.summary, docId);
        callback(data);
      } else {
        console.log("in process for", docId);
      }
    });
  } catch (error) {
    console.error("listenToTextSummary error", error);
  }
};

/**
 * Uploads image to the storage
 *
 * @param {file} string The file to upload
 * @returns The uploaded bucket path
 */
const uploadImageToBucket = async (file) => {
  try {
    const fileName = file["name"];
    const url = BUCKET_PATH + fileName;

    const listRef = ref(storage, `${url}`);
    const resp = await uploadBytes(listRef, file);

    const downloadUrl = await getDownloadURL(resp.ref);
    const storagePath = resp.ref._location;
    return {
      downloadUrl: downloadUrl,
      fileRef: storagePath,
    };
  } catch (error) {
    console.error("uploadImageToBucket error", error);
  }
};

export const callGetSummary = async (inputSummary) => {
  try {
    const docId = await insertSummaryPrompt(inputSummary);

    if (docId && typeof docId === "string" && docId.trim() !== "") {
      return docId;
    }
  } catch (error) {
    console.error("callGetSummary error", error);
  }
};

export const listenToSummary = async (docId, callback) => {
  try {
    await listenToTextSummary(docId, callback);
  } catch (error) {
    console.error("listenToSummary error", error);
  }
};

export const uploadToBucket = async (file) => {
  try {
    const data = await uploadImageToBucket(file);

    if (data) {
      return data;
    }
  } catch (error) {
    console.error("uploadToBucket error", error);
  }
};

export const extractedTextFromImage = async (filePath) => {
  try {
    return await fetchImageText(filePath);
  } catch (error) {
    console.error("extractedTextFromImage error", error);
  }
};

export const getBucketFilePath = (data) => {
  const bucket = data.fileRef.bucket;
  const path = data.fileRef.path_;

  const combinedPath = `gs://${bucket}/${path}`;
  return combinedPath;
};



