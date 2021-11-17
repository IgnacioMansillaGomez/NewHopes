export interface Pet {
  PetName?: string;
  PetSexo?: string;
  especie?: string;
  adoptado?: boolean;
  expanded?: boolean;
  inEdit?: boolean | string;
  locked?: boolean;
}

export interface columnInterface {
  title?: string;
  field?: string;
  show?: boolean;
  filter?: "boolean" | "numeric" | "text" | "date" | undefined;
  minWidth?: number;
  minGridWidth?: number;
  locked?: boolean;
  width?: string | number;
}
