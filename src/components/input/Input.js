import React from "react";
import "./Input.scss";
export const Input = ({type , onChange, value , name , defaultValue , isTextArea}) => {
  return (
  
      <div className="form__group field">
        {isTextArea ? (
          <textarea
            type={type}
            value={value}
            onChange={onChange}
            defaultValue={defaultValue}
            className="form__field"
            placeholder="Name"
            name={name}
            id="name"
            required
          />
        ) : (

        <input
          type={type}
          value={value}
          onChange={onChange}
          defaultValue={defaultValue}
          className="form__field"
          placeholder="Name"
          name={name}
        //   id="name"
          required
        />
        )}
        <label for="name" className="form__label">
        {name}
        </label>
      </div>

  );
};
