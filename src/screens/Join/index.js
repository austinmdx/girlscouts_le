import React, { useMemo } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { DATA } from "../../utils/data";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import '../../x-frame-bypass'

const Join = () => {
  const { id, childId } = useParams();
  const { password } = useAuth();
  const [links] = useLocalStorage("links");

  const data = useMemo(() => {
    const findItem = DATA.find((item) => item.id === parseInt(id));
    if (findItem) {
      return findItem.items.find((item) => item.id === parseInt(childId));
    }
    return null;
  }, [childId, id]);

  const url = useMemo(() => {
    if (links) {
      const linkArr = JSON.parse(links);
      const linkObj = linkArr.find(
        (item) => item["Title(read-only)"] === data.title,
      );
      if (linkObj) {
        return linkObj["Link"];
      }
    }
    return null;
  }, [data.title, links]);

  if (!password) {
    return <Navigate to="/login" />;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="relative w-full h-screen">
      <Link className="absolute inline-flex items-center top-1 left-4 text-2xl text-blue-800 dark:text-blue-500 hover:underline" to={`/get-involved/${id}`}>
        <img src="/images/left-arrow.svg" alt="Left arrow icon" className="h-5 w-auto mr-2" />
        Back</Link>
      {url && <iframe
        is="x-frame-bypass"
        src={url}
        width="100%"
        height="100%"
      />}
    </div>
  );
};

export default Join;
