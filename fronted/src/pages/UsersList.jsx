function UsersList() {
  const users = [
    {
      id: 1,
      name: "נועה כהן",
      age: 29,
      image: "https://i.pravatar.cc/150?img=1",
      bio: "אוהבת ריצה ובישול בריא",
    },
    {
      id: 2,
      name: "דניאל לוי",
      age: 34,
      image: "https://i.pravatar.cc/150?img=2",
      bio: "מטייל המון בארץ, מאמן כושר",
    },
  ];
  return (
    <div className="container custom-list text-center border border-3 w-50 mb-5 d-flex flex-column gap-3">
      <h2 className="mt-4">Online Users</h2>
      <div className="row row-cols-1 g-3 w-75 mx-auto">
        {users.map((user) => (
          <div className="col" key={user.id}>
            <div className="d-flex align-items-center border rounded p-3 shadow-sm bg-light gap-5 justify-content-center">
              <img
                src={user.image}
                alt={user.name}
                className="rounded-circled"
                style={{ width: "60px", height: "60px" }}
              />
              <div className="d-flex flex-column">
                <h5 className="mb-1">{user.name}</h5>
                <div className="mb-1">age: {user.age}</div>
                <p>{user.bio}</p>
              </div>
              <button
                className="btn btn-success p-0"
                style={{ width: "20px", height: "20px", borderRadius: "100%" }}
              ></button>
              <button className="bg-transparent border-0 fs-5">
                <i class="bi bi-heart-fill"></i>
              </button>
              <button className="bg-transparent border-0 fs-5">
                <i class="bi bi-chat-dots"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersList;
