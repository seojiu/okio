import { Categories, CategoryInfo, OrderItem, ProductInfo, ProductOrder, Products } from 'younger/pages/types';

export const formatProducts = (menuData: CategoryInfo[]) => {
  const products: Products = {};

  menuData.forEach((category: CategoryInfo) => {
    category.products.forEach((product: ProductInfo) => {
      products[product.productId] = product;
    });
  });

  return products;
};

export const formatAllCategories = (menuData: CategoryInfo[]) => {
  const formattedMenuData: Categories = {};
  menuData.forEach(category => {
    formattedMenuData[category.categoryId] = category;
  });

  return formattedMenuData;
};

export function formatSameProductIdList(orderList: ProductOrder[]) {
  const formattedOrderList: ProductOrder[] = [];

  orderList.forEach(order => {
    const { productId, size, amount } = order;
    const orderItem = formattedOrderList.find(item => item.productId === productId && item.size === size);
    if (orderItem) {
      orderItem.amount += amount;
    } else {
      formattedOrderList.push({ ...order });
    }
  });

  return formattedOrderList;
}

export function formatMenuOptionOrderList(orderList: ProductOrder[]) {
  const formattedOrderList: ProductOrder[] = [];

  orderList.forEach(order => {
    const { productId, size, temperature, amount } = order;
    const orderItem = formattedOrderList.find(
      item => item.productId === productId && item.size === size && item.temperature === temperature
    );
    if (orderItem) {
      orderItem.amount += amount;
    } else {
      formattedOrderList.push({ ...order });
    }
  });

  return formattedOrderList;
}

export function calculateTotalAmount(orderProducts: OrderItem[]): Record<string, number> {
  const AmountByMenu: Record<string, number> = {};

  orderProducts.forEach(item => {
    const { name, amount } = item;
    if (AmountByMenu[name]) {
      AmountByMenu[name] += amount;
    } else {
      AmountByMenu[name] = amount;
    }
  });
  return AmountByMenu;
}
export const formatAllMenus = (menuData: CategoryInfo[]) => {
  const allMenus: ProductInfo[] = [];
  
  menuData.forEach((category: CategoryInfo) => {
    category.products.forEach((product: ProductInfo) => {
      allMenus.push(product);
    });
  });

  return allMenus;
};

export const formatOrderList = (orderList: ProductOrder[]) => {
  const formattedList: ProductOrder[] = [];

  orderList.forEach(order => {
    const foundOrder = formattedList.find(item => item.productId === order.productId);
    if (foundOrder) {
      foundOrder.amount += order.amount;
    } else {
      formattedList.push({ ...order });
    }
  });

  return formattedList;
};
