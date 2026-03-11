
import { useEffect, useState } from "react";
import { doc, onSnapshot, db } from "../firebase";

export function useFirestoreDoc<T extends { id: string }>(
  collectionName: string,
  id?: string
) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const ref = doc(db, collectionName, id);
    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setData({ id: snap.id, ...snap.data() } as T);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [collectionName, id]);

  return { data, loading };
}
