# Thông số gameplay quan sát từ Chiến Hồn

Bộ tham chiếu này ghi lại các thông số công khai quan sát được ngày **04/11/2026** để phục vụ phân tích và phát triển một bản game tự viết. Dữ liệu được tổ chức lại theo lược đồ JSON/CSV mới, cùng phần giải thích và công thức được diễn đạt lại.

Đây **không phải toàn bộ mã nguồn Chiến Hồn**. Bộ tệp không chứa HTML/JavaScript/CSS gốc, mã vẽ gốc, ảnh/sprite gốc, lời thoại NPC hay nội dung kể chuyện của nhiệm vụ. Máy chủ, cơ sở dữ liệu và dữ liệu tài khoản không được truy cập. Các bảng đã được chuyển sang `dist/content.js` và tích hợp vào engine Kiếm Vực v2 tự viết. Xem [phạm vi triển khai](../implementation-v2.md); việc tích hợp không biến engine này thành mã nguồn gốc hoặc bảo đảm hành vi giống máy chủ gốc.

## Đã xác định được những gì?

| Hạng mục | Số lượng quan sát được | Nội dung có trong bộ tham chiếu |
| --- | ---: | --- |
| Môn phái | 14 | Tên, chỉ số chính, chỉ số gốc, tầm đánh, nhịp đánh, loại sát thương |
| Kỹ năng | 112 | 98 kỹ năng thường + 14 tuyệt kỹ; mỗi phái 7 thường và 1 tuyệt kỹ |
| Cấp nhân vật | 1–400 | Bảng EXP từng cấp, EXP tích lũy và công thức |
| Bản đồ | 48 | Tên, khoảng cấp, kích thước, danh sách quái, boss và NPC trong danh sách thành trấn |
| Thành trấn an toàn | 9 | Được tính trong 48 bản đồ |
| Mẫu quái và boss | 146 | Trong đó có 39 mẫu được đánh dấu boss |
| Nhiệm vụ | 86 | Cấp yêu cầu, NPC giao, mục tiêu, số lượng và phần thưởng |
| Nhóm NPC | 15 | Chức năng được tóm tắt và các thành trấn có khai báo NPC đó |
| Vật phẩm cố định ban đầu | 46 | Giá, điều kiện cấp, thông số dùng được; chưa tính các mục được sinh bằng vòng lặp |
| Thú cưng / thú cưỡi | 8 / 10 | Tên và chỉ số cộng thêm |
| Thế lực | 4 | Tên và chỉ số thưởng |
| Vị trí trang bị / bậc trang bị | 10 / 35 | Loại vị trí, ngưỡng cấp, phẩm chất và tỷ lệ cường hóa |

Các con số trên mô tả **định nghĩa trong bản client đã quan sát**, không chứng minh rằng mọi nội dung đều được máy chủ mở cho người chơi. Các chế độ đặc biệt, thay đổi sau thời điểm quét và điều chỉnh của máy chủ có thể khác.

## 14 môn phái

| Mã | Môn phái | Chỉ số chính |
| --- | --- | --- |
| `kiem` | Kiếm Khách | Lực |
| `dao` | Bá Đao | Lực |
| `cung` | Thần Xạ | Thân |
| `phap` | Pháp Sư | Trí |
| `bua` | Đạo Sĩ | Trí |
| `thich` | Thích Khách | Thân |
| `loi` | Lôi Chấn Hiệp | Lực |
| `coquan` | Cơ Quan Sư | Trí |
| `anha` | Ảnh Nha Khách | Thân |
| `thuan` | Huyền Thuẫn Tướng | Lực |
| `camy` | Cẩm Y Vệ | Thân |
| `thuong` | Long Thương Tướng | Lực |
| `cam` | Thiên Âm Cầm Sư | Trí |
| `liem` | U Minh Liêm Sư | Thân |

Chỉ số gốc, nhịp đánh và tầm đánh chi tiết nằm trong [classes.csv](classes.csv) và [classes.json](classes.json). Chỉ số chính trong bảng này được đối chiếu với cấu hình client, không được tự suy ra từ tên phái.

## Danh mục tệp

| Tệp | Dùng để làm gì? |
| --- | --- |
| [snapshot_manifest.json](snapshot_manifest.json) | Nguồn, thời điểm, số lượng, giới hạn và dấu SHA-256 của các tài liệu đã đọc |
| [classes.json](classes.json) / [classes.csv](classes.csv) | Cấu hình cơ bản của 14 phái |
| [skills.json](skills.json) / [skills.csv](skills.csv) | 112 kỹ năng: cấp mở, nội lực, hồi chiêu, hệ số sát thương và tham số cơ học |
| [levels_1_400.csv](levels_1_400.csv) | EXP lên cấp và EXP tích lũy từ cấp 1 tới 400 |
| [maps.json](maps.json) / [maps.csv](maps.csv) | 48 bản đồ và danh sách sinh quái, boss, NPC |
| [creatures.json](creatures.json) / [creatures.csv](creatures.csv) | 146 mẫu quái/boss và chỉ số nền được tính theo công thức client |
| [quests.json](quests.json) / [quests.csv](quests.csv) | Điều kiện và phần thưởng của 86 nhiệm vụ |
| [npc_roles.json](npc_roles.json) | Vai trò NPC và nơi có khai báo trong danh sách thành trấn |
| [items_equipment.json](items_equipment.json) | Vật phẩm, ngọc, loại trang bị, cấp trang bị và cường hóa |
| [companions.json](companions.json) | Thú cưng, thú cưỡi và thế lực |
| [mechanics.json](mechanics.json) | Công thức và giới hạn chiến đấu đã quan sát |
| [asset_inventory.json](asset_inventory.json) | Các tham chiếu ảnh và cách game tạo đồ họa; không kèm ảnh gốc |
| [effect_inventory.json](effect_inventory.json) | Loại cơ chế kỹ năng và một số nhãn hiệu ứng quan sát được; không kèm mã vẽ |
| [reference_checks.json](reference_checks.json) | Kết quả đối chiếu tham chiếu quái/boss giữa bản đồ, nhiệm vụ và danh sách quái |

CSV dùng UTF-8 có BOM để mở thuận tiện trong Excel. Các ô có dữ liệu lồng nhau chứa chuỗi JSON; bản `.json` phù hợp hơn khi nhập vào mã dự án.

## Cấp độ, kỹ năng và sát thương

Nhân vật có giới hạn cấp 400. Mỗi lần tăng cấp nhận 5 điểm tiềm năng và 1 điểm kỹ năng. Kỹ năng có tối đa 10 cấp; tuyệt kỹ được khai báo ở cấp nhân vật 120, tiêu tốn 150 nội lực và hồi chiêu 45 giây.

Hệ số sát thương kỹ năng tăng 12% của hệ số gốc cho mỗi cấp kỹ năng sau cấp đầu tiên. Vì vậy, ở cấp kỹ năng 10, hệ số bằng **2,08 lần hệ số cấp 1**. Các trường `damage_multiplier_at_skill_level_1` và `damage_multiplier_at_skill_level_10` là hệ số của một lần áp dụng sát thương; không mặc định coi đó là tổng sát thương của cả kỹ năng nhiều đợt.

Sát thương ra thông thường được mô tả như sau: lấy tấn công nhân với hệ số kỹ năng và hệ số ngẫu nhiên 0,9–1,1; nếu bạo kích thì nhân tiếp hệ số bạo kích; sau đó trừ 50% chỉ số phòng thủ tương ứng của mục tiêu, giữ sát thương tối thiểu và làm tròn. Đây là bước nền: hộ thể boss, thú cưng, hiệu ứng và các nhánh xử lý online có thể thay đổi kết quả tiếp theo.

Thông số được ghi nhận còn có giới hạn bạo kích 75%, né tránh 45%, bạo kích cơ bản 150%, giảm thời gian choáng lên boss còn 40%, cùng các tham số cháy, độc, hồi phục, khiên, hút máu, đẩy lùi và làm chậm. Xem công thức cụ thể trong `mechanics.json` và tham số từng chiêu trong `skills.json`.

Chỉ số quái trong `creatures.json` được tính lại độc lập từ cấp và hệ số quan sát được. Chúng chưa gồm biến thể tinh anh ngẫu nhiên, hiệu ứng đang có, hộ thể và điều chỉnh chế độ đặc biệt. Không được dùng riêng bảng này để kết luận sát thương thực tế trên máy chủ.

## NPC, hiệu ứng và hình ảnh

Danh sách NPC gồm các vai trò giao nhiệm vụ, tạp hóa, thợ rèn, võ sư, kho, mã phu, đấu trường, truy nã, phó bản và tổ đội. Bộ tham chiếu tóm tắt vai trò, không sao chép lời thoại.

Nhiều nhân vật, quái, đồ vật và hiệu ứng trong game được tạo bằng **Canvas**. Do đó, lấy danh sách URL ảnh không tạo ra được nguyên bộ đồ họa. Các hiệu ứng vòng, tia, kiếm khí, đạn, hạt và chuyển động phụ thuộc mã vẽ và trạng thái của engine.

Trong gói client quan sát được có một bảng frame cụ thể cho sprite Kiếm Khách nam, gồm 20 frame và được dùng khi chế độ sprite tùy chọn được bật. Điều này không có nghĩa mỗi phái đều có một sheet ảnh riêng đã công khai. Cũng có tham chiếu biểu tượng ứng dụng, ảnh chia sẻ và ảnh ủng hộ.

Các yêu cầu HEAD kiểm tra những URL ảnh được khai báo đều trả về HTTP 403. Vì vậy **chưa xác minh được sự tồn tại hoặc khả năng tải bằng GET** của các tệp đó; không thử đường dẫn khác hoặc biện pháp vượt hạn chế. Bộ tệp không chứa pixel ảnh, bản cắt sprite, frame đồ họa hoặc âm thanh gốc.

Nhạc và tiếng chiến đấu có phần được tổng hợp bằng Web Audio. Một tính năng nghe truyện riêng có sử dụng dịch vụ máy chủ; không thu thập luồng âm thanh đó.

## Engine Kiếm Vực và phần máy chủ còn thiếu

Các bảng thông số không thay thế được engine. Kiếm Vực v2 đã viết độc lập phần thi triển kỹ năng, AI, điều hướng đơn giản, hoạt ảnh Canvas, xử lý 86 nhiệm vụ, sinh trang bị và lưu tiến trình. Các tính năng nhiều người còn cần máy chủ tài khoản, đồng bộ trạng thái, xác thực chiến đấu, tổ đội, bang hội, chat, xếp hạng và boss thế giới.

Website công khai không cung cấp mã máy chủ hay cơ sở dữ liệu. Bản client còn dựa vào dịch vụ online và kiểm tra môi trường chạy, nên lưu một trang HTML không tạo thành một bản game độc lập hoàn chỉnh. Bộ tham chiếu không sửa hoặc vượt các kiểm tra đó.

## Nguồn đọc

- [Trang game](https://chienhon.top/)
- [Môn phái](https://chienhon.top/diendan/mon-phai.html)
- [Bản đồ](https://chienhon.top/diendan/ban-do.html)
- [Nhiệm vụ](https://chienhon.top/diendan/nhiem-vu.html)
- [Trang bị](https://chienhon.top/diendan/trang-bi.html)
- [Boss](https://chienhon.top/diendan/boss.html)
- [Hướng dẫn](https://chienhon.top/diendan/huong-dan.html)
- [Giới thiệu tác giả](https://chienhon.top/gioi-thieu.html)

Trang ghi tác giả Hoàng Quang Nam và bảo lưu quyền đối với game. Bộ tham chiếu chỉ cung cấp các quan sát, thông số và phân tích được tổ chức lại, không chuyển giao quyền dùng mã hoặc tài nguyên gốc.
