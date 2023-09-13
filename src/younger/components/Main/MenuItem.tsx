import styles from './Main.module.css';

interface MenuItemProps {
  menuId: number;
  menuName: string;
  menuImg: string;
  menuPrice: number;
  hasLarge?: boolean;
  hasSmall?: boolean;
  hasHot?: boolean;
  hasIce?: boolean;
  classNames?: string[];
  openOrderModal?: () => void;
  setSelectedMenu?: any;
  handleMenuItemClick?: (menuName: string) => void;
}

export default function MenuItem({
  menuId,
  menuName,
  menuImg,
  menuPrice,
  hasLarge,
  hasSmall,
  hasHot,
  hasIce,
  openOrderModal,
  setSelectedMenu,
  handleMenuItemClick,
  classNames = [],
}: MenuItemProps) {
  const clickMenu = () => {
    setSelectedMenu &&
      setSelectedMenu({
        name: menuName,
        menuId: menuId,
        price: menuPrice,
        imgUrl: menuImg,
        hasLarge: hasLarge,
        hasSmall: hasSmall,
        hasHot: hasHot,
        hasIce: hasIce,
      });
    openOrderModal && openOrderModal();
  };

  return (
    <div
      onClick={() => {
        clickMenu();
        handleMenuItemClick && handleMenuItemClick(menuName);
      }}
      className={styles.menuItem + ' ' + classNames.join(' ')}
    >
      <img src={menuImg} alt={menuName} />
      <span>{menuName}</span>
      <span>{menuPrice}</span>
    </div>
  );
}
