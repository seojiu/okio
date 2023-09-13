import MenuItem from 'older/components/Main/MenuItem';
import { useState } from 'react';
import styles from './OrderModal.module.css';
import { ProductInfo } from 'older/pages/types';

interface ProductOrder {
  productId: number;
  size: string;
  temperature: string;
  amount: number;
  name: string; 
}
interface OrderModalProps {
  menu: ProductInfo;
  closeOrderModal: () => void;
  handleAddOrder: (menuOrder: ProductOrder) => void;
  // orderList: [];
  // setOrderList: (data: ProductOrder) => void;
}

export default function OrderModal({ menu, closeOrderModal, handleAddOrder }: OrderModalProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedTemp, setSelectedTemp] = useState('');
  const [amount, setAmount] = useState(1);
  const sendOrderData = (handleAddOrder: (menuOrder: ProductOrder) => void) => {
    const orderData = {
      productId: menu.productId,
      name: menu.name,
      size: selectedSize,
      temperature: selectedTemp,
      amount: amount,
    };
    handleAddOrder(orderData);
  };


  return (
    <div className={styles.wrap}>
      <CloseButton closeOrderModal={closeOrderModal} />
      <div className={styles.contents}>
        <MenuItem
          menuId={menu.menuId}
          menuName={menu.name}
          menuImg={menu.imgUrl}
          menuPrice={menu.price}
          hasHot={menu.hasHot}
          hasIce={menu.hasIce}
          hasLarge={menu.hasLarge}
          hasSmall={menu.hasSmall}
        />
        <MenuOption
          hasLarge={menu.hasLarge}
          hasSmall={menu.hasSmall}
          hasHot={menu.hasHot}
          hasIce={menu.hasIce}
          selectedSize={selectedSize}
          selectedTemp={selectedTemp}
          setSelectedSize={setSelectedSize}
          setSelectedTemp={setSelectedTemp}
          amount={amount}
          setAmount={setAmount}
        />
      </div>
      <AddButton
        handleAddOrder={handleAddOrder}
        closeOrderModal={closeOrderModal}
        sendOrderData={sendOrderData}
        selectedSize={selectedSize}
        selectedTemp={selectedTemp}
      />
    </div>
  );
}

function CloseButton({ closeOrderModal }: { closeOrderModal: () => void }) {
  return (
    <button className={styles.closeButton} type="button" onClick={closeOrderModal}>
      X
    </button>
  );
}

interface MenuOptionProps extends SizeOptionProps, TempOptionProps, AmountCounterProps {
  setSelectedSize: (size: string) => void;
  setSelectedTemp: (temp: string) => void;
}

function MenuOption({
  hasLarge,
  hasSmall,
  hasHot,
  hasIce,
  selectedSize,
  setSelectedSize,
  selectedTemp,
  setSelectedTemp,
  amount,
  setAmount,
}: MenuOptionProps) {
  return (
    <div className={styles.optionWrap}>
      <SizeOption
        hasSmall={hasSmall}
        hasLarge={hasLarge}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />
      <TempOption hasHot={hasHot} hasIce={hasIce} selectedTemp={selectedTemp} setSelectedTemp={setSelectedTemp} />
      <AmountCounter amount={amount} setAmount={setAmount} />
    </div>
  );
}

interface SizeOptionProps {
  hasLarge: boolean;
  hasSmall: boolean;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
}

function SizeOption({ hasSmall, hasLarge, selectedSize, setSelectedSize }: SizeOptionProps) {
  return (
    <div className={hasSmall && hasLarge ? styles.dualButtonWrap : styles.singleButtonWrap}>
      {hasSmall && (
        <button
          onClick={() => setSelectedSize('Small')}
          className={`${styles.optionButton} ${selectedSize === 'Small' ? `${styles.selected}` : ''}`}
        >
          Small
        </button>
      )}
      {hasLarge && (
        <button
          onClick={() => setSelectedSize('Large')}
          className={`${styles.optionButton} ${selectedSize === 'Large' ? `${styles.selected}` : ''}`}
        >
          Large
        </button>
      )}
    </div>
  );
}

interface TempOptionProps {
  hasHot: boolean;
  hasIce: boolean;
  selectedTemp: string;
  setSelectedTemp: (temp: string) => void;
}

function TempOption({ hasHot, hasIce, selectedTemp, setSelectedTemp }: TempOptionProps) {
  return (
    <div className={hasHot && hasIce ? styles.dualButtonWrap : styles.singleButtonWrap}>
      {hasHot && (
        <button
          onClick={() => setSelectedTemp('Hot')}
          className={`${styles.optionButton} ${selectedTemp === 'Hot' ? `${styles.selected}` : ''}`}
        >
          Hot
        </button>
      )}
      {hasIce && (
        <button
          onClick={() => setSelectedTemp('Ice')}
          className={`${styles.optionButton} ${selectedTemp === 'Ice' ? `${styles.selected}` : ''}`}
        >
          Ice
        </button>
      )}
    </div>
  );
}

interface AmountCounterProps {
  amount: number;
  setAmount: (amount: number) => void;
}

function AmountCounter({ amount, setAmount }: AmountCounterProps) {
  const plusAmount = () => {
    amount === 99 ? setAmount(99) : setAmount(amount + 1);
  };

  const minusAmount = () => {
    amount === 1 ? setAmount(1) : setAmount(amount - 1);
  };

  return (
    <div className={styles.counter}>
      <button onClick={minusAmount}>-</button>
      <div>
        <span>{amount}</span>
      </div>
      <button onClick={plusAmount}>+</button>
    </div>
  );
}

interface AddButtonProps {
  closeOrderModal: () => void;
  sendOrderData: (handleAddOrder: (menuOrder: ProductOrder) => void) => void;
  handleAddOrder: (menuOrder: ProductOrder) => void;
  selectedSize: string;
  selectedTemp: string;
}

function AddButton({ closeOrderModal, sendOrderData, handleAddOrder, selectedSize, selectedTemp }: AddButtonProps) {
  return (
    <button
      className={styles.addButton}
      type="button"
      onClick={() => {
        if (selectedSize !== '' && selectedTemp !== '') {
          closeOrderModal();
          sendOrderData(handleAddOrder);
        }
      }}
    >
      담기
    </button>
  );
}
