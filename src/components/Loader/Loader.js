import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import s from "./Loader.module.css";

function Load() {
  return (
    <div className={s.loader}>
      <Loader
        type="Rings"
        color="#00BFFF"
        height={80}
        width={80}
        timeout={8000}
      />
    </div>
  );
}
export default Load;
