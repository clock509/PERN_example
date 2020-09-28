//Express 서버
require("dotenv").config(); //환경변수 관리 모듈
const express = require("express");
const morgan = require("morgan");
const db = require("./db"); //db객체: db 디렉터리 불러오기
const app = express(); //app이라는 express 인스턴스 생성
const cors = require("cors");

app.use(cors()); //When CORS error Let express() allow to accept the request from ohter domain(=서로 다른 두 domain의 통신 허용)
app.use(express.json());
//미들웨어 route-handler
//미들웨어가 API보다 상단에 올 수 있게 코드를 작성하라. 코드는 Top -> bottom으로 진행되기 때문에, 미들웨어가 중간에 있으면 인식되지 못할 수도 있다.
/*
app.use((req, res, next) => { //next function: 미들웨어가 다른 미들웨어나 마지막 route handler에 요청을 보내게끔 함.
  res.status(404).json({
    status: 'fail',
  })
  //next()
});
*/

//Morgan이라는 third-party 미들웨어를 사용하면 위와 같이 작성하지 않아도 된다.
//npm i morgan

//Get all Restaurants
app.get("/api/v1/restaurants", async (request, response) => {
  //http(s)://localhost:3001/getRestaurants
  //async...await에서는 항상 try..catch문을 써 주어야 한다(UnhandledPromise 에러 방지!!!).
  try {
    //const results = await db.query("SELECT * FROM restaurants;");
    const restaurantRatingsData = await db.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;"
    );
    //console.log("results: ", results);
    console.log("restaurantRatingsData: ", restaurantRatingsData);

    response.status(200).json({
      status: "success",
      results: restaurantRatingsData.rows.length,
      data: {
        restaurants: restaurantRatingsData.rows, //results.rows
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a Restaurant
app.get("/api/v1/restaurants/:id", async (request, response) => {
  //ex. http://localhost:3001/api/v1/restaurants/1234
  try {
    const restaurant = await db.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id where id=$1;",
      [request.params.id]
    ); //[]가 $1, $2를 대체함.
    //`SELECT * FROM restaurants WHERE id=${request.params.id};` 으로 할 수 있는데, SQL injection 에러를 유발할 수 있으니 비추함.

    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id=$1",
      [request.params.id]
    );

    response.status(200).json({
      status: "success",
      data: {
        restaurants: restaurant.rows[0], //하나의 결과만 가져오므로 [0]을 써서 값을 꺼낸다.
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }

  //console.log(request.params.id); //:restaurantId ==> 'params' of request object
});

//app.get("/api/v1/restaurants/:id/reviews", () => {});

//Create a restaurant
app.post("/api/v1/restaurants", async (request, response) => {
  try {
    //console.log(request.body); //데이터가 보이지 않는다? ==> 미들웨어 필요
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values($1, $2, $3) returning *",
      [request.body.name, request.body.location, request.body.price_range]
    );

    response.status(201).json({
      status: "success",
      data: {
        restaurants: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Update restaurants
app.put("/api/v1/restaurants/:id", async (request, response) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning * ",
      [
        request.body.name,
        request.body.location,
        request.body.price_range,
        request.params.id,
      ]
    );

    response.status(200).json({
      status: "success",
      data: {
        restaurants: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Delete restaurants
app.delete("/api/v1/restaurants/:id", async (request, response) => {
  console.log("Delete req:", request);
  try {
    const results = await db.query(
      // returning * 는 할 필요 없음. 삭제되었기 때문에 보여줄 것이 없다.
      "DELETE FROM restaurants WHERE id= $1",
      //"DELETE FROM restaurants A reviews B WHERE A.id=B.restaurant_id"
      [request.params.id]
    );

    response.status(204).json({
      status: "success",
    }); //Don't return restaurant name because I deleted it.
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) values($1, $2, $3, $4) returning *;",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3001; //.env의 PORT의 value //PORT value가 정의되지 않았을 때 3001 포트 사용
app.listen(port, () => {
  //Listens to 'port' port. 리액트 앱이 3000이므로 다른 포트 사용.
  console.log(`Server is up and listening on port ${port}`);
});
