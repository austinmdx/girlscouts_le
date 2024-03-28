import Button from "../../components/base/Button";
import LinkButton from "../../components/base/LinkButton";

const StyleGuide = () => {
  return (
    <div className="p-10 w-full h-full">
      <div className="flex">
        <div className="flex-1 flex flex-col">
          <Button title="Button" className="w-[300px]" />
          <Button title="Button" priority="normal" className="w-[300px] mt-4" />
          <Button title="Button" priority="low" className="w-[300px] mt-4" />
        </div>
        <div className="flex-1">
          <LinkButton title="Button" className="w-[300px]" />
          <LinkButton
            title="Button"
            priority="normal"
            className="w-[300px] mt-4"
          />
          <LinkButton
            title="Button"
            priority="low"
            className="w-[300px] mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default StyleGuide;
