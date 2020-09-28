import React, { useState, useContext } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {
  const { addRestaurants } = useContext(RestaurantsContext); //새로 Add했을 때 DB에는 들어가지만, 페이지에 보이는 리스트는 업데이트가 안 된다.
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  const handleSubmit = async (e) => {
    //Don't reload page. It leads me to lose my state. But HTML reloads automatically.
    e.preventDefault() //Prevents my page from automatic reload.
    try {
      //.post(URL, body)
      const response = await RestaurantFinder.post("/", {
        name: name,
        location: location,
        price_range: priceRange
      }) //Create 명령은 /api/v1/restaurants이고, baseURL이 이미 그것이기 때문에 "/"까지만 적는 게 맞다.
      addRestaurants(response.data.data.restaurants); //restaurant로 s를 빼먹어서 Error가 났다. server.js에서 post 메서드에 "restaurants"로 정했기 때문에, response에서도 그 이름으로 데이터가 들어간다. 
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="name" />
          </div>
          <div className="col">
            <input
              value={location}
              onChange={e => setLocation(e.target.value)}
              type="text"
              className="form-control"
              placeholder="location" />
          </div>
          <div className="col">
            <select
              value={priceRange}
              onChange={e => setPriceRange(e.target.value)}
              className="custom-select my-1 mr-sm2">
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary">Add</button>
        </div>
      </form>
    </div >
  )
}

export default AddRestaurant;