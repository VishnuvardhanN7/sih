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
      className="tool-card bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
      onClick={onClick}
      style={{
        width: "310px",
        height: "290px",
        padding: "0.75rem 1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div className="icon text-blue-400 mb-1 text-xl">{icon}</div>
      <h3 className="text-xs font-semibold text-white mb-1">{title}</h3>
      <p className="text-gray-300 text-xs mb-1">{description}</p>
      <ul className="text-xs text-gray-400 list-disc pl-4 mb-1">
        {features?.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
      <span className="badge bg-blue-600 text-white text-xs px-2 py-1 rounded mb-1">
        {badge}
      </span>
      <div className="meta flex justify-between items-center text-xs text-gray-400">
        <span>{footer}</span>
        <span className="text-blue-400 hover:underline">Explore →</span>
      </div>
    </div>
  );
}