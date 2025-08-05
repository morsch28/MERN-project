function OptionSelector({ options = [], onSelected, selected }) {
  return (
    <div className="d-flex gap-3 justify-content-center rounded-2 border-1 p-2 border border-1 border-dark bg-white ">
      {options.map((option) => (
        <button
          key={option}
          className={`${
            selected === option ? "btn btn-info" : "btn btn-outline-dark"
          } `}
          onClick={() => onSelected(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default OptionSelector;
