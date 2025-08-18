function CommentsList({
  comments,
  onDelete,
  onStart,
  onSave,
  commentToEdit,
  challenge,
}) {
  const buildImageUrl = (path) => {
    if (!path) {
      return null;
    }
    return `http://localhost:3000${path}`;
  };
  return (
    <div
      className="d-flex flex-column gap-2"
      style={{ maxHeight: 300, overflowY: "auto" }}
    >
      {comments.length == 0 && <div>No Comment Yet</div>}
      {comments.map((comment) => {
        const user = comment?.userId;
        const userImg = buildImageUrl(user?.image?.url);
        const fullName = `${user?.name?.first} ${user?.name?.last}`;

        return (
          <div
            key={comment._id}
            className="d-flex gap-2 border border-bottom p-2 align-items-center"
          >
            {userImg ? (
              <img src={userImg} alt={fullName} className="comment-userImg" />
            ) : (
              <img
                src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
                className="comment-img"
              />
            )}
            <div className="d-flex flex-column">
              <div className="fw-bold">{fullName}</div>
              <div id={`update-${comment._id}`}>{comment.text}</div>
            </div>
            <div className="d-flex gap-2 ms-auto">
              {/* delete button */}
              <button
                onClick={() => onDelete(challenge._id, comment._id)}
                className="border border-danger text-danger"
              >
                <i className="bi bi-trash3"></i>
              </button>
              {/* edit button  */}
              <button onClick={() => onStart(comment._id)}>
                <i className="bi bi-pencil"></i>
              </button>
              {/* save button */}
              {commentToEdit == comment._id && (
                <button
                  onClick={() => onSave(comment._id)}
                  className="border border-success text-success"
                >
                  <i className="bi bi-box-arrow-down"></i>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CommentsList;
