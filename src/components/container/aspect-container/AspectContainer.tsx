import React, {
  useRef,
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

interface AspectContainerProps {
  aspectRatio?: string;
  className?: string;
  children?: ReactNode;
  scaleContent?: boolean;
  designWidth?: number;
}

const AspectContainer: React.FC<AspectContainerProps> = ({
  aspectRatio = "16:9",
  className = "",
  children,
  scaleContent = false,
  designWidth,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentStyle, setContentStyle] = useState<CSSProperties>({
    width: "100%",
    height: "100%",
    position: "relative",
  });
  const [scale, setScale] = useState<number>(1);

  // 解析宽高比
  const parseAspectRatio = (ratio: string): number => {
    const [widthRatio, heightRatio] = ratio.split(":").map(Number);
    return widthRatio / heightRatio;
  };

  // 调整尺寸
  const adjust = React.useCallback(() => {
    if (!containerRef.current) return;

    const parentWidth = containerRef.current.clientWidth;
    const parentHeight = containerRef.current.clientHeight;

    if (parentWidth === 0 || parentHeight === 0) {
      return;
    }

    const ratio = parseAspectRatio(aspectRatio);

    // 计算基于父容器宽度的高度
    const heightByWidth = parentWidth / ratio;
    // 计算基于父容器高度的宽度
    const widthByHeight = parentHeight * ratio;

    let finalWidth: number;
    let finalHeight: number;

    // 策略：优先填充宽度或高度，确保至少一个维度与父容器相同
    if (heightByWidth <= parentHeight) {
      finalWidth = parentWidth;
      finalHeight = heightByWidth;
    } else {
      finalWidth = widthByHeight;
      finalHeight = parentHeight;
    }

    // 更新样式
    setContentStyle({
      width: `${finalWidth}px`,
      height: `${finalHeight}px`,
      position: "relative", // 为 scale-wrapper 提供定位上下文
    });

    // 计算缩放比例
    if (scaleContent && designWidth) {
      const designHeight = designWidth / ratio;
      const scaleValue = Math.min(
        finalWidth / designWidth,
        finalHeight / designHeight,
      );
      setScale(scaleValue);
    }
  }, [aspectRatio, scaleContent, designWidth]);

  useEffect(() => {
    if (!containerRef.current) return;

    // 监听容器尺寸变化，包括初始渲染
    const resizeObserver = new ResizeObserver(() => {
      adjust();
    });

    resizeObserver.observe(containerRef.current);

    // 清理
    return () => {
      resizeObserver.disconnect();
    };
  }, [aspectRatio, adjust]); // aspectRatio 或 adjust 变化时重新计算

  // 计算设计尺寸
  const designHeight = React.useMemo(() => {
    if (scaleContent && designWidth) {
      const ratio = parseAspectRatio(aspectRatio);
      return designWidth / ratio;
    }
    return 0;
  }, [scaleContent, designWidth, aspectRatio]);

  // scale-wrapper 样式
  const scaleWrapperStyle: CSSProperties = React.useMemo(() => {
    if (scaleContent && designWidth) {
      return {
        width: `${designWidth}px`,
        height: `${designHeight}px`,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: "center center",
      };
    }
    return {};
  }, [scaleContent, designWidth, designHeight, scale]);

  return (
    <div
      ref={containerRef}
      className={`aspect-container ${className}`}
      style={containerStyle}
    >
      <div className="aspect-container-content" style={contentStyle}>
        {scaleContent && designWidth ? (
          <div className="scale-wrapper" style={scaleWrapperStyle}>
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

// 容器样式
const containerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  width: "100%",
  height: "100%",
};

export default AspectContainer;
