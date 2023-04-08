import { Modal } from "../../reusable/Modal";
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
} from "../../reusable/Table";
import "./portfolioModal.scss";
import { useContext } from "react";
import { PortfolioContext } from "../../context/PortfolioContext";
import { PortfolioModalElement } from "./PortfolioModalElement";
import { PortfolioModalProps } from "./types";

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  isVisible,
  setIsVisible,
}) => {
  const { portfolio } = useContext(PortfolioContext);

  return (
    <>
      <Modal visible={isVisible} setVisible={setIsVisible} title="My portfolio">
        <Table fullWidth>
          <TableHeader>
            <TableRow>
              <TableHeaderCell
                alignLeft
                className="portfolio_modal_table_header-number"
              >
                №
              </TableHeaderCell>
              <TableHeaderCell alignLeft style={{ width: "200px" }}>
                Name
              </TableHeaderCell>
              <TableHeaderCell className="portfolio_modal_table_header-amount">
                Amount
              </TableHeaderCell>
              <TableHeaderCell>Price</TableHeaderCell>
              <TableHeaderCell className="portfolio_modal_table_header-price-change">
                Price Change
              </TableHeaderCell>
              <TableHeaderCell className="portfolio_modal_table_header-percent">
                Percent Change
              </TableHeaderCell>
              <TableHeaderCell
                alignCenter
                className="portfolio_modal_table_header-actions"
              >
                Actions
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolio?.map((el, i) => (
              <PortfolioModalElement
                number={i + 1}
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
