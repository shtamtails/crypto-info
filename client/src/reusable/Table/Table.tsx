import React, { ReactNode } from "react";
import { DefaultProps } from "../../models/defaultProps";
import { getDefaultClassName } from "../../utils/getDefaultClassName/getDefaultClassName";
import "./Table.styles.scss";

export interface TableProps extends DefaultProps {
  children: ReactNode;
  alignLeft?: boolean;
  alignRight?: boolean;
  alignCenter?: boolean;
}

export default function createTableComponent(
  tag: keyof JSX.IntrinsicElements
): React.FC<TableProps> {
  return (props) => {
    const { children, alignLeft, alignRight, alignCenter, style, testId } =
      props;
    const tableClassnames: string[] = [];
    alignLeft && tableClassnames.push("text-left");
    alignRight && tableClassnames.push("text-right");
    alignCenter && tableClassnames.push("text-center");
    const className = getDefaultClassName(props, tableClassnames);
    return React.createElement(
      tag,
      { "data-testid": testId, className, style },
      children
    );
  };
}

export const TableDataCell = createTableComponent("td");
export const TableRow = createTableComponent("tr");
export const TableHeaderCell = createTableComponent("th");
export const TableBody = createTableComponent("tbody");
export const TableHeader = createTableComponent("thead");
export const Table = createTableComponent("table");
