CREATE TABLE queries (
  query_id int UNIQUE,
  metric_name VARCHAR(255),
  http_type VARCHAR(50),
  tags VARCHAR(50) ARRAY,
  authorization VARCHAR(50),
  query_data VARCHAR(65535)
);

CREATE TABLE user_data (
  user_id INT UNIQUE,
  username VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  organization VARCHAR,
  authorization_status VARCHAR,
  favorites INT ARRAY,
  search_history INT ARRAY
);


SELECT * FROM queries;

INSERT INTO queries (
  query_id,
  metric_name,
  http_type,
  tags,
  authorization_status,
  query_data
  )
  VALUES (
    0,
    'All sales',
    'GET',
    ARRAY ['sales','orders','accounting'],
    'admin',
    'SELECT * FROM sales;'
  );

  INSERT INTO user_data (
    user_id, 
    username, 
    password, 
    organization, 
    authorization_status, 
    favorites, 
    search_history
    )
  VALUES ( 
    654321, 
    'username1', 
    'password1', 
    'organization1', 
    'admin', 
     ARRAY [2345], 
     ARRAY [2345]
  );

  INSERT INTO user_data (
      user_id, 
      username, 
      password, 
      organization 
      )
    VALUES (
      888,
      'usernametest',
      'passtest',
      'SQLizer'
    );


SELECT Q.* , U.username, U.user_id, U.authorization_status
FROM queries Q
LEFT JOIN user_data U
ON Q.query_id = ANY(U.favorites)
;

SELECT U.username, U.authorization_status, U.favorites, U.search_history 
FROM user_data U
WHERE U.username = 'admin_user'
;

SELECT U.username, U.authorization_status, U.favorites, U.search_history 
FROM user_data U
WHERE U.username = 'user_user'
;

SELECT ARRAY_AGG(c)
FROM (
  SELECT unnest(queries.tags)
  FROM queries
)
AS dt(c)
;


