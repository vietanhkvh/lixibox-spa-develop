import { Cart } from 'types/api/cart';

interface GenerateServicesBriefProps {
  cartDetail: Cart;
  note: string;
  invoice: any;
}
export const generateServicesBrief = ({ cartDetail, note, invoice }: GenerateServicesBriefProps) => {
  var message = '';
  var serviceCount = 0;

  if (cartDetail?.accompanies) {
    serviceCount += cartDetail?.accompanies?.length || 0;
  }

  if (note) {
    serviceCount += 1;
  }

  if (serviceCount) {
    message += `Đã chọn ${serviceCount} dịch vụ`;
  }

  const hasInvoice =
    invoice?.code && invoice?.name && invoice?.address && invoice?.email && cartDetail?.invoice_requested;
  if (hasInvoice) {
    message += message ? ' và hoá đơn' : 'Đã chọn hoá đơn';
  }

  return message;
};
