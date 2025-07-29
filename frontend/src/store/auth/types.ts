export type User = {
  id: string;
  email: string;
  name: string;
};

export type State = {
  loggedIn: boolean;
  loading: boolean;
  error: string | null;
  user: User | null;
};
