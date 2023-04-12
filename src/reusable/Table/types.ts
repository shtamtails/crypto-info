import { ReactNode } from "react";
import { defaultProps } from "../../models/defaultProps";

export interface TableProps extends defaultProps {
  children: ReactNode;
  alignLeft?: boolean;
  alignRight?: boolean;
  alignCenter?: boolean;
}
