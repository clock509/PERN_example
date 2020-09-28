import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import StarRating from "../components/StarRating";
import { RestaurantsContext } from "../context/RestaurantsContext";
import Reviews from "../components/Reviews";
import AddReviews from "../components/AddReviews";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(
    RestaurantsContext
  );

  useEffect(() => {
    //API call
    const fetchData = async () => {
      //async await for API call
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        console.log(response);
        setSelectedRestaurant(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className="text-center display-1">
            {selectedRestaurant.restaurants.name}
          </h1>
          <div className="text-center">
            <StarRating
              rating={selectedRestaurant.restaurants.average_rating}
            />
            <span className="text-warning ml-1">
              {selectedRestaurant.restaurants.count
                ? `(${selectedRestaurant.restaurants.count})`
                : "(0)"}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
          <AddReviews />
        </>
      )}
    </div>
  );
  //selectedRestaurant가 없으면 name값을 띄우지 않는다.
};

export default RestaurantDetailPage;
