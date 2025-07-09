interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState = ({ icon = '🎬', title, description, action, className = '' }: EmptyStateProps) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="text-6xl mb-4" role="img" aria-label="Empty state icon">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
          {description}
        </p>
      )}
      {action && action}
    </div>
  );
};

export default EmptyState;
