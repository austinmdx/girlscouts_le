import Button from "../Button";

const LinkButton = (props) => {
  const { className, href, ...restProps } = props;

  return (
    <a href={href}>
      <Button
        {...restProps}
        className={`${className} buttonOnHover`}
        enableHover={false}
      />
    </a>
  );
};

export default LinkButton;
