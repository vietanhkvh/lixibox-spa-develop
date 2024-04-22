const renderDesktop = () => {
  return (
    <div className={'<info-detail-container'}>
      <div className={'info-content'}>
        <h2>Chia sẻ như thế nào?</h2>
        <div className={'answer'}>
          Chụp hình, viết cảm nhận về sản phẩm và chia sẻ lên Facebook, Instagram ở chế độ public. Copy đường dẫn vừa
          chia sẻ và truy cập <a href={'https://www.lixibox.com/loves/'}>https:// www.lixibox.com/loves/</a> để dán vào,
          sau đó bấm Xác nhận.
          <p> Lưu ý:</p>
          Lixibox chỉ xác nhận những chia sẻ ở chế độ public Chỉ chấp nhận những liên kết chia sẻ có cả hình ảnh và cảm
          nhận của bạn. Số lần tối đa chia sẻ dựa trên số đơn hàng bạn đã thanh toán.
        </div>
        <h2>Chia sẻ cảm nhận sẽ được ưu đãi gì?</h2>
        <div className={'answer'}>
          Với mỗi hình chụp sản phẩm kèm #Lixibox, nhận ngay 100 Lixicoin. Chụp ảnh selfie với sản phẩm hoặc box kèm
          #Lixibox và #LixiSelfie, nhận ngay 200 Lixicoin. Quay clip đập hộp kèm #Lixibox nhận ngay 200 Lixicoin.
          <p>
            Lixicoin có thể được sử dụng để đổi quà tại <a href={'https://www.lixibox.com/redeem'}>Đây</a>. Tìm hiểu
            thêm về <a href={'https://www.lixibox.com/lixicoin'}> Lixicoin</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default renderDesktop;
