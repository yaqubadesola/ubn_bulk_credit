import React from "react";
import "./LoadingSpinner.css";

export default function LoadingSpinner() {
  console.log("Am loading")
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
}