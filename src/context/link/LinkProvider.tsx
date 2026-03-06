import { useGetLinksUseCase } from "use-cases/links";
import { LinkContext } from "./linkContext";

export const LinkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { links, loading } = useGetLinksUseCase();

  return (
    <LinkContext.Provider value={{ links, loading }}>
      {children}
    </LinkContext.Provider>
  );
};
