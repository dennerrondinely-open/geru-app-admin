"use client";

import { useGetLinksUseCase } from "use-cases/links";
import { LinkContext } from ".";

export const LinkProvider = ({ children }: { children: React.ReactNode }) => {
  const { links, loading } = useGetLinksUseCase();
  return (
    <LinkContext.Provider value={{ links, loading }}>
      {children}
    </LinkContext.Provider>
  );
};
