import React, { useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useHistory, useLocation, useParams } from "react-router-dom";

const AddReviews = () => {
  const { id } = useParams(); //식당 id 받아오기
  const location = useLocation(); //리로딩 할 URL 주소 받아오기 위함
  console.log(location); //리뷰 남기는 현재의 URL 주소가 담김(location.pathname == /restaurants/id)
  const history = useHistory(); //리뷰 게시 후 리로딩하기 위함

  console.log(id);
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");

  const handleSubmitReview = async (e) => {
    e.preventDefault(); //이벤트 발생 시 페이지 자동 리로딩 방지
    try {
      const response = await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      });
      history.push("/");
      history.push(location.pathname); //Trick: 예상과 달리, history.push(location.pathname); 만 있으면 페이지가 되돌아오지 않는다. 따라서 리뷰 제출 시 홈화면으로 이동했다가 재빨리 상세 페이지로 돌아오게 한다.
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mb-2">
      <form action="">
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="name"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              id="rating"
              className="custom-select"
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="Review">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            id="Review"
            className="form-control"
          ></textarea>
        </div>
        <button
          type="submit"
          onClick={handleSubmitReview}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReviews;
