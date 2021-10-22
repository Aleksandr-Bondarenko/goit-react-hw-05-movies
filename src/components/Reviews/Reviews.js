import { useState, useEffect } from "react";
import scrollTo from "../../js/scrollTo";
import * as MovieInfoApi from "../../services/movies-info-api";

function Reviews({ movieId }) {
  const [reviewsData, setReviewsData] = useState(null);

  useEffect(() => {
    MovieInfoApi.getMovieReviews(movieId).then((data) => {
      console.log(data.results);
      setReviewsData(data.results);
      // scrollTo();
    });
  }, [movieId]);

  return reviewsData && reviewsData.length !== 0 ? (
    <ul>
      {reviewsData.map((reviewsItem) => (
        <li key={reviewsItem.id}>
          <p>Author: {reviewsItem.author}</p>
          <p>{reviewsItem.content}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p>We dont have any reviews for this movie.</p>
  );
}

export default Reviews;
