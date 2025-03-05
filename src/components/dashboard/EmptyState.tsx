import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onAddWebsite?: () => void;
}

const EmptyState = ({
  title = "No websites added yet",
  description = "Add your first website to start tracking visitor analytics and monitoring performance.",
  buttonText = "Add Website",
  onAddWebsite = () => {},
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px] p-8 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="w-24 h-24 mb-6 text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>

        <p className="text-gray-500 mb-6">{description}</p>

        <Button onClick={onAddWebsite} className="flex items-center gap-2">
          <PlusCircle size={16} />
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;
