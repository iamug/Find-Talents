import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ITalent } from "../interfaces/talents";
import { ProfileCard } from "../components";

const Saved = () => {
  const [talents, setTalents] = useState<ITalent[]>([]);

  const fetchSaved = () => {
    const saved = JSON.parse(localStorage.getItem("saved") || "[]") as ITalent[];
    setTalents(saved);
  };

  const removeTalent = (uuid: string) => {
    let saved = JSON.parse(localStorage.getItem("saved") || "[]") as ITalent[];
    let removeSaved = saved.filter((e) => e.uuid !== uuid);
    localStorage.setItem("saved", JSON.stringify(removeSaved));
    setTalents(removeSaved);
    return toast.success("Profile Removed Successfully.");
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  return (
    <>
      <div className="col-12 pt-3 mt-lg-4 pt-lg-5 pb-lg-3 border-primary border-bottom">
        <div className="col-12">
          <h1 className=" fw-normal"> Saved Talents</h1>
        </div>
      </div>

      {talents.length === 0 && (
        <>
          <div className="my-5 py-5">
            <div className="col-12 text-center">
              {/* <h2 className="fw-light"> No Talents</h2> */}
              <h2 className="fw-light"> No Saved Talents.</h2>
            </div>
          </div>
        </>
      )}

      {talents.length > 0 && (
        <div className="">
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-3 align-items-stretch row-cols-xl-4 g-5 mt-2 px-lg-3">
            {talents?.map((value) => (
              <div key={value?.uuid} className="col">
                <ProfileCard data={value} disableSave={true} onClickRemoveSaved={removeTalent} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Saved;
