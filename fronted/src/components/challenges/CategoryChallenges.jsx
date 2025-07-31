import foodImg from "../../images/food.jpg";
import mentalImg from "../../images/nature1.jpg";
import fitnessImg from "../../images/fitness.jpg";

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
  return (
    <div className="d-flex align-items-center gap-3">
      {cardsByCategory.map((card, index) => (
        <div
          className="card"
          key={index}
          style={{ width: "300px", height: "370px" }}
        >
          <img src="" alt="" className="h-50" />
          <div className="card-body d-flex flex-column gap-1">
            <h5 className="card-title">{card.title}</h5>
            <p className="card-text">{card.description}</p>
            <div className="card-footer d-flex justify-content-center">
              <a href="#" className="btn btn-primary">
                Button
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryChallenges;
