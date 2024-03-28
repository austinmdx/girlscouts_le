import React, { useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LinkButton from "../../components/base/LinkButton";
import { DATA } from "../../utils/data";
import HomeCard from "../../components/screens/Home/Card";
import { useWindowSize } from "../../hooks/useWindowSize";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const GetInvolved = () => {
  const { id } = useParams();
  const { password } = useAuth();
  const windowSize = useWindowSize();

  const isMobile = useMemo(() => (windowSize.width || 0) < 1024, [windowSize]);

  const data = useMemo(() => {
    const findItem = DATA.find((item) => item.id == id);
    return findItem;
  }, [id]);

  if (!password) {
    return <Navigate to="/login" />;
  }

  if (!data || !data.items) {
    return null;
  }

  return (
  <>
    <Link className="inline-flex items-center px-5 py-5 md:px-20 text-2xl text-blue-800 dark:text-blue-500 hover:underline" to={'/'}>
      <img src="/images/left-arrow.svg" alt="Left arrow icon" className="h-5 w-auto mr-2" />
      Back</Link>
    <div className="w-full p-5 md:p-20 flex lg:flex-row flex-col items-center gap-x-10">
      <div className="lg:w-1/4 w-full">
        {isMobile ? (
          <div
            className={`${data.backgroundColor} rounded-2xl p-5 flex items-center gap-x-5`}
          >
            <img
              src={data.image}
              alt="girlscouts"
              className="w-1/3 aspect-square object-cover"
            />
            <div className="w-2/3 flex flex-col items-center">
              <div className="text-white mb-1 text-2xl text-center font-bold">
                <FormattedMessage id={data.title} />
              </div>
              <div className="text-white text-center line-clamp-3 h-[72px] my-3">
                {data.description && <FormattedMessage id={data.description} />}
              </div>
              <LinkButton
                title={<FormattedMessage id={'get_started'} />}
                className={`${data.buttonColor} w-full text-xl px-5`}
                href={`/get-involved/${data.id}`}
              />
            </div>
          </div>
        ) : (
          <HomeCard item={data} />
        )}
      </div>
      <div className="lg:w-3/4 w-full mt-10 lg:mt-0 grid lg:gap-10 lg:grid-cols-3 gap-5 grid-cols-2">
        {data.items.map((item) => {
          const { title, description, image, shape, buttonColor, id } = item;

          return (
            <div className="p-5" key={id}>
              <img
                src={image}
                alt="girlscouts"
                className={`${shape} w-full aspect-square object-cover`}
              />
              <div className="text-[26px] leading-[31px] line-clamp-2 h-[62px] my-[10px] text-center font-medium">
                <FormattedMessage id={title} />
              </div>
              <div className="text-lg my-[10px] text-center line-clamp-3 h-[66px]">
                {description && <FormattedMessage id={description} />}
              </div>
              <LinkButton
                title={<FormattedMessage id={item.linkText ? item.linkText : 'learn_more'} />}
                className={`${buttonColor} w-full mt-[10px] !text-xl py-3`}
                href={`/get-involved/${data.id}/${item.id}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  </>
  );
};

export default GetInvolved;
