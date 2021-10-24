function scrollTo() {
  return document
    .querySelector(".toScroll")
    .scrollIntoView({ block: "start", behavior: "smooth" });
}

export default scrollTo;
