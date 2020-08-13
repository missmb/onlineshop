import React from "react";
import Alert from '@material-ui/lab/Alert';


export default function ErrorNotice(props) {
  return (
    <div className="error-notice">
      <Alert severity="error">{props.message}</Alert>
    </div>
  );
}
