import "./Button.scss";

export const Button = ({ text, url }) => {
  return (
    <a target="_blank " href={url ? url : ""}>
      <button className="btn-23" role="button">
        <div className="button-text">{text}</div>
      </button>
    </a>
  );
};
