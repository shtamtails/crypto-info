import { Modal } from "../../reusable/Modal";
import { Table, TableHeader, TableRow, TableHeaderCell, TableBody } from "../../reusable/Table";
import { PortfioModalProps } from "./types";
import "./portfolioModal.scss";
import { useContext } from "react";
import { DefaultContext } from "../../context/context";
import { PortfolioModalElement } from "./PortfolioModalElement";

export const PortfolioModal: React.FC<PortfioModalProps> = ({ isVisible, setIsVisible }) => {
  const { portfolio } = useContext(DefaultContext);

  return (
    <>
      <Modal visible={isVisible} setVisible={setIsVisible} title="My portfolio">
        <Table fullWidth>
          <TableHeader>
            <TableRow>
              <TableHeaderCell alignLeft className="portfolio_modal_table_header-number">
                №
              </TableHeaderCell>
              <TableHeaderCell alignLeft style={{ width: "200px" }}>
                Name
              </TableHeaderCell>
              <TableHeaderCell className="portfolio_modal_table_header-amount">Amount</TableHeaderCell>
              <TableHeaderCell>Price</TableHeaderCell>
              <TableHeaderCell className="portfolio_modal_table_header-price-change">Price Change</TableHeaderCell>
              <TableHeaderCell className="portfolio_modal_table_header-percent">Percent Change</TableHeaderCell>
              <TableHeaderCell alignCenter className="portfolio_modal_table_header-actions">
                Actions
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolio?.map((el) => (
              <PortfolioModalElement
                key={el.id}
                amount={el.amount}
                name={el.name}
                priceUsd={el.priceUsd}
                id={el.id}
                symbol={el.symbol}
              />
            ))}
          </TableBody>
        </Table>
      </Modal>
    </>
  );
};
