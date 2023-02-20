import React from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';
import './loader.scss';
function Loader() {
  return <Spinner animation="border" variant="primary" className="loading-spinner" />;
}
export default Loader;
