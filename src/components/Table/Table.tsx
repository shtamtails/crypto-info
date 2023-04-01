import React from "react";
import { TableProps } from "./ITable";
import { getDefaultClassName } from "../../utils/getDefaultClassName";
import "./table.scss";

export default function createTableComponent(tag: keyof JSX.IntrinsicElements): React.FC<TableProps> {
  return (props) => {
    const { children, alignLeft, alignRight, alignCenter } = props;
    const tableClassnames: string[] = [];
    alignLeft && tableClassnames.push("text-left");
    alignRight && tableClassnames.push("text-right");
    alignCenter && tableClassnames.push("text-center");
    const className = getDefaultClassName(props, tableClassnames);
    return React.createElement(tag, { className }, children);
  };
}

export const TableDataCell = createTableComponent("td");
export const TableRow = createTableComponent("tr");
export const TableHeaderCell = createTableComponent("th");
export const TableBody = createTableComponent("tbody");
export const TableHeader = createTableComponent("thead");
export const Table = createTableComponent("table");
