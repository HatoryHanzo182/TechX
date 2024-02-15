import React from "react";

const SquaresAnimation = () => {
  return (
    <main>
      <style>
        {`
@keyframes moveDown {
  from { transform: translateY(0); }
  to { transform: translateY(100px); }
}

@keyframes moveLeft {
  from { transform: translateX(100px); }
  to { transform: translateX(0); }
}

@keyframes moveRight {
  from { transform: translateX(-100px); }
  to { transform: translateX(0); }
}

@keyframes moveUp {
  from { transform: translateY(100px); }
  to { transform: translateY(0); }
}

.move-down { animation: moveDown 2s infinite alternate; }
.move-left { animation: moveLeft 2s infinite alternate 2s; }
.move-right { animation: moveRight 2s infinite alternate 4s; }
.move-up { animation: moveUp 2s infinite alternate 6s; }


`}
      </style>
      <div className="flex justify-center items-center h-screen">
        <div className="grid grid-cols-2 gap-4">
          <div className="w-20 h-20 bg-blue-500 move-down"></div>
          <div className="w-20 h-20 bg-red-500 move-right"></div>
          <div className="w-20 h-20 bg-green-500 move-right"></div>
          <div className="w-20 h-20 bg-yellow-500 move-up"></div>
        </div>
      </div>
    </main>
  );
};

export default SquaresAnimation;
