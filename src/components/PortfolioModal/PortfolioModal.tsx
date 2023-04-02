import { Button } from "../Button/Button";
import { Table, TableBody, TableDataCell, TableHeader, TableHeaderCell, TableRow } from "../Table/Table";
import { PortfioModalProps } from "./IPortfolioModal";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import "./portfolioModal.scss";
import { PortfolioModalElement } from "./PortfolioModalElement";

export const PortfolioModal: React.FC<PortfioModalProps> = ({ isVisible, setIsVisible }) => {
  const handleClose = () => {
    setIsVisible(false);
  };

  return isVisible ? (
    <div className="portfolio-modal">
      <div className="portfolio-modal_overlay" onClick={handleClose} />
      <div className="portfolio-modal_content">
        <div className="portfolio-modal_content_header">
          <div className="portfolio-modal_content_header-title">My portfolio</div>
          <div className="portfolio-modal_content_header-close">
            <Button variant="regular" onClick={handleClose}>
              <AiOutlineClose />
            </Button>
          </div>
        </div>
        <div className="portfolio-modal_content_body">
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
                <TableHeaderCell className="portfolio_modal_table_header-actions">Actions</TableHeaderCell>
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
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  ) : null;
};
