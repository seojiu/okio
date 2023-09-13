import Main from 'older/components/Main';
import Cart from 'older/components/Main/Cart';
import CategoryNavbar from 'older/components/Navbar';
import menuOrderReducer, { MenuOrderAction } from 'menuOrderReducer';
import { Dispatch, SetStateAction, useMemo, useReducer } from 'react';
import { formatAllCategories, formatAllMenus, formatOrderList } from 'older/utils';
import { CategoryInfo, ProductOrder } from './types';
import React, { useRef, useState } from 'react';


interface MainPageProps {
  allMenus: CategoryInfo[];
}

export default function MainPage({ allMenus }: MainPageProps) {
  const [selectedCategoryId, setSelectedCategoryId]: [number, Dispatch<SetStateAction<number>>] = useState(
    allMenus[0].categoryId
  );
  const [orderList, dispatch]: [ProductOrder[], Dispatch<MenuOrderAction>] = useReducer(menuOrderReducer, []);

  const categoryNavbarInfo = useMemo(
    () =>
      allMenus.map((category: CategoryInfo) => {
        return { categoryId: category.categoryId, categoryName: category.categoryName };
      }),
    [allMenus]
  );
  const formattedMenuData = useMemo(() => formatAllCategories(allMenus), [allMenus]);
  const formattedMenus = useMemo(() => formatAllMenus(allMenus), [allMenus]);
  const currentMenus = formattedMenuData[selectedCategoryId]?.products || [];
  const formattedOrderList = useMemo(() => formatOrderList(orderList), [orderList]);
  const orderMenus = formattedOrderList.map(order => {
    const { productId, amount } = order;
    const menu = formattedMenus[productId];

    return { menu, amount };
  });
  const isOrderListEmpty = orderList.length === 0;

  const handleCategoryClick = (clickCategoryId: number) => setSelectedCategoryId(clickCategoryId);
  const handleAddOrder = (menuOrder: ProductOrder) => dispatch({ type: 'ADD_ORDER', payload: { newOrder: menuOrder } });
  const handleRemoveOrder = (productId: number, size: string) => dispatch({ type: 'REMOVE_ORDER', payload: { productId, size } });
  const handleRemoveAllOrders = () => dispatch({ type: 'RESET' });
  const homeRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<string>('/');

  const navigate = (path: string) => {
    setPage(path);
    window.history.pushState({}, '', path);
};



  return (
    <div className="mainPage">
      <CategoryNavbar
        selectedCategoryId={selectedCategoryId}
        categories={categoryNavbarInfo}
        handleCategoryClick={handleCategoryClick}
      />
      {currentMenus && <Main handleAddOrder={handleAddOrder} products={currentMenus} />}
      {!isOrderListEmpty && (
        <Cart
        homeRef={homeRef}
        orderList={orderList}
        handleRemoveOrder={handleRemoveOrder}
        handleRemoveAllOrders={handleRemoveAllOrders}
        products={currentMenus}
        navigate={navigate}
        />
      )}
    </div>
  );
}
