import { useEffect } from 'react';

import SummaryDeliveryList from '../../../../components/delivery/list';

interface IProps {
  fetchUserAddressListAction?: any;
}

const DeliveryContainer = ({ fetchUserAddressListAction }: IProps) => {
  useEffect(() => {
    fetchUserAddressListAction();
  }, []);

  return (
    <div className={'user-delivery-container'}>
      <SummaryDeliveryList />
    </div>
  );
};

export default DeliveryContainer;
