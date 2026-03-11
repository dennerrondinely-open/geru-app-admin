
import { doc, updateDoc, db } from "../firebase";

export function useUpdateDocument<T extends { id: string }>(collectionName: string) {
  const updateDocument = async (id: string, data: Partial<Omit<T, "id">>) => {
    const ref = doc(db, collectionName, id);
    return updateDoc(ref, data as Record<string, unknown>);
  };
  return { updateDocument };
}
