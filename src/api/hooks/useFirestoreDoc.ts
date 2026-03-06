import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

type FirestoreDoc<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function useFirestoreDoc<T>(collection: string, docId?: string) {
  const [state, setState] = useState<FirestoreDoc<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!docId) return;

    const fetchDoc = async () => {
      setState({ data: null, loading: true, error: null });

      try {
        const docRef = doc(db, collection, docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setState({ data: docSnap.data() as T, loading: false, error: null });
        } else {
          setState({
            data: null,
            loading: false,
            error: "Documento não encontrado",
          });
        }
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: (error as Error).message,
        });
      }
    };

    fetchDoc();
  }, [collection, docId]);

  return state;
}
