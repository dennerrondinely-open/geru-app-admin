"use client";

import { doc, deleteDoc, db } from "../firebase";

export function useDeleteDocument(collectionName: string) {
  const deleteDocument = async (id: string) => {
    const ref = doc(db, collectionName, id);
    return deleteDoc(ref);
  };
  return { deleteDocument };
}
