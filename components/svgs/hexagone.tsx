import { SVGProps, ReactNode } from 'react';

interface HexagonProps extends SVGProps<SVGSVGElement> {
  className?: string;
  style?: React.CSSProperties;
  fill?: string;
  hasStroke?: boolean;
  strokeColor?: string;
  strokeWidth?: number;
  children?: ReactNode;
}

export default function Hexagon({ 
  className, 
  style, 
  fill, 
  hasStroke = false, 
  strokeColor = "currentColor", 
  strokeWidth = 1, 
  children, 
  ...props 
}: HexagonProps) {
  return (
    <svg 
        viewBox="0 0 16 16" 
        fill="currentColor"
        className={className}
        style={style}
        {...props}
    >
        <path 
            d="M8 0L15 4V12L8 16L1 12V4L8 0Z" 
            fill={fill || "currentColor"}
            stroke={hasStroke ? strokeColor : "none"}
            strokeWidth={hasStroke ? strokeWidth : 0}
        />
        {children}
    </svg>
  );
}