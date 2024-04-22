export const landingPagesData_Json = ({ productId, data }) => {
  const newData = data || [];
  const productData = Array.isArray(newData) && newData.find((d) => d.keys.includes(productId) === true);
  return productData ? productData.data : [];
};
