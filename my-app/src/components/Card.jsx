export default function Card({
  icon,
  title,
  description,
  badge,
  footer,
  features,
  onClick,
}) {
  return (
    <div
      className="tool-card bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
      onClick={onClick}
    >
      <div className="icon text-blue-400 mb-4 text-2xl">{icon}</div>

      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300 mb-3">{description}</p>

      <ul className="text-sm text-gray-400 list-disc pl-5 mb-3">
        {features?.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>

      <span className="badge inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded mb-3">
        {badge}
      </span>

      <div className="meta flex justify-between items-center text-sm text-gray-400">
        <span>{footer}</span>
        <span className="text-blue-400 hover:underline">Explore →</span>
      </div>
    </div>
  );
}