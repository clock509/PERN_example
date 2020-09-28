//Context API
import React, { useState, createContext } from "react";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = (props) => {
  //state restaurants 초기화
  const [restaurants, setRestaurants] = useState([]); //여기서는 아무 데이터도 던지지 않으므로 []로 state를 보낸다. //const []!!! 브라켓이 아닌 배열 표기임에 주의하라...(삽질로 1시간 소요)
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  //state restaurants 추가할 때 업데이트
  const addRestaurants = (restaurant) => {
    //새로 Add했을 때 DB에는 들어가지만, 페이지에 보이는 리스트는 업데이트가 안 된다.
    setRestaurants([...restaurants, restaurant]); //기존의 restaurants state에 새 restaurant를 더하여 업데이트 한다.
  };

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
        addRestaurants,
        selectedRestaurant,
        setSelectedRestaurant,
      }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};
