import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useGetTalentsQuery, useGetTalentsByNextQuery } from "../app/services";
import { ITalent } from "../interfaces/talents";
import { ProfileCard, TextInput } from "../components";
import { talentsApi } from "../app/services/talents";
import { Pagination, PaginationNext } from "../components";
import { useAppDispatch } from "../app/hooks";

const Home = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [next, setNext] = useState("");
  const [talents, setTalents] = useState<ITalent[]>([]);
  const [searchState, setSearchState] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [initialState, setIntialState] = useState({ job_title: "", city: "", country: "" });

  const { data, isLoading, isSuccess: fetchSuccess, isError: fetchError } = useGetTalentsQuery({ pagination: { page, limit } });

  const fetchTalents = () => {
    if (!isLoading && fetchError) return toast.error("Error Fetching Talents. Kindly try again.");
    data?.items && setTalents(data.items);
  };

  const search = async (data: any) => {
    setSearchState(true);
    setSearchLoading(true);
    const { endpoints } = talentsApi;
    const { searchTalents } = endpoints;
    const { initiate } = searchTalents;
    const { data: searchResults, error } = await dispatch(initiate({ search: data }, { forceRefetch: true }));
    if (error) {
      setSearchLoading(false);
      return toast.error("Error Searching Talents. Kindly try again.");
    }
    searchResults && setTalents(searchResults.items || []);
    setSearchLoading(false);
  };

  const handleResetForm = (cb?: () => void) => {
    setSearchState(false);
    setSearchLoading(false);
    fetchTalents();
    cb && cb();
  };

  const saveTalent = (talent: ITalent) => {
    let saved = JSON.parse(localStorage.getItem("saved") || "[]") as ITalent[];
    saved.push(talent);
    const uniqueIds = Array.from(new Set(saved.map((item) => item.uuid)));
    const uniques = uniqueIds.map((uuid) => saved.find((x) => x.uuid === uuid));
    localStorage.setItem("saved", JSON.stringify(uniques));
    return toast.success("Profile Saved Successfully.");
  };

  useEffect(() => {
    fetchTalents();
    return;
  }, [data]);

  return (
    <>
      <div className="row pt-3 pt-lg-5">
        <div className="text-center"></div>

        <Formik validateOnChange={true} initialValues={initialState} onSubmit={(data) => search(data)}>
          {({ values, resetForm, handleSubmit }) => (
            <>
              <form noValidate onSubmit={handleSubmit}>
                <div className="col-lg-12 gx-3 my-4 row d-flex align-items-end justify-content-center">
                  <Form.Group className="col-lg-3 pt-1 ">
                    <TextInput name="job_title" label="Job Title" disableValidation={true} />
                  </Form.Group>
                  <Form.Group className="col-lg-2 pt-1 ">
                    <TextInput name="city" disableValidation={true} />
                  </Form.Group>
                  <Form.Group className="col-lg-2 pt-1 ">
                    <TextInput name="country" disableValidation={true} />
                  </Form.Group>
                  <div className="col-2 text-right d-flex">
                    <button type="submit" className="btn btn-outline-primary w-100">
                      Search
                    </button>
                    {searchState && (
                      <button
                        type="button"
                        onClick={() => {
                          handleResetForm(resetForm);
                        }}
                        className="btn btn-outline-danger  mx-2"
                      >
                        <i className="fas fa-times" />
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </>
          )}
        </Formik>
      </div>
      {isLoading && (
        <div className="min-vh-100">
          <div className="d-flex py-5 justify-content-center text-center">
            <Spinner
              animation="border"
              className="my-5"
              role="status"
              variant="primary"
              style={{ width: "5rem", height: "5rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </div>
      )}
      {!isLoading && fetchError && (
        <>
          <div className="my-5 py-5">
            <div className="col-12 text-center">
              <h2 className="fw-light">
                Error {searchState ? " Error Searching For Talents" : "Error Fetching Talents"} Vitals.
              </h2>
            </div>
          </div>
        </>
      )}

      {!isLoading && fetchSuccess && talents.length === 0 && (
        <>
          <div className="my-5 py-5">
            <div className="col-12 text-center">
              {/* <h2 className="fw-light"> No Talents</h2> */}
              <h2 className="fw-light"> {searchState ? "No Search Results." : "No Talents."}</h2>
            </div>
          </div>
        </>
      )}

      {fetchSuccess && talents.length > 0 && (
        <div className="">
          {searchLoading && (
            <div className="d-flex py-5 justify-content-center py-4 text-center">
              <Spinner
                animation="border"
                className="my-5"
                role="status"
                variant="primary"
                style={{ width: "5rem", height: "5rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          {!searchLoading && !isLoading && (
            <>
              <div className="row row-cols-1 row-cols-sm-1 row-cols-md-3 align-items-stretch row-cols-xl-4 g-4 mt-2 px-lg-3">
                {talents?.map((value) => (
                  <div key={value?.uuid} className="col">
                    <ProfileCard data={value} onClickSave={saveTalent} disableRemoveSaved={true} />
                  </div>
                ))}
              </div>
              {!searchState && (
                <div className="row mx-0 mt-4 pt-4 w-100">
                  <div className="d-flex">
                    <div className="mx-auto">
                      <Pagination data={talents} page={page} limit={limit} setPage={setPage} />
                    </div>
                  </div>
                </div>
              )}
              {/* <PaginationNext data={talents} next={data?.next as any} limit={limit} setNext={setNext} /> */}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
