import { useState, useEffect } from "react";
import * as MovieInfoApi from "../../services/movies-info-api";
import scrollTo from "../../js/scrollTo";
import unknownCast from "../../images/unknown-cast.jpg";

function Cast({ movieId, url }) {
  const [castData, setCastData] = useState(null);

  useEffect(() => {
    MovieInfoApi.getMovieCast(movieId).then((data) => {
      setCastData(data.cast);
      // scrollTo();
    });
  }, [movieId]);

  return (
    castData && (
      <ul>
        {castData.map((castItem) => {
          return (
            <li key={castItem.id}>
              <h3>{castItem.name}</h3>
              {/* <img src={`${url}${castItem.profile_path}`} alt="" /> */}
              <img
                src={
                  castItem.profile_path
                    ? `${url}${castItem.profile_path}`
                    : unknownCast
                }
                alt={castItem.name}
                width={!castItem.profile_path ? 45 : null}
              />
              <p>Character: {castItem.character}</p>
            </li>
          );
        })}
      </ul>
    )
  );
}

export default Cast;
