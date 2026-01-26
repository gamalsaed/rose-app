'use client'
import { X } from 'lucide-react';
import React, { useState } from 'react';

type SubmissionFeedbackProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SubmissionFeedback({
  children,
  className = '',
}: SubmissionFeedbackProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`bg-red-50 text-red-600 px-3 py-2 relative font-mono text-center ${className}`}
    >
      <div
        onClick={() => setVisible(false)}
        className="cursor-pointer absolute -top-2 left-1/2 -translate-x-1/2 rounded-full p-1 border border-red-600 bg-white"
      >
        <X size={12} />
      </div>

      <span className="mt-2 inline-block">{children}</span>
    </div>
  );
}
