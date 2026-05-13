const SectionTiltle = ({ title, description }) => {
  return (
    <div className="mb-3.5">
      <h1 className="text-3xl font-semibold text-primary my-2 lg:text-3xl">
        {title}
      </h1>
      <p className="text-neutral-400 font-semibold text-md lg:text-lg max-w-xl">
        {description}
      </p>
    </div>
  );
};

export default SectionTiltle;
