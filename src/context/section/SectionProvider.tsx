
import { useGetSectionsUseCase } from "use-cases/sections";
import { SectionContext } from ".";

export const SectionProvider = ({ children }: { children: React.ReactNode }) => {
  const { sections, loading } = useGetSectionsUseCase();
  return (
    <SectionContext.Provider value={{ sections, loading }}>
      {children}
    </SectionContext.Provider>
  );
};
