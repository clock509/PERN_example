import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import StarRating from "./StarRating";

const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext); //RestaurantsContext.js의 Provider에서 restaurants, setRestaurants라는 value를 전달하고 있다.
  let history = useHistory();
  useEffect(() => {
    //목록에 레스토랑 추가
    const fetchData = async () => {
      //Promise 객체를 받아올 때는 async... await을 써야 한다.
      try {
        const response = await RestaurantFinder.get("/"); //RestaurantFinder의 URL을 기반으로 get해온다. baseURL을 가져오려 할 경우,  무언가를 추가해줄 것이 없으므로 "/"만 적어주면 된다.
        console.log(response.data.data);
        setRestaurants(response.data.data.restaurants);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  //목록에서 레스토랑 삭제
  const handleDelete = async (e, id) => {
    //stopPropagation: Delete 버튼을 눌렀을 때, 그 이벤트가 테이블 행에 전달되지 않게 막는다.
    e.stopPropagation(); //테이블 행 어느 영역을 클릭하더라도 Detail 페이지로 넘어가는 현상 방지(Update, delete 버튼을 눌렀을 때 Update 페이지로 넘어가고, 뒤로 가면 그제서야 Update, delete 페이지가 나옴.)
    try {
      const response = await RestaurantFinder.delete(`/${id}`); //server.js에서 /:id로 적었다고 여기도 /:${id} 로 적었다. ':'는 express에서 하는 것이니 여기서까지 할 필요 없음.
      //console.log(response);
      setRestaurants(
        restaurants.filter((restaurant) => {
          //filter 함수로, parameter로 들어온 id값을 제외한 나머지 레스토랑들로 restaurants state를 업데이트한다.
          return restaurant.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (e, id) => {
    //stopPropagation: Update 버튼을 눌렀을 때, 그 이벤트가 테이블 행에 전달되지 않게 막는다.
    e.stopPropagation(); //테이블 행 어느 영역을 클릭하더라도 Detail 페이지로 넘어가는 현상 방지(Update, delete 버튼을 눌렀을 때 Update 페이지로 넘어가고, 뒤로 가면 그제서야 Update, delete 페이지가 나옴.)
    history.push(`/restaurants/${id}/update`); //개별 상세 페이지로 페이지로 이동
  };

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`);
  };

  const renderRating = (restaurant) => {
    console.log("restaurant: ", restaurant);
    if (!restaurant.count) {
      return <span className="text-warning">0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={restaurant.average_rating} />
        <span className="text-warning ml-1">({restaurant.count})</span>
      </>
    );
  };

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            //restaurants == true일 때 map으로 펼친다. // == false(=Doesn't exist) 일 때는 아무 것도 render하지 않음.
            restaurants &&
              restaurants.map((restaurant) => {
                return (
                  //map에서는 항상 key를 설정해 주자. 그렇지 않으면 Warning(Each child in a list should have a unique "key" prop)이 뜰 수 있다.
                  <tr
                    onClick={() => handleRestaurantSelect(restaurant.id)} //행을 누르면 DetailPage로 넘어감 //여기서 문제가 생김. e.stopPropagation()이 해결법!
                    key={restaurant.id}
                  >
                    <td>{restaurant.name}</td>
                    <td>{restaurant.location}</td>
                    <td>{"$".repeat(restaurant.price_range)}</td>
                    <td>{renderRating(restaurant)}</td>
                    <td>
                      <button
                        onClick={(e) => handleUpdate(e, restaurant.id)}
                        className="btn btn-warning"
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={(e) => handleDelete(e, restaurant.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
          }
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
