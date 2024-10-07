import React from "react";
export default function Dialog({ hideDialog, dialogData }) {
  if (!dialogData) {
    return null;
  }
  const { name, gravity, orbitalPeriod, surfaceArea } = dialogData;
  return (
    <div className="dialog">
      <div className="dialog-header">
        <div className="">{name}</div>
        <svg
          onClick={hideDialog}
          width="24px"
          height="24px"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >...
        </svg>
      </div>
      <div className="details">Gravity: {gravity} m/s²</div>
      <div className="details">Orbital period: {orbitalPeriod} days</div>
      <div className="details">Surface area: {surfaceArea} million km²</div>
    </div>
  );
}