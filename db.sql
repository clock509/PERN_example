-- for help \?

-- list database \l

-- Create database CREATE DATABASE database_name

-- list all tables \d

CREATE TABLE products (
  id INT,
  name VARCHAR(50),
  price INT,
  on_sale boolean
);

ALTER TABLE products ADD COLUMN featured boolean;
ALTER TABLE products DROP COLUMN featured;

CREATE TABLE restaurants (
  id BIGSERIAL NOT NULL PRIMARY KEY, -- BIGSERIAL: 자동적으로 ID를 1, 2, 3, ... 부여함
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)
);

INSERT INTO restaurants (id, name, location, price_range) values (123, 'mcdonalds', 'new yorks', 3);

CREATE TABLE reviews (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  restaurant_id BIGINT REFERENCES restaurants(id) ON DELETE CASCADE NOT NULL, -- ON DELETE CASCADE: reviews(restaurant_id)가 restaurand(id)를 참조하므로, restaurand(id)가 삭제될 때 제약조건 위반 오류를 방지하기 위함.
  name VARCHAR(50) NOT NULL,
  review TEXT NOT NULL,
  rating INT NOT NULL check(rating >=1 AND rating <= 5)
);

SELECT name AS username, rating AS restaurant_rating FROM reviews; --결과 리턴 시 name 컬럼명을 usename으로, rating 컬럼명을 restaurant_rating으로 받아보고 싶을 때!
SELECT TRUNC(AVG(RATING), 1) AS average_review FROM reviews; --trunc값의 결과명을 trunc 그대로가 아니라 average_review로 받아보고 싶을 때.

SELECT location, COUNT(location) FROM restaurants GROUP BY location; --지역명 및 그 지역이 restaurants 테이블에 등장한 횟수를 지역명 기준으로 정렬

SELECT restaurant_id, COUNT(restaurant_id) FROM reviews GROUP BY restaurant_id; --레스토랑 id 및 review 테이블에서 등장한 횟수를 id를 기준으로 정렬

