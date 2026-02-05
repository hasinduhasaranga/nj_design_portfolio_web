
export interface ContentBlock {
  id: string;
  name: string;
  includeInMenu: boolean;
  includeInBottom: boolean;
  [key: string]: any;
}

export type ContentData = ContentBlock[];
