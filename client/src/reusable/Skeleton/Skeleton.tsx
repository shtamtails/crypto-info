import "./skeleton.scss";
import { SkeletonProps } from "./types";

export const Skeleton: React.FC<SkeletonProps> = (props) => {
  const { width, height, borderRadius, centered } = props;

  return centered ? (
    <div className="skeleton-container">
      <div className="skeleton" style={{ width, height, borderRadius }} />
    </div>
  ) : (
    <div className="skeleton" style={{ width, height, borderRadius }} />
  );
};
