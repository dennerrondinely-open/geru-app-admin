import type { Section } from "domains/section";

export interface SectionContextProps {
  sections: Section[];
  loading?: boolean;
  addSection: (section: Section) => Promise<void>;
}