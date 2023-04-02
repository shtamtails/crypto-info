import { AiOutlineEdit } from "react-icons/ai";
import { Button } from "../../reusable/Button";
import { CryptoCard } from "../../reusable/CryptoCard";
import { TableRow, TableDataCell } from "../../reusable/Table";

export const PortfolioModalElement = () => {
  return (
    <TableRow>
      <TableDataCell className="portfolio_modal_table_body-number">1</TableDataCell>
      <TableDataCell>
        <CryptoCard
          name="Bitcoin"
          logoURL="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"
          shortName="BTC"
        />
      </TableDataCell>
      <TableDataCell alignCenter>$1234,56</TableDataCell>
      <TableDataCell alignCenter className="portfolio_modal_table_body-price-change">
        $12,34
      </TableDataCell>
      <TableDataCell alignCenter className="portfolio_modal_table_body-percent">
        1,80%
      </TableDataCell>
      <TableDataCell className="portfolio_modal_table_body-actions flex jcc">
        <Button variant="regular">
          <AiOutlineEdit />
        </Button>
      </TableDataCell>
    </TableRow>
  );
};
