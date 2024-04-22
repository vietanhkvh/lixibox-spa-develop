const renderDesktop = () => {
  return (
    <div className={'<info-detail-container'}>
      <div className={'info-content'}>
        <h2>Cách mời bạn bè như thế nào?</h2>
        <div className={'answer'}>
          <p>Đây là chương trình mời bạn bè mua hàng trên Lixibox, cả hai bạn sẽ nhận được ưu đãi đặc biệt.</p>
          <p>
            1. Đăng nhập vào <a href={'https://www.lixibox.com/'}>Lixibox</a>, sau đó truy cập{' '}
            <a href={'https://www.lixibox.com/invite'}>https:// www.lixibox.com/invite</a>, trong đó sẽ có một đường
            link của bạn. Mỗi user có một đường link riêng.
          </p>
          <p>2. Gởi link đó cho bạn bè và mời họ nhấp vào link để đăng kí thành viên, mua hàng ở Lixibox.</p>
        </div>
        <h2>Mời bạn bè thì được ưu đãi gì?</h2>
        <div className={'answer'}>
          <p>
            Với mỗi hình chụp sản phẩm kèm #Lixibox, nhận ngay 100 Lixicoin Chụp ảnh selfie với sản phẩm hoặc box kèm
            #Lixibox và #LixiSelfie, nhận ngay 200 Lixicoin Quay clip đập hộp kèm #Lixibox nhận ngay 200 Lixicoin
          </p>
          <p>
            Lixicoin có thể được sử dụng để đổi quà tại <a href={'https://www.lixibox.com/redeem'}>Đây</a>. Tìm hiểu
            thêm về <a href={'https://www.lixibox.com/lixicoin'}>Lixicoin</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default renderDesktop;
