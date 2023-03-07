import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesSquare } from "@fortawesome/free-solid-svg-icons";
export default function TodoList(props) {
  return (
    <div>
      <div className="accordion " id="accordionExample">
        <div className="accordion-item ">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed text-uppercase fw-bolder"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapseTwo${props.count}`}
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              {`Task # ${props.count}: ${props.data.title}`}
            </button>
          </h2>
          <div
            id={`collapseTwo${props.count}`}
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body text-muted ms-3 mt-3">
              <p className="d-flex justify-content-between">
                {props.data.description}
                <button
                  className="btn fs-4 text-danger"
                  onClick={() => {
                    props.deleteHandler(props.id);
                  }}
                >
                  <FontAwesomeIcon icon={faTimesSquare} />
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
