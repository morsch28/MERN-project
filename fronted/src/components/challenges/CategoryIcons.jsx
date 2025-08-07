function CategoryIcons({ category }) {
  return category == "nutrition" ? (
    <i className="fs-2">🥗</i>
  ) : category == "fitness" ? (
    <i className="fs-2">🏃‍♂️</i>
  ) : (
    <i className="fs-2">🧘‍♀️</i>
  );
}

export default CategoryIcons;
