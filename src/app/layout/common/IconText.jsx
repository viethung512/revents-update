import React, { Fragment } from 'react';

const IconText = ({ label, icon }) => {
  return (
    <Fragment>
      <span style={{ marginRight: 12 }}>{icon}</span>
      <span>{label}</span>
    </Fragment>
  );
};

export default IconText;
