import { CategoryInfo, OrderResult, OrderSuccessInfo, ProductOrder } from 'older/pages/types';
import { formatMenuOptionOrderList } from 'older/utils';

const BASE_API_DOMAIN = "https://jnu-team-05.uc.r.appspot.com";

const fetchJSON = async (url: URL, option?: {}) => {
  const response = await fetch(url, option);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const fetchMenus = async (): Promise<CategoryInfo[] | undefined> => {
  try {
    if (!BASE_API_DOMAIN) {
      console.error('BASE_API_DOMAIN is not defined');
      return;
    }

    const url = `${BASE_API_DOMAIN}/api/products`;
    return await fetchJSON(new URL(url));
  } catch (error) {
    console.error(error);
  }
};


export const requestCardOrder = async (
  orderList: ProductOrder[],
  totalPrice: number
): Promise<OrderResult | undefined> => {
  const formattedOrderList = formatMenuOptionOrderList(orderList);
  const json = JSON.stringify({
    orderProducts: formattedOrderList,
    totalPrice: totalPrice,
  });
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: json,
  };

  try {
    const url = new URL('api/payment/card', BASE_API_DOMAIN);
    return await fetchJSON(url, option);
  } catch (error) {
    console.error(error);
  }
};

export const fetchReceipt = async (orderId: number): Promise<OrderSuccessInfo | undefined> => {
  try {
    const url = new URL(`api/receipt?orderId=${orderId}`, BASE_API_DOMAIN);
    return await fetchJSON(url);
  } catch (error) {
    console.error(error);
  }
};

export const requestCashOrder = async (
  orderList: ProductOrder[],
  totalPrice: number,
  receivedPrice: number
): Promise<OrderResult | undefined> => {
  const formattedOrderList = formatMenuOptionOrderList(orderList);
  const json = JSON.stringify({
    orderProducts: formattedOrderList,
    totalPrice: totalPrice,
    receivedPrice: receivedPrice,
  });
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: json,
  };

  try {
    const url = new URL('api/payment/cash', BASE_API_DOMAIN);
    return await fetchJSON(url, option);
  } catch (error) {
    console.error(error);
  }
};

export const failCardOrder = async (
  orderList: ProductOrder[],
  totalPrice: number
): Promise<OrderResult | undefined> => {
  const formattedOrderList = formatMenuOptionOrderList(orderList);
  const json = JSON.stringify({
    orderItems: formattedOrderList,
    totalPrice: totalPrice,
  });
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: json,
  };

  try {
    const url = new URL('api/payment/card?fail=500', BASE_API_DOMAIN);
    return await fetchJSON(url, option);
  } catch (error) {
    console.error(error);
  }
};
