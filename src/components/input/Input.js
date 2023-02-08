import React from "react";
import "./Input.scss";
export const Input = ({type , onChange, value , name}) => {
  return (
  
      <div class="form__group field">
        <input
          type={type}
          value={value}
          onChange={onChange}
          class="form__field"
          placeholder="Name"
          name={name}
        //   id="name"
          required
        />
        <label for="name" class="form__label">
        {name}
        </label>
      </div>

  );
};
