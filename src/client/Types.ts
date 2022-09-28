export type QueryData = {
// with keys: query_id, metric_name, http_typ, tags (array of strings), authorization_status, query_data
  query_id: number;
  metric_name: string;
  http_type: string;
  tags: Array<string>;
  authorization_status: string;
  query_data: string;
}

export type QueryCardProps = {
  data: QueryData;
}

export type UserData = {
  authorization_status: string,
  favorites: Array<number>,
  organization: string,
  password: string,
  search_history: Array<number>,
  user_id: number,
  username: string
}

export type LoginProps = {
  updateUserData: (data:UserData) => void
}

export type AppProps = {
  getUserData: () => UserData
}

export type UserContent = {
  userData: UserData,
  setUserData: (data:UserData) => void
}