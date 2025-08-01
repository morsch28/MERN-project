import foodImg from "../../images/food.jpg";
import mentalImg from "../../images/nature1.jpg";
import fitnessImg from "../../images/fitness.jpg";
import { useNavigate } from "react-router";

const cardsByCategory = [
  {
    title: "Nutrition Challenges",
    image: foodImg,
    description: "Healthy eating habits and meal planing",
  },
  {
    title: "Mental Challenges",
    image: mentalImg,
    description: "Mindfulness,meditation and stress relief",
  },
  {
    title: "Fitness Challenges",
    image: fitnessImg,
    description: "Exercise routines and physical activities",
  },
];

function CategoryChallenges() {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center my-3 gap-4 flex-column">
      <button
        onClick={() => navigate("/all-challenges")}
        className="btn btn-warning  p-2 fs-5 fw-bold border border-1 border-black btnAllChallenges"
      >
        All challenges
      </button>
      <div className="d-flex gap-4 cardCategories">
        {cardsByCategory.map((card, index) => (
          <div
            className="card justify-content-center  categoryShadow"
            key={index}
            style={{ width: "350px", height: "450px" }}
          >
            <img src={card.image} alt="" className="imgCardCategory" />
            <div className="card-body d-flex flex-column gap-1">
              <p className="card-text descCardsCategory">{card.description}</p>
              <div className="card-footer d-flex justify-content-center">
                <button className="btn btn-primary p-2 btnCategoryCards">
                  {card.title}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryChallenges;
