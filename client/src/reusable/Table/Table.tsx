import React, { ReactNode } from "react";
import { SharedProps } from "../../models/defaultProps";
import { getDefaultClassName } from "../../utils/getDefaultClassName/getDefaultClassName";
import "./Table.styles.scss";

export interface TableProps extends SharedProps {
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

    const getTableClassName = () => {
      const tableClassName: string[] = [];
      alignLeft && tableClassName.push("text-left");
      alignRight && tableClassName.push("text-right");
      alignCenter && tableClassName.push("text-center");
      return tableClassName.join(" ").trim();
    };

    const className = getDefaultClassName({
      props,
      defaultClassName: getTableClassName(),
      withIndents: true,
    });

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
