import { Modal } from "../../reusable/Modal";
import { Table, TableHeader, TableRow, TableHeaderCell, TableBody } from "../../reusable/Table";
import { PortfolioModalElement } from "./PortfolioModalElement";
import { PortfioModalProps } from "./types";
import "./portfolioModal.scss";

export const PortfolioModal: React.FC<PortfioModalProps> = ({ isVisible, setIsVisible }) => {
  return (
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
            <TableHeaderCell>Amount</TableHeaderCell>
            <TableHeaderCell className="portfolio_modal_table_header-price-change">Price Change</TableHeaderCell>
            <TableHeaderCell className="portfolio_modal_table_header-percent">Percent Change</TableHeaderCell>
            <TableHeaderCell alignCenter className="portfolio_modal_table_header-actions">
              Actions
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <PortfolioModalElement />
          <PortfolioModalElement />
          <PortfolioModalElement />
          <PortfolioModalElement />
          <PortfolioModalElement />
          <PortfolioModalElement />
          <PortfolioModalElement />
          <PortfolioModalElement />
          <PortfolioModalElement />
          <PortfolioModalElement />
          <PortfolioModalElement />
          <PortfolioModalElement />
          <PortfolioModalElement />
        </TableBody>
      </Table>
    </Modal>
  );
};
