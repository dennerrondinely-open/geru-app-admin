
import { addDoc, collection, db } from "../firebase";
import type { WithFieldValue } from "../firebase";

export function useAddDocument<T>(collectionName: string) {
  const addDocument = async (data: WithFieldValue<Omit<T, "id">>) => {
    return addDoc(collection(db, collectionName), data);
  };
  return { addDocument };
}
