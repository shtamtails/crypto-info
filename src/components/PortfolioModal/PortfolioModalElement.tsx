import { AiOutlineEdit } from "react-icons/ai";
import { Button } from "../Button/Button";
import { TableRow, TableDataCell } from "../Table/Table";

export const PortfolioModalElement = () => {
  return (
    <TableRow>
      <TableDataCell className="portfolio_modal_table_body-number">1</TableDataCell>
      <TableDataCell>Bitcoin</TableDataCell>
      <TableDataCell alignCenter>$1234,56</TableDataCell>
      <TableDataCell alignCenter className="portfolio_modal_table_body-price-change">
        $12,34
      </TableDataCell>
      <TableDataCell alignCenter className="portfolio_modal_table_body-percent">
        1,80%
      </TableDataCell>
      <TableDataCell alignCenter className="portfolio_modal_table_body-actions">
        <Button variant="regular">
          <AiOutlineEdit />
        </Button>
      </TableDataCell>
    </TableRow>
  );
};
