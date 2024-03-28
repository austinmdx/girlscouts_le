const Button = (props) => {
  const {
    title,
    className,
    titleClassName,
    priority,
    enableHover = true,
    ...restProps
  } = props;

  // style for button variant
  let btnStyle = "";
  switch (priority) {
    case "low":
      btnStyle = `text-primary`;
      break;
    case "normal":
      btnStyle =
        "border border-solid border-green-3 bg-white py-[4px] rounded-[15px] px-3 py-[6px]";
      break;
    default:
      btnStyle = `bg-green-3 rounded-xl py-2 ${
        enableHover ? "hover:bg-green-4" : ""
      }`;
      break;
  }

  let textStyle = "";
  switch (priority) {
    case "low":
      textStyle = `text-black`;
      break;
    case "normal":
      textStyle = "text-black";
      break;
    default:
      textStyle = "text-white";
      break;
  }

  return (
    <button
      className={`text-center text-3xl cursor-pointer disabled:opacity-30 ${btnStyle} ${className}`}
      {...restProps}
    >
      <span
        className={`inline-block relative uppercase ${textStyle} ${titleClassName}`}
      >
        {title}
      </span>
    </button>
  );
};

export default Button;
