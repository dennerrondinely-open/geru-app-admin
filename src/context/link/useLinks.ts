import { useContext } from "react";
import { LinkContext } from "./linkContext";

export const useLinks = () => {
  const context = useContext(LinkContext);
  if (!context) {
    throw new Error("useLinks deve ser usado dentro de um LinkProvider");
  }
  return context;
};
