import { Modal } from "react-bootstrap";
function TriviaModal({ onShow, onClose, question, onAnswer, correct, wrong }) {
  return (
    <Modal show={onShow} onHide={onClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Trivia Question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {question && (
          <div className="w-100 d-flex flex-column gap-5">
            <h2 className="fs-1 text-center">{question?.question}</h2>
            <div
              style={{ gridTemplateColumns: "1fr 1fr" }}
              className="d-grid gap-0 column-gap-3 row-gap-3"
            >
              {question?.answers.slice(0, 4).map((answers, index) => (
                <button
                  key={index}
                  className={`p-3 fs-3 bg-transparent rounded-3 ${
                    wrong == index
                      ? "border border-5 border-danger"
                      : correct == index
                      ? "border border-5 border-success"
                      : ""
                  }`}
                  onClick={() => onAnswer(question._id, index)}
                >
                  {answers}
                </button>
              ))}
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default TriviaModal;
