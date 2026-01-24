interface HorizontalListProps {
  title: string;
  height: string;
  children?: React.ReactNode;
  onMore: () => void;
}

export const HorizontalList = ({ title, height, children, onMore }: HorizontalListProps) => {
  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="text-gray-600 text-sm select-none hover:text-gray-800" onClick={onMore}>More</div>
      </div>
      <div className="h-[1px] border-b border-gray-300 mb-4"></div>
      <div className={`relative w-full ${height} min-w-0`}>
        {children}
      </div>
    </div>
  )
}