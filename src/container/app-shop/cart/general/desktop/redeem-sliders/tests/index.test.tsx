import Modal from 'react-modal';
jest.mock('../../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../../utils/test-utils';
import { INITIAL_STATE_CART } from '../../../../../../../flows/cart/reducer';
import { INITIAL_STATE_AUTH } from 'flows/auth/reducer';
import RedeemSlider from '../container';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const redeemable = {
  special: {
    index: [
      {
        id: 10126,
        avg_rate: 5,
        brand_name: 'Charlotte Tilbury',
        coins_price: 83000,
        for_redeem: true,
        is_individual: true,
        is_saleable: false,
        like_count: 10,
        name: 'Kem Dưỡng Da Xóa Nếp Nhăn Tăng Cường Độ Ẩm Charlotte’s Magic Cream 50ml',
        original_price: 2500000,
        price: 2500000,
        primary_picture: {
          facebook_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/445/facebook/1570421454.jpg?t=1617778088',
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/445/large/1570421454.jpg?t=1617778088',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/445/medium/1570421454.jpg?t=1617778088',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/445/original/1570421454.jpg?t=1617778088',
          square_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/445/square/1570421454.jpg?t=1617778088',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/445/thumb/1570421454.jpg?t=1617778088',
          vertical_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/445/vertical/1570421454.jpg?t=1617778088'
        },
        rating: {
          avg_rate: 5,
          count: 1
        },
        short_description:
          "Kem dưỡng Charlotte Tilbury Charlotte's Magic Cream Ngoài dòng son và các sản phẩm trang điểm nổi trội, Charlotte Tilbury cũng cực kỳ thành công với các dòng dưỡng da của mình. Kem dưỡng da Charlotte’s Magic Cream là sản phẩm kem dưỡng đang cực hot với khả năng sản xuất collage và năng lượng tế bảo, sản phẩm giúp làm chống lại sự xuất hiện các nếp nhăn, tăng cường độ ẩm cho làn da, giúp da luôn rạng rỡ. Kem dưỡng da Charlotte’s Magic Cream với công thức Instant Turnaround Moisturiser Hydratant Instantané được ví như phép lạ cho làn da, Magic Cream chứa đựng bí quyết chống lão hoá, bổ sung dưỡng chất cải thiện làn da hư tổn, không đều màu thiếu sức sống trở nên rạng rỡ và ngậm nước tuyệt hảo nuôi dưỡng da từ sâu bên trong. Sản phẩm có kết cấu kem mỏng mịn, thành phần bao gồm BioNymph Peptide Complex với khả năng kích thích tế bào sản sinh collagen và năng lượng tế bào, giúp ngăn chặn nếp nhăn. Công thức sản phẩm còn chứa Hyaluronic Axit như một tấm màng giúp giữ ẩm cho làn da, cho da luôn căng mượt. Có chứa dầu dâu tằm kết hợp cùng Vitamin E sẽ mang đến cho bạn một làn da cực kì rạng rỡ, phục hồi làn da khi bạn thiếu ngủ hay căng thẳng. Sản phẩm rất thích hợp khi thời tiết hanh khô hay trong môi trường điều hòa, máy lạnh cả ngày. Kem dưỡng da dưỡng ẩm với các vitamin và oil cần thiết giúp da phục hồi, căng đầy và nuôi dưỡng da chống lão hoá. chất kem cực kì mềm mượt, dưỡng ẩm tối đa và thẩm thấu cực nhanh làm cho làn da mềm mượt, glowy suốt. Có thể dùng trước khi makeup 1 tiếng để da thật căng mọng nha.",
        slug: 'charlotte-tilbury-charlottes-magic-cream-50-ml',
        status: 'rejected',
        stock: 0
      },
      {
        id: 10172,
        avg_rate: 0,
        brand_name: 'Sephora',
        coins_price: 67000,
        for_redeem: true,
        is_individual: true,
        is_saleable: false,
        like_count: 31,
        name: 'Bộ trang điểm Sephora Favorites The Next Big Thing 2019',
        original_price: 2000000,
        price: 2000000,
        primary_picture: {
          facebook_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/957/facebook/1572936315.jpg?t=1619060135',
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/957/large/1572936315.jpg?t=1619060135',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/957/medium/1572936315.jpg?t=1619060135',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/957/original/1572936315.jpg?t=1619060135',
          square_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/957/square/1572936315.jpg?t=1619060135',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/957/thumb/1572936315.jpg?t=1619060135',
          vertical_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/957/vertical/1572936315.jpg?t=1619060135'
        },
        rating: {
          avg_rate: 0,
          count: 0
        },
        short_description:
          '- 0.05 oz/ 1.5 g Artist Couture Diamond Lights Finisher in Spotlight Glitz (silver and pink reflects) - 0.17 oz/ 5 g Kaja Cheeky Stamp Blendable Blush in 04 Feisty (cool raspberry) - 0.14 oz/ 4.05 g Melt Cosmetics Lipstick in Old Rose (dusty rose) - 0.141 oz/ 4 g Natasha Denona Mini Diamond & Glow Cheek Duo - 0.085 oz/ 2.5 g Violet Voss Eye Glitter Topper in Dream (opaque rose gold with silver shimmer) - 0.17 oz/ 5 mL FARSÁLI Liquid Glass Radiance Serum - 0.21 oz/ 6 g Milk Makeup Cooling Water Mini',
        slug: 'sephora-favorites-the-next-big-thing-2019',
        status: 'rejected',
        stock: 0
      }
    ],
    fetching: false,
    loaded: true,
    errored: false
  },
  user: {
    index: [
      {
        id: 3377,
        avg_rate: 4.78788,
        brand_name: 'Halio',
        coins_price: 1500,
        for_redeem: true,
        is_individual: true,
        is_saleable: true,
        like_count: 173,
        name: 'Dây sạc máy rửa mặt Halio Facial Cleansing & Massaging Device đầu USB',
        original_price: 100000,
        price: 100000,
        primary_picture: {
          facebook_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/012/599/facebook/1491810469.jpg?t=1628770695',
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/012/599/large/1491810469.jpg?t=1628770695',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/012/599/medium/1491810469.jpg?t=1628770695',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/012/599/original/1491810469.jpg?t=1628770695',
          square_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/012/599/square/1491810469.jpg?t=1628770695',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/012/599/thumb/1491810469.jpg?t=1628770695',
          vertical_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/012/599/vertical/1491810469.jpg?t=1628770695'
        },
        rating: {
          avg_rate: 4.8,
          count: 132
        },
        short_description: 'Dây sạc máy rửa mặt Halio đầu USB',
        slug: 'day-sac-may-rua-mat-halio-dau-usb',
        status: 'approved',
        stock: 5
      },
      {
        id: 11260,
        avg_rate: 4.78161,
        brand_name: 'The Auragins',
        coins_price: null,
        for_redeem: false,
        is_individual: true,
        is_saleable: true,
        like_count: 23,
        name: 'Băng Đô The Auragins',
        original_price: 50000,
        price: 50000,
        primary_picture: {
          facebook_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/340/facebook/1602579433.jpg?t=1628757547',
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/340/large/1602579433.jpg?t=1628757547',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/340/medium/1602579433.jpg?t=1628757547',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/340/original/1602579433.jpg?t=1628757547',
          square_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/340/square/1602579433.jpg?t=1628757547',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/340/thumb/1602579433.jpg?t=1628757547',
          vertical_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/340/vertical/1602579433.jpg?t=1628757547'
        },
        rating: {
          avg_rate: 4.8,
          count: 87
        },
        short_description: 'Băng Đô The Auragins',
        slug: 'bang-do-the-auragins',
        status: 'approved',
        stock: 10
      }
    ],
    fetching: false,
    loaded: true,
    errored: false
  },
  latest: {
    index: [
      {
        id: 9366,
        avg_rate: 5,
        brand_name: 'ReFa',
        coins_price: 220000,
        for_redeem: true,
        is_individual: true,
        is_saleable: false,
        like_count: 35,
        name: 'Dụng Cụ Massage Thon Gọn Mặt ReFa Carat Face',
        original_price: 6578000,
        price: 6578000,
        primary_picture: {
          facebook_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/721/facebook/1542698099.jpg?t=1619974244',
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/721/large/1542698099.jpg?t=1619974244',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/721/medium/1542698099.jpg?t=1619974244',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/721/original/1542698099.jpg?t=1619974244',
          square_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/721/square/1542698099.jpg?t=1619974244',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/721/thumb/1542698099.jpg?t=1619974244',
          vertical_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/721/vertical/1542698099.jpg?t=1619974244'
        },
        rating: {
          avg_rate: 5,
          count: 2
        },
        short_description:
          'Được thành lập tại Nhật Bản vào năm 2009 và tiếp tục mở rộng phạm vi hoạt động của mình ra Châu Á, Châu Âu và Châu Mĩ; ReFa đã không ngừng phát triển và đã trở thành một thương hiệu mỹ phẩm nổi tiếng thế giới. Sản phẩm làm nên tên tuổi của hãng là các dụng cụ chăm sóc da mặt chuyên sâu với thiết kế con lăn, được sản xuất trên dây chuyền công nghệ hiện đại kết hợp với sự nghiên cứu, thiết kế tỉ mỉ từ các thợ thủ công để đảm bảo sản phẩm có thể hoạt động tốt trên mọi vị trí, bề mặt của da. Ngoài ra, ReFa còn có các sản phẩm chăm sóc da cũng như trang điểm để đáp ứng nhu cầu đa dạng của người tiêu dùng. Thanh lăn ReFa CARAT FACE là dụng cụ massage phần mặt, cổ của hãng ReFa (Nhật). Được thiết kế rất thông minh hình chữ Y với 2 quả cầu mặt cắt kim cương, có thể lăn 360 độ nhằm phát huy tối đa hiệu quả massage vùng mặt, cổ. Cơ chế hoạt động của ReFa Carat Face là dùng tay kéo 2 con lăn trên da mặt để mô phỏng những động tác massage, xoa bóp da của các chuyên gia giúp tiêu hao đi mỡ thừa ở mặt, cổ mang lại khuôn mặt V-line thon đẹp như mong muốn mà ko cần phải phẫu thuật thẩm mĩ hay mất nhiều thời gian vào việc đi tiệm spa. Một điểm siêu đặc biệt của Thanh lăn Refa Carat Face đó là được tích hợp miếng pin hấp thụ ánh sáng để sản sinh ra dòng điện siêu nhỏ (microcurrent). Dòng điện siêu nhỏ này có tác dụng giảm đau, hồi phục chấn thương, tăng cường lưu thông máu và đặc biệt tăng sản sinh collagen và elastin giúp trẻ hóa làn da.',
        slug: 'dung-cu-massage-mat-refa-carat-face',
        status: 'rejected',
        stock: 0
      },
      {
        id: 10233,
        avg_rate: 4.68023,
        brand_name: 'Halio',
        coins_price: 85000,
        for_redeem: true,
        is_individual: true,
        is_saleable: true,
        like_count: 1087,
        name: '[Pre-order: Chỉ 2160K - nhập HC2160] Máy Đẩy Tinh Chất Dưỡng Trắng Nóng Lạnh Halio Ion Hot & Cool Beauty Device-Màu Trắng',
        original_price: 2400000,
        price: 2400000,
        primary_picture: {
          facebook_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/048/318/facebook/1586322442.png?t=1631583059',
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/048/318/large/1586322442.png?t=1631583059',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/048/318/medium/1586322442.png?t=1631583059',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/048/318/original/1586322442.png?t=1631583059',
          square_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/048/318/square/1586322442.png?t=1631583059',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/048/318/thumb/1586322442.png?t=1631583059',
          vertical_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/048/318/vertical/1586322442.png?t=1631583059'
        },
        rating: {
          avg_rate: 4.7,
          count: 344
        },
        short_description:
          'Máy đẩy tinh chất dưỡng trắng nóng lạnh Halio Ion Hot & Cool đẩy nhanh tốc độ trị thâm và dưỡng trắng da của bạn. Với tích hợp các chức năng làm sạch sâu và đẩy dưỡng bằng công nghệ Ion hiện đại, đồng thời được nâng cấp thêm chế độ massage lạnh thu nhỏ chân lông, đây là công cụ hỗ trợ làm đẹp không thể thiếu giúp làn da trắng khỏe và căng mịn, chống lại các tác hại của ô nhiễm môi trường. Sản phẩm với các đặc điểm vượt trội: 1. Công nghệ Ion Galvanic kết hợp nhiệt nóng 45 độ C: kích thích các dưỡng chất thấm sâu vào hạ bì da, tăng gấp 3.5 lần hiệu quả trị thâm và dưỡng trắng so với thoa tay thông thường 2. Sóng rung F-Vibration: cải thiện tuần hoàn máu, nâng cơ và làm săn chắc da 3. Chế độ làm lạnh: mát xa da thư giãn, khóa dưỡng và se khít lỗ chân lông 4. 4 chế độ làm đẹp, 5 cấp độ mạnh nhẹ, an toàn cho cả làn da nhạy cảm. 4 chế độ chăm sóc chuyên sâu, hoàn chỉnh chu trình trị thâm và dưỡng trắng da của bạn: * Chế độ làm sạch (Deep Clean) Máy Halio Ion Hot & Cool sử dụng công nghệ làm sạch hiện đại bằng Ion (+) kết hợp nhiệt nóng và sóng rung làm sạch da toàn diện từ trong ra ngoài Ion (+) sinh ra từ đầu máy Halio sẽ hút và kéo chất bẩn, cặn trang điểm, tạp chất nằm sâu trong lỗ chân lông lên một cách dễ dàng mà các bước tẩy trang và rửa mặt thông thường chưa lấy hết được giúp da thông thoáng, sạch sẽ, nhờ vậy mà lỗ chân lông cũng nhỏ hơn và dưỡng chất cũng thấm sâu vào trong da hơn, loại trừ nguy cơ bị mụn ẩn dai dẳng do khâu làm sạch chưa tốt. Bạn sẽ cảm nhận da sáng sạch chỉ sau 1 lần đầu sử dụng. Nên sử dụng với các bông tẩy trang có độ dày < 0.5mm. * Chế độ đẩy tinh chất trị thâm và dưỡng trắng (Fully Absorb) Nếu bạn đang có nhu cầu trị thâm và dưỡng trắng, và bạn đầu tư nhiều sản phẩm cao cấp nhưng không đạt hiệu quả mong muốn, thì máy đẩy tinh chất Halio Ion Hot & Cool là một liệu pháp đáng cân nhắc. Chiếc máy cầm tay này tạo ra nguồn ion (-) kết hợp chặt với ion (+) trong tế bào da giúp đưa các tinh chất essence, ampoule, serum trắng sáng da,... đi sâu vào trong da. Đồng thời, nhiệt nóng và sóng rung phối hợp thúc đẩy quá trình này. Ion (-) của máy khi đi vào trong da cũng giúp tăng sản sinh collagen tái tạo da, loại bỏ sắc tố thâm nám và tàn nhang, giúp da trắng khỏe từ bên trong. Sản phẩm đạt hiệu quả cao nhất khi sử dụng kết hợp với các sản phẩm Tinh chất Mad Hippie Vitamin C Serum, Tinh chất Radha Beauty Skincare Vitamin C Serum... * Chế độ mặt nạ (Moisture) Nhiệt nóng 45 độ C giãn nở lỗ chân lông và sóng rung F-Vibration đẩy dưỡng chất từ mặt nạ vào sâu trong da. * Chế độ làm lạnh (Cool) Khác hoàn toàn với 3 bước ở trên (đều mang nhiệt nóng), ở bước này đĩa kim loại thân sau máy sẽ được làm lạnh xuống 10C so với nhiệt độ phòng giúp khóa chặt dưỡng chất đã thấm vào da, đồng thời se khít lỗ chân lông hiệu quả. Massage da với đầu lạnh giúp thon gọn gương mặt và mang lại cảm giác vô cùng dễ chịu và thư giãn như đi spa. *Lưu ý: Hiệu quả sản phẩm tuỳ thuộc vào cơ địa mỗi người Điểm khác biệt so với Halio Ion: - Thêm chế độ làm lạnh khóa dưỡng và se khít lỗ chân lông, đồng thời massage da mang lại cảm giác thư thái tuyệt vời - Nhiệt nóng 45 độ C và công nghệ sóng rung F-Vibration xuyên suốt 3 chế độ, thúc đẩy hơn nữa quá trình hấp thụ dưỡng chất, tăng hiệu quả trị thâm và dưỡng trắng của bạn đến 3.5 lần - Trang bị 2 đĩa kim loại, làm từ Aluminium (nhôm) cao cấp, dẫn nhiệt và giữ nhiệt tốt hơn - Màn hình LCD hiển thị đầy đủ thông tin về chế độ đang sử dụng, mức độ rung và lượng pin, tiện lợi cho người dùng. Sản phẩm gồm có - 1 máy Halio Ion Hot & Cool Beauty Device - 1 Dây sạc - 1 Hướng dẫn sử dụng - 1 Túi nhung - 1 Hộp máy Bảo hành : - Sau khi nhận máy, khách hàng vui lòng đăng kí bảo hành ngay để nhận được đầy đủ quyền lợi. - 1 đổi 1 trong vòng 1 năm - 1 đổi 1 trong vòng 1 năm chỉ áp dụng cho sản phẩm bị lỗi kỹ thuật do nhà sản xuất và không thể sửa được - Lixibox sẽ không bảo hành trong những trường hợp hư hỏng do tác động của ngoại lực - Thời hạn bảo hành trong vòng 1 năm tính từ ngày khách hàng nhận đơn hàng - Lixibox chỉ nhận bảo hành khi sản phẩm đưa về có đầy đủ phụ kiện hộp nhựa và cáp sạc - Chế độ bảo hành của sản phẩm đi kèm với mã đơn hàng. Không có phiếu bảo hành bằng giấy - Cách thức gửi sản phẩm về Lixibox để bảo hành: + Đối với sản phẩm mua online tại lixibox.com, khách hàng gọi điện hotline 1800 2040 để biết địa chỉ công ty, sau đó gửi về địa chỉ được cung cấp kèm mã đơn hàng hoặc số điện thoại. Phí giao hàng do người gửi chi trả, tức là khách hàng chi trả lượt đi và Lixibox chi trả lượt gửi về. Cửa hàng Lixibox không nhận bảo hành sản phẩm khách đã mua ở online lixibox.com + Đối với sản phẩm mua tại cửa hàng: khách hàng vui lòng đến cửa hàng đã mua sản phẩm kèm mã đơn hàng hoặc số điện thoại để gửi trả sản phẩm muốn bảo hành Lưu ý: Quý khách gửi hàng về bảo hành vui lòng gởi kèm cả hộp và cáp sạc, túi nhung, nếu không có đầy đủ phụ kiện Lixibox sẽ không nhận bảo hành. Hướng dẫn đăng ký thông tin bảo hành: - Bước 1: Lưu lại mã sản phẩm được in trên hộp sản phẩm - Bước 2: Nhập mã sản phẩm và điền đầy đủ thông tin đăng ký bảo hành qua https://halio-sonic.com/pages/guarantee - Bước 3: Sau khi đăng ký thành công, hệ thống sẽ gửi cho bạn email xác nhận mã bảo hành. Khi đến bảo hành, bạn chỉ cần đọc mã sản phẩm được in trên thân máy cùng mã đơn hàng HOẶC email xác nhận thông tin bảo hành từ hãng.',
        slug: 'halio-hot-cool-beauty-device',
        status: 'approved',
        stock: 0
      }
    ],
    fetching: false,
    loaded: true,
    errored: false
  }
};

const component = (params = {}) => {
  const props = {
    cartStore: Object.assign({}, INITIAL_STATE_CART, {
      redeemable
    }),
    authStore: INITIAL_STATE_AUTH
  };

  return <RedeemSlider {...(Object.assign({}, props, params) as any)} />;
};

describe('RedeemSlider', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
