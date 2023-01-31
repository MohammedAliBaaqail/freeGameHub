import "./Button.scss";

export const Button = ({ text, url ,handleClick , not_blank }) => {
  return (
   
    <a target={not_blank? '' : '_blank '} href={url ? url : ""}>
      <button className="btn-23" onClick={handleClick} >
        <div className="button-text">{text}</div>
      </button>
    </a>
  );
};
