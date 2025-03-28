interface IOrder {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}
export const isValidOrder = (order: IOrder): boolean => {
  return (
    Array.isArray(order.ingredients) &&
    typeof order._id === 'string' &&
    typeof order.status === 'string' &&
    typeof order.number === 'number' &&
    typeof order.createdAt === 'string' &&
    typeof order.updatedAt === 'string' &&
    typeof order.name === 'string'
  );
};
