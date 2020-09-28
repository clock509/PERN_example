import React from "react";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i key={i} className="fas fa-star text-warning"></i>); //text-warning: 노란 글씨
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      //평점이 소수점일 때는 별 반 개
      // Math.ceil(rating): 소수점 이하 버림
      stars.push(<i key={i} className="fas fa-star-half-alt text-warning"></i>);
    } else {
      stars.push(<i key={i} className="far fa-star text-warning"></i>); //text-warning: 노란 글씨
    }
  }
  return <>{stars}</>;
};

export default StarRating;
