import React from "react";

type NeonTextProps = {
  text: string;
  size?: number;
};

const NeonText: React.FC<NeonTextProps> = ({ text, size = 10 }) => {
  return (
    <h2
      style={{
        color: "#fff",
        textShadow:
          "0 0 5px #fdc9b5, 0 0 10px #fdc9b5, 0 0 20px #fa074f, 0 0 30px #fa074f, 0 0 40px #fa074f, 0 0 50px #fa074f, 0 0 60px #fa074f",
        fontSize: `calc(${size}vh)`,
      }}
      className="text-center text-secondary font-[MarqueeMoon,Arial,serif]"
    >
      {text}
    </h2>
  );
};

export default NeonText;
