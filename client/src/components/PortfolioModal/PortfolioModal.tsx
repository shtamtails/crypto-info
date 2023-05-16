import { Modal, ModalDefaultProps } from "../../UI/Modal";
import { useContext, useState } from "react";
import { PortfolioModalElement } from "./PortfolioModalElement";
import "./PortfolioModal.styles.scss";
import { PortfolioContext } from "../../context/PortfolioContext/PortfolioContext";
import { Button } from "../../UI/Button";
import { TbRefresh } from "react-icons/tb";
import { updatePortfolioPrices } from "../../utils/portfolio/updatePortfolioPrices";
import { formatNumber } from "../../utils/formatNumber/formatNumber";

export const PortfolioModal: React.FC<ModalDefaultProps> = ({
  visible,
  setVisible,
}) => {
  const { portfolio, setPortfolio } = useContext(PortfolioContext);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    const updatedPortfolio = await updatePortfolioPrices(portfolio);
    setPortfolio(updatedPortfolio);
    localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio));
    setIsUpdating(false);
  };

  return (
    <>
      <Modal
        visible={visible}
        setVisible={setVisible}
        title="My portfolio"
        className="portfolio-modal"
      >
        <div className="portfolio-modal__controls">
          <div className="portfolio-modal__controls__sum">
            Total amount:
            <span className="bold margin-left-sm">
              {formatNumber(portfolio.newOverallSum, "fixed")}$
            </span>
          </div>

          <Button
            onClick={handleUpdate}
            className="portfolio-modal__controls__update"
          >
            {isUpdating ? (
              <div className="spinner flex aic jcc">
                <TbRefresh />
              </div>
            ) : (
              <TbRefresh />
            )}
          </Button>
        </div>

        {portfolio?.items.length ? (
          <table className="portfolio-modal__table">
            <thead className="portfolio-modal__table__header">
              <tr>
                <th className="portfolio-modal__table__header__rank">№</th>
                <th className="portfolio-modal__table__header__name">Name</th>
                <th className="portfolio-modal__table__header__amount">
                  Amount
                </th>
                <th className="portfolio-modal__table__header__price">Price</th>
                <th className="portfolio-modal__table__header__price-change">
                  Price Change
                </th>
                <th className="portfolio-modal__table__header__percent-change">
                  Percent Change
                </th>
                <th className="portfolio-modal__table__header__actions">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="portfolio-modal__table__body">
              {portfolio?.items.map((el, i) => (
                <PortfolioModalElement
                  number={i + 1}
                  key={el.id}
                  amount={el.amount}
                  name={el.name}
                  oldPriceUsd={el.oldPriceUSD}
                  newPriceUsd={el.newPriceUSD}
                  id={el.id}
                  symbol={el.symbol}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="portfolio-modal__empty">Portfolio is empty!</div>
        )}
      </Modal>
    </>
  );
};
