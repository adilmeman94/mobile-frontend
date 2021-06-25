import React, { useRef } from "react";
import { Button } from "reactstrap";

export const FileUpload = (props) => {
  const { onSetFile, isMultiple, color, labelName, size } = props;
  const fileUploader = useRef(null);

  const onFileChange = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isMultiple) {
      const file =
        event.target.files && event.target.files.length > 0
          ? event.target.files
          : null;
      onSetFile(file);
    } else {
      const file =
        event.target.files && event.target.files.length > 0
          ? event.target.files[0]
          : null;
      onSetFile(file);
    }
  };
  return (
    <>
      <Button
        color={color || "primary"}
        outline
        onClick={() => fileUploader.current.click()}
        size={size}
      >
        {labelName ? labelName : "Upload File"}
      </Button>
      <input
        type="file"
        onChange={onFileChange}
        ref={fileUploader}
        hidden
        multiple={isMultiple}
      />
    </>
  );
};
