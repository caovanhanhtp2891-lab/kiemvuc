# Bản triển khai v2 — 04/11/2026

Địa chỉ chạy: https://caovanhanhtp2891-lab.github.io/kiemvuc/

## Thử toàn bộ nội dung

1. Ở màn hình mở đầu chọn **Thử toàn bộ Lv400**, hoặc dùng nút **Thử Lv400** khi đã chơi.
2. **Đổi phái** mở 14 lựa chọn. Mỗi phái có đúng 8 kỹ năng ở cấp 10, gồm tuyệt kỹ. Bấm **Đóng** để quay ra chiến đấu.
3. **Bù nhìn** tạo mục tiêu đứng yên bất tử, nạp đầy máu/nội lực và làm mới hồi chiêu. Dùng phím 1–8 hoặc thanh kỹ năng để xem sát thương và hiệu ứng. Chuyển bản đồ hoặc Dẫn đường để thoát bù nhìn.
4. **M** mở 48 bản đồ. Chế độ thử được đi mọi vùng. **J** mở 86 nhiệm vụ, mở rộng danh sách và bấm **Thử** ở nhiệm vụ muốn kiểm tra, rồi **Dẫn đường**.
5. **Dịch vụ NPC** đưa tới NPC trong thành. Thử Tạp Hóa, Võ Sư, Thợ Rèn, Quản Kho, Mã Phu, Minh Chủ, Đấu Trường, Phó Bản và Truy Nã.
6. **Thú** cho đổi 8 thú cưng và 10 thú cưỡi đã mở trong chế độ thử. Nhóm NPC có y sư hồi phục và đồng đội tấn công.
7. **Về hành trình** nạp lại bản lưu chính. Mọi thay đổi trong chế độ thử chỉ ở bộ nhớ, không ghi đè tiến trình.

## Cơ chế đang chạy

- 14 cấu hình phái, 112 kỹ năng; mở theo cấp và tốn tiền học, điểm để nâng cấp, nội lực và thời gian hồi.
- Sát thương phân biệt phòng thủ vật lý/phép, bạo kích; hiệu ứng đợt đánh và trạng thái thực sự tác động lên quái. Hộ thể boss giảm sát thương, nhóm NPC làm giảm tác dụng hộ thể.
- 48 map sinh quái theo bảng; 146 mẫu chỉ số, 39 boss. Địa hình, tọa độ sinh, hình vẽ và AI là triển khai riêng. Mỗi họ sinh vật dùng một kiểu hình vẽ mới, không có 146 ảnh nguyên bản riêng biệt.
- 86 nhiệm vụ thực thi các điều kiện kill/boss/collect/talk/learn/forge/party. Có đủ 12 ánh xạ rơi vật phẩm thu thập. Khi túi đầy, thưởng trang bị vào kho; nếu cả hai đầy thì giữ thưởng chờ người chơi giải phóng chỗ.
- Trang bị 10 vị trí, 35 bậc, 6 phẩm chất; chỉ số phụ xác định theo ID để không đổi khi tải lại; cường hóa +15 có xác suất, bảo hiểm và thuốc tăng tỷ lệ. Ngọc tác động tới chỉ số thật.
- Tự lưu và chuyển bản v1, nhập/xuất JSON có kiểm tra dữ liệu. Thưởng vắng mặt là công thức riêng, tối đa 480 phút và dựa trên đồng hồ máy.

## Bằng chứng kiểm tra

- Node: 12 bài kiểm tra qua; có mô phỏng toàn bộ 86 nhiệm vụ và kiểm tra từng phần thưởng.
- Trình duyệt: đã đổi đủ 14 phái và thi triển đủ 112 kỹ năng trên bù nhìn; cả 112 lần đều xuất hiện hồi chiêu, không có lỗi JavaScript từ ứng dụng trong lượt thử.
- Đã đi map cuối **Vĩnh Kiếp Tận Thế**, thấy boss cấp 400; đã thử tự đánh và nhận tiến độ nhiệm vụ trong hành trình cấp thấp.
- Đã hạ **Vua Lợn Rừng**, nhận thưởng **Áo bậc 2**, cường hóa +1 (đá 300→299), đục 1 lỗ và khảm Hỏa Ngọc cấp 1; đồ tăng chỉ số Công +6.
- Đã đổi đủ 8 thú cưng và 10 thú cưỡi, chuyển qua 9 bản đồ có đủ 20 họ sinh vật; không ghi nhận lỗi JavaScript từ game trong lượt thử này.
- Đã kiểm tra giao diện dịch vụ hiển thị 15 vai trò NPC. Kiểm thử đồ họa/luật không xác nhận tính tương đương với máy chủ Chiến Hồn.
- Chưa kiểm tra trên điện thoại thật hoặc toàn bộ hành trình Lv1→400 theo thời gian thực. Giao diện có CSS thích ứng và nút chạm.

## Phần chưa triển khai

Máy chủ gốc, dữ liệu tài khoản, sprite/ảnh/âm thanh gốc và lời thoại gốc không có trong dự án. Chưa có đăng nhập, nhiều người, PK online, bang hội, chat, đấu giá, bảng xếp hạng, thanh toán hoặc sự kiện phía máy chủ. Đấu trường và tổ đội là NPC; phó bản là luật tự viết. Không tuyên bố sao chép toàn bộ webgame hay giống 100%.
