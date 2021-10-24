import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import scrollTo from "../../js/scrollTo";
import * as MovieInfoApi from "../../services/movies-info-api";
import s from "./Reviews.module.css";

function Reviews({ movieId }) {
  const [reviewsData, setReviewsData] = useState(null);

  useEffect(() => {
    MovieInfoApi.getMovieReviews(movieId).then((data) => {
      setReviewsData(data.results);
      scrollTo();
    });
  }, [movieId]);

  return reviewsData && reviewsData.length !== 0 ? (
    <ul className={`${s.list} toScroll`}>
      {reviewsData.map((reviewsItem) => (
        <li key={reviewsItem.id} className={s.item}>
          <p className={s.author}>Author: {reviewsItem.author}</p>
          <p className={s.content}>{reviewsItem.content}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p className={`${s.message} toScroll`}>
      We dont have any reviews for this movie.
    </p>
  );
}

export default Reviews;

Reviews.propTypes = {
  movieId: PropTypes.string,
};
