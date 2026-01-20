import type { JSX } from "react";

interface CardProps {
  title: string;
  content: string | JSX.Element;
  styleName?: string;
}

export const Card = ({ title, content, styleName }: CardProps) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 ${styleName || ''}`}>
      <h2 className="text-3xl font-bold text-blue-600 mb-4 text-center">{title}</h2>
      <p className="text-gray-700">{content}</p>
    </div>
  )
}