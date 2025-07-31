export type Tag = {
  id: number | string;
  name: string;
};

export type Post = {
  id: number;
  title: string;
  body: string;
  tags: { tag: Tag }[];
};
