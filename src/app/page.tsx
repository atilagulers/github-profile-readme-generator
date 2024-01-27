const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="header-primary-gradient font-bold p-1 text-center md:text-6xl text-2xl">
        Easiest way to generate
      </h1>
      <h1 className="text-center font-light md:text-4xl text-lg my-5">
        Your GitHub Profile
      </h1>
      <div className="flex-center flex-col gap-2 opacity-75">
        <p>This is a open-source GitHub Profile Readme Generator.</p>
        <p> You can either create a template or use a pre-made template.</p>
      </div>
    </section>
  );
};

export default Home;
