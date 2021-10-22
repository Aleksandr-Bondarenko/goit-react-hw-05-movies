function scrollTo() {
  return document
    .querySelector(".additionalTitle")
    .scrollIntoView({ block: "start", behavior: "smooth" });

  //   return window.scrollTo({
  //     // top: document.documentElement.scrollTop + (window.innerHeight - 80),
  //     top: document.documentElement.scrollTop + window.innerHeight,
  //     behavior: "smooth",
  //   });
}

export default scrollTo;
