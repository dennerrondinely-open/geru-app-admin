import {
  useAddSectionUseCase,
  useGetSectionsUseCase,
} from "use-cases/sections";
import { SectionContext } from "./sectionContext";
import type { Section } from "domains/section";

export const SectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { sections, loading } = useGetSectionsUseCase();
  const { addSection } = useAddSectionUseCase();

  const addSectionHandler = async (section: Section) => {
    await addSection(section);
  };

  return (
    <SectionContext.Provider value={{ sections, loading, addSection: addSectionHandler }}>
      {children}
    </SectionContext.Provider>
  );
};
