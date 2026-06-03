const FeatureCard = ({ title, description, icon }) => {
  const Icon = icon;
  return (
    <div className="bg-neutral px-10 py-8 w-full rounded-2xl shadow-sm">
      <div className="bg-neutral-950 p-3.5 flex items-center justify-between rounded-xl w-14 mb-7">
        <Icon className="w-7 h-7 stroke-2" />
      </div>
      <h1 className="text-xl font-semibold my-2 lg:text-2xl">{title}</h1>
      <p className="text-neutral-400 font-semibold text-base lg:text-lg max-w-xl">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
