/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState, UIEvent } from "react";
import { cn } from "@/lib/utils";

interface WheelPickerProps {
  items: (string | number)[];
  value: string | number;
  onChange: (value: any) => void;
  className?: string;
  itemHeight?: number;
  perspective?: number;
}

const WheelPicker: React.FC<WheelPickerProps> = ({ items, value, onChange, className, itemHeight = 40, perspective = 800 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(() => {
    const index = items.indexOf(value);
    return index !== -1 ? index * itemHeight : 0;
  });

  useEffect(() => {
    if (containerRef.current) {
      const index = items.indexOf(value);
      if (index !== -1 && containerRef.current.scrollTop !== index * itemHeight) {
        containerRef.current.scrollTop = index * itemHeight;
      }
    }
  }, [items, value, itemHeight]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const handleScrollEnd = () => {
    if (!containerRef.current) return;
    const index = Math.round(containerRef.current.scrollTop / itemHeight);
    const validIndex = Math.max(0, Math.min(index, items.length - 1));
    const newValue = items[validIndex];
    if (newValue !== value) {
      onChange(newValue);
    }
  };

  // Debounce scroll end detection
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    handleScroll(e);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(handleScrollEnd, 150);
  };

  const getTransformStyles = (index: number) => {
    const paddingTop = 80;
    const itemCenter = paddingTop + index * itemHeight + itemHeight / 2;
    const containerCenter = scrollTop + 200 / 2;
    const distance = itemCenter - containerCenter;

    const maxDistance = 200;
    const clampedDistance = Math.max(-maxDistance, Math.min(maxDistance, distance));
    const rotateX = (clampedDistance / maxDistance) * -60;

    const scale = 1 - Math.abs(clampedDistance / maxDistance) * 0.2;
    const opacity = 1 - Math.abs(clampedDistance / maxDistance) * 0.7;

    return {
      transform: `perspective(${perspective}px) rotateX(${rotateX}deg) scale(${scale})`,
      opacity: Math.max(0.2, opacity),
    };
  };

  return (
    <div
      ref={containerRef}
      className={cn("overflow-y-auto scrollbar-hide snap-y snap-mandatory relative z-30 h-full", className)}
      onScroll={onScroll}
      style={{ scrollBehavior: "smooth" }}
    >
      <div style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        {items.map((item, idx) => (
          <div
            key={`${item}-${idx}`}
            onClick={() => {
              onChange(item);
              if (containerRef.current) {
                containerRef.current.scrollTo({ top: idx * itemHeight, behavior: "smooth" });
              }
            }}
            className={cn(
              "flex items-center justify-center cursor-pointer snap-center transition-transform duration-75 origin-center backface-visible",
              value === item ? "font-bold text-custom-gray text-[18px]" : "text-gray-400 text-[16px]"
            )}
            style={{
              height: `${itemHeight}px`,
              ...getTransformStyles(idx),
            }}
          >
            {typeof item === "number" && item < 10 ? `0${item}` : item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WheelPicker;
