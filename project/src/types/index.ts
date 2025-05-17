export interface Color {
  id: string;
  hex: string;
  locked: boolean;
}

export interface Palette {
  colors: Color[];
}