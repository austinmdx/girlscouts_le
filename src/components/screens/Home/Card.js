import LinkButton from "../../base/LinkButton";
import { FormattedMessage } from "react-intl";

const HomeCard = ({ item }) => {
  return (
    <div className={`${item.backgroundColor} rounded-2xl p-5`}>
      <div className="text-white h-[68px] mb-1 text-2xl text-center font-bold line-clamp-2">
        <FormattedMessage id={item.title} />
      </div>
      <div className="px-5">
        <img
          src={item.image}
          alt="girlscouts"
          className="w-full aspect-square object-cover"
        />
      </div>
      <div className="text-white text-center line-clamp-3 h-[72px] my-3">
        {item.description && <FormattedMessage id={item.description} />}
      </div>
      <LinkButton
        title={<FormattedMessage id={item.linkText ? item.linkText : 'get_started'} />}
        className={`${item.buttonColor} w-full text-xl`}
        href={`/get-involved/${item.id}`}
      />
    </div>
  );
};

export default HomeCard;
