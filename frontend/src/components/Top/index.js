import React from 'react';

function Oxy(num) {
  return (
    <div className="oxy">
      {/* <div className="bloc1" />
      <div className="bloc2">{num.value}</div> */}
    </div>
  )
}

function Level(num) {
  return (
    <div className="lv">
      Level {num.value}
    </div>
  )
}

function Top() {
  return <div>
      <Oxy  value={"100k"} />
      <Level  value={"3"} />
  </div>;
}

export default Top;
