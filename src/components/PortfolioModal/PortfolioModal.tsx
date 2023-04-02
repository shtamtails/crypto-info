import { Table, TableBody, TableHeader, TableHeaderCell, TableRow } from "../Table/Table";
import { PortfioModalProps } from "./IPortfolioModal";
import "./portfolioModal.scss";
import { PortfolioModalElement } from "./PortfolioModalElement";
import { Modal } from "../Modal/Modal";

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
