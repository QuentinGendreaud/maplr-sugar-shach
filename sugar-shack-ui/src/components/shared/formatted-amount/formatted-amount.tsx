import React from 'react';

function FormattedAmount(props: { amount: number }) {
  const displayedAmount = new Intl.NumberFormat(window.navigator.language, { style: 'currency', currency: 'CAD' }).format(props.amount);
  return <span>{displayedAmount}</span>;
}
export default FormattedAmount;
