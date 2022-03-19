import React from "react";
import { Spinner } from "react-bootstrap";

export const Loading = () => {
  return (
    <div className="min-vh-100">
      <div className="d-flex py-5 justify-content-center text-center">
        <Spinner animation="border" className="my-5" role="status" variant="primary" style={{ width: "5rem", height: "5rem" }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </div>
  );
};
