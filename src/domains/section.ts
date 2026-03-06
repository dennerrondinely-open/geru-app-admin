export interface Section {
  id: string;
  active: boolean;
  name: string;
  preTitle: string;
  title: string;
  message: string;
  backgroundLink: string;
  buttonText: string;
  buttonLink: string;
  buttonType: "contained" | "outlined";
}
