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