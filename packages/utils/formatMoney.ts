export const formatIdr = (money: number) => {
  const idr = money.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  return idr
};
