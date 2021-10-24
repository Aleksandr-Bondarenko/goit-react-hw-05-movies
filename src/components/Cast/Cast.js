import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as MovieInfoApi from "../../services/movies-info-api";
import scrollTo from "../../js/scrollTo";
import unknownCast from "../../images/unknown-cast.jpg";
import s from "./Cast.module.css";

function Cast({ movieId, url }) {
  const [castData, setCastData] = useState(null);

  useEffect(() => {
    MovieInfoApi.getMovieCast(movieId).then((data) => {
      setCastData(data.cast);
      scrollTo();
    });
  }, [movieId]);

  return castData && castData.length !== 0 ? (
    <div className={`${s.listBox} toScroll`}>
      <ul className={s.list}>
        {castData.map((castItem) => {
          return (
            <li key={castItem.id} className={s.item}>
              <img
                src={
                  castItem.profile_path
                    ? `${url}${castItem.profile_path}`
                    : unknownCast
                }
                alt={castItem.name}
                width={!castItem.profile_path ? 185 : null}
              />
              <h3 className={s.name}>{castItem.name}</h3>
              <p className={s.character}>Character: {castItem.character}</p>
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <p className={`${s.message} toScroll`}>No cast details for this movie.</p>
  );
}

export default Cast;

Cast.propTypes = {
  movieId: PropTypes.string,
  url: PropTypes.string,
};
