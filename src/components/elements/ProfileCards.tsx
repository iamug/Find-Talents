import { ITalent } from "../../interfaces/talents";

interface ProfileCardProps {
  data: ITalent;
  disableSave?: boolean;
  disableRemoveSaved?: boolean;
  onClickSave?: (talent: ITalent) => void;
  onClickRemoveSaved?: (uuid: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ data, disableSave, disableRemoveSaved, onClickRemoveSaved, onClickSave }) => (
  <div className=" card shadow rounded-2 bg-white">
    <img
      src={data.profile_picture}
      className="card-img-top w-100"
      alt={data.first_name}
      style={{ maxHeight: "200px", objectFit: "cover" }}
    />
    <div className="card-body">
      <span className="badge rounded-pill bg-primary my-2 px-3 py-2">{data.country.substring(0, 40)}</span>
      <h5 className="fw-bold mt-2 mb-2 text-primary">{data.first_name + " " + data.last_name}</h5>
      <p className="my-2 text-muted">{data.email}</p>
      <h6 className="my-2 fw-bold text-primary">{data.preferred_job_title}</h6>
    </div>
    <div className="card-footer border-top bg-white py-2  ">
      <div className="d-flex align-items-center">
        {!disableSave && (
          <button className="btn btn-sm btn-outline-primary mx-2" onClick={() => onClickSave && onClickSave(data)}>
            Save <i className="far  mx-2 fa-save " />
          </button>
        )}
        {!disableRemoveSaved && (
          <button
            className="btn btn-outline-danger btn-sm  mx-2"
            onClick={() => onClickRemoveSaved && onClickRemoveSaved(data.uuid)}
          >
            Remove <i className="fa fa-user-minus mx-2 " />
          </button>
        )}
      </div>
    </div>
  </div>
);

export default ProfileCard;
