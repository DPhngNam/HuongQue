interface TabHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function TabHeader({ title, description, action }: TabHeaderProps) {
  return (
    <div className={action ? "flex justify-between items-center" : ""}>
      <div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      {action && action}
    </div>
  );
}
