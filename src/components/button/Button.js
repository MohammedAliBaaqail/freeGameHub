import "./Button.scss";

export const Button = ({ text, url }) => {
  return (
    <a target="_blank " href={url ? url : ""}>
      <button class="btn-23" role="button">
        {text}
      </button>
    </a>
  );
};
