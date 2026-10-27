const scrambleMoves = ["R", "L", "F", "B", "D", "U"];
const scrambleMoveModifier = ["", "2", "'"];

const generateScramble = () => {
  let scrambleArray = [];
  for (let i = 0; i < 20; i++) {
    let nextTurn =
      scrambleMoves[Math.floor(Math.random() * scrambleMoves.length)];
    let nextModifier =
      scrambleMoveModifier[
        Math.floor(Math.random() * scrambleMoveModifier.length)
      ];
    scrambleArray[i] = nextTurn + nextModifier + " ";
  }
  return scrambleArray;
};

export default generateScramble;
