import { SVGProps, ReactNode } from 'react';

interface HexagonProps extends SVGProps<SVGSVGElement> {
  className?: string;
  style?: React.CSSProperties;
  fill?: string;
  hasStroke?: boolean;
  strokeColor?: string;
  strokeWidth?: number;
  children?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imageClassName?: string;
  imageStyle?: React.CSSProperties;
  preserveAspectRatio?: 'meet' | 'slice';
  imageY?: string;
  imageHeight?: string;
  imageWidth?: string;
}

export default function Hexagon({ 
  className, 
  style, 
  fill, 
  hasStroke = false, 
  strokeColor = "currentColor", 
  strokeWidth = 1, 
  children, 
  imageSrc,
  imageAlt,
  imageClassName,
  imageStyle,
  preserveAspectRatio = 'slice',
  imageY = '0',
  imageHeight = '100%',
  imageWidth = '100%',
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
        {imageSrc && (
          <image
            href={imageSrc}
            x="0"
            y={imageY}
            width={imageWidth}
            height={imageHeight}
            preserveAspectRatio={`xMidYMid ${preserveAspectRatio}`}
            clipPath="url(#hexagonClip)"
            className={imageClassName}
            style={{
              imageRendering: 'auto',
              ...imageStyle,
            }}
          />
        )}
        <defs>
          <clipPath id="hexagonClip">
            <path d="M8 0L15 4V12L8 16L1 12V4L8 0Z" />
          </clipPath>
        </defs>
        {children}
    </svg>
  );
}