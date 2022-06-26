import React, { useState } from "react";
import "./Tag.css";
import Form from "react-bootstrap/Form";

const TagInput = ({ tags }) => {
  const [tagData, setTagData] = React.useState(tags);
  const removeTagData = (indexToRemove) => {
    setTagData([...tagData.filter((_, index) => index !== indexToRemove)]);
  };
  const addTagData = (event) => {
    if (event.target.value !== "") {
      setTagData([...tagData, event.target.value]);
      event.target.value = "";
    }
  };
  return (
    <div className="tag-input">
      <ul className="tags">
        {tagData.map((tag, index) => (
          <li key={index} className="tag">
            <span className="tag-title">{tag}</span>
            <span
              className="tag-close-icon"
              onClick={() => removeTagData(index)}
            >
              x
            </span>
          </li>
        ))}
      </ul>
      <Form.Control
        type="text"
        placeholder="Press enter to add a tag"
        onKeyUp={(event) => (event.key === "Enter" ? addTagData(event) : null)}
      />
    </div>
  );
};

export default TagInput;
