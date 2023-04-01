import { ReactNode } from "react";
import { Sizing } from "../../models/ISizing";

export interface TableProps extends Sizing {
  className?: string;
  children: ReactNode;
  alignLeft?: boolean;
  alignRight?: boolean;
  alignCenter?: boolean;
}
