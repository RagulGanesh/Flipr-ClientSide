import React from "react";
import { BACKEND_URI } from "../config/constants";

const UploadsList = ({ medias }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th width="200">Name</th>
              <th>Videos</th>
            </tr>
          </thead>
          <tbody>
            {medias &&
              medias.map((media) => {
                return (
                  <tr>
                    <td>{media.name}</td>
                    <td>
                      
                          <video
                            preload="auto"
                            width="320"
                            height="240"
                            controls
                          >
                            <source src={`${BACKEND_URI}${media.videos}`} />
                            ;Your browser does not support the video tag.
                          </video>
                       
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UploadsList;