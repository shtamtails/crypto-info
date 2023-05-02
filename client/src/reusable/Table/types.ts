import { ReactNode } from "react";
import { DefaultProps } from "../../models/defaultProps";

export interface TableProps extends DefaultProps {
  children: ReactNode;
  alignLeft?: boolean;
  alignRight?: boolean;
  alignCenter?: boolean;
}
