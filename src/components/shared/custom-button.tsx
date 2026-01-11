import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

type ButtonProps = {
  children: React.ReactNode;
  'aria-label'?: string;
}

export default function CustomButton({children,...props}: ButtonProps) {
  return (
    <Button {...props} className="px-4 py-2 mt-2 bg-maroon-50 text-maroon-700 text-base font-normal hover:bg-maroon-50">
     {children} 
    </Button>
  );
}
