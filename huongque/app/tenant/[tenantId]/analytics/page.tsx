import React from "react";
import Container from "../components/container";

export default function page() {
  return (
    <div className="flex flex-col gap-9 p-5">
      <Container>
        <h1 className="text-2xl font-bold">Danh sách cần làm</h1>
        <div className="grid grid-cols-3 gap-5 mt-7">
          <div className="flex flex-col justify-between items-center gap-2">
            <div className="text-2xl font-bold text-blue-500">0</div>
            <text>Chờ lấy hàng</text>
          </div>
          <div className="flex flex-col justify-between items-center gap-2">
            <div className="text-2xl font-bold text-blue-500">0</div>
            <text>Đã xử lý</text>
          </div>
          <div className="flex flex-col justify-between items-center gap-2">
            <div className="text-2xl font-bold text-blue-500">0</div>
            <text>Đơn trả hàng/Hủy/Hoàn tiền</text>
          </div>
        </div>
      </Container>

      <Container>
        <h1 className="text-2xl font-bold">Phân Tích Bán Hàng </h1>
        <div className="grid grid-cols-5 gap-5 mt-7">
            <SaleAnalytics title="Doanh thu" value={257} percentage={0} />
            <SaleAnalytics title="Số đơn hàng" value={257} percentage={0} />
            <SaleAnalytics title="Số sản phẩm" value={257} percentage={0} />
            <SaleAnalytics title="Lượt truy cập" value={257} percentage={0} />
            <SaleAnalytics title="Tỷ lệ chuyển đổi" value={257} percentage={0} />
        </div>
      </Container>
    </div>
  );
}

function SaleAnalytics({
  title,
  value,
  percentage,
}: {
  title: string;
  value: number;
  percentage?: number;
}) {
  return (
    <div className="flex flex-col justify-between items-center gap-2">
      <text>{title}</text>
      <text className=" text-2xl font-bold ">{value}</text>
      {percentage && <text className="text-green-600">{percentage}</text>}
    </div>
  );
}
