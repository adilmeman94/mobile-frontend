import React from "react";
import { Badge } from "reactstrap";

export const TableLoadingText = (props) => {
  const { colSpan } = props;
  return (
    <tr>
      <td colSpan={colSpan}>Loading Data....</td>
    </tr>
  );
};

export const NoRecordsFound = (props) => {
  const { colSpan } = props;
  return (
    <tr>
      <td colSpan={colSpan}>No Records Found</td>
    </tr>
  );
};

export const IsActiveLabel = (props) => {
  const { isActive, onLabelClick, className } = props;
  return isActive ? (
    <Badge
      onClick={onLabelClick}
      pill
      color="primary"
      className={`cursor-pointer ${className}`}
    >
      Active
    </Badge>
  ) : (
    <Badge
      onClick={onLabelClick}
      pill
      color="danger"
      className={`cursor-pointer ${className}`}
    >
      In Active
    </Badge>
  );
};
