function Scramble({ scramble }) {
  return (
    <section className="scramble">
      <h3>Current Scramble</h3>
      {scramble}
      <small>Note: This is a filler scramble, it is not WCA legal...yet</small>
    </section>
  );
}

export default Scramble;
