const input = ({ id, text, value, onChangeHandler }) => {
  return (
    <>
      <label htmlFor="">{text}</label>
      <input type="text" id={id} value={value} onChange={onChangeHandler} />
    </>
  );
};

export default input;
