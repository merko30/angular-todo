export type Tag = {
  id: number;
  name: string;
};

export type Comment = {
  id: number;
  text: string;
};

export type Post = {
  id: string;
  title: string;
  body: string;
  subtitle: string | null;
  slug: string;
  tags: { tag: Tag }[];
  comments?: Comment[];
};
