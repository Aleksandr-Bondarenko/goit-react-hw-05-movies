import errorImg from "../../images/error-404.png";
import s from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <>
      <img src={errorImg} alt="" className={s.img} />
      <h1 className={s.message}>{"Page not found:("}</h1>;
    </>
  );
}

export default NotFoundPage;
