import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const UpdateRestaurant = (props) => {
  const { id } = useParams();
  let history = useHistory(); // 업데이트 성공 후 Home 화면으로 돌아가게 한다.
  const { restaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      console.log(response.data.data);
      //input field 기본값으로 원래 name, location, price_range value를 둠. //이후 밑에 있는 <input> 태그의 value를 각각 추가해준다.
      setName(response.data.data.restaurants.name);
      setLocation(response.data.data.restaurants.location);
      setPriceRange(response.data.data.restaurants.price_range);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); //submit 시 브라우저의 default reloading 방지
    const UpdateRestaurant = await RestaurantFinder.put(`/${id}`, {
      name: name,
      location: location,
      price_range: priceRange,
    });
    console.log(UpdateRestaurant);
    history.push("/"); //홈 화면으로 복귀
  };
  return (
    <div>
      {/* 컴포넌트 최상단에 점포명 표시 */}
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="form-control"
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            className="form-control"
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price_range">Price range</label>
          <input
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            id="price_range"
            className="form-control"
            type="number"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit} //() => 를 넣어줄 필요가 없다. 넣으면 함수에 반응을 안 한다. handleSubmit()에 넘기는 게 없어서 그런가...
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
