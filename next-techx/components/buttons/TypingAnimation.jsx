import React from "react";

const TypingAnimation = () => {
  return (
    <main>
      <style>
        {`
        @keyframes typing {
            from { width: 0; }
            to { width: 100%; }

          }
          
          @keyframes blink-caret {
            from, to { border-color: transparent; }
            50% { border-color: black; }
          }
          
          .typing-effect {
            overflow: hidden; /* Ensures the content is not revealed until the animation */
            border-right: .15em solid black; /* The typwriter cursor */
            white-space: nowrap; /* Keeps the content on a single line */
             margin: 0 auto; /* Gives that scrolling effect as the typing happens */
           
            animation: 
              typing 3.5s steps(40, end),
              blink-caret .75s step-end infinite;
          }
        `}
      </style>
      <div className="typing-container">
        <p className="typing-effect">What is TechX?</p>
      </div>
    </main>
  );
};

export default TypingAnimation;
