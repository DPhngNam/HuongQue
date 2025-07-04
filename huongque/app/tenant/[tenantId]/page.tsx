import React from "react";
import Container from "../../components/container";
import { Avatar } from "@radix-ui/react-avatar";
import SalesChart from "./charts/SalesChart";
import ReviewSummary from "./charts/ReviewSumary";
import OrderTable from "./components/OrderTable";
import ReturningRateChart from "./charts/ReturningRateChart";
import { Progress } from "@/components/ui/progress";

export default function page() {
  return (
    <div className="grid grid-cols-[1.5fr_1fr] gap-4 w-full px-5 bg-[#FBFBFD]">
      <div className="grid grid-cols-4 col-span-2 gap-4 w-full px-5">
        <Container>
          <div className="flex flex-col items-center justify-between h-full p-4">
            <div>
              <div className="justify-start text-Colors-Text-Text-Primary text-3xl font-semibold font-['Inter']">
                1,352
              </div>
              <div className="justify-start text-Colors-Text-Text-Secondary text-sm font-medium font-['Inter'] leading-normal">
                Lượt truy cập hàng ngày
              </div>
            </div>
            <div className="justify-start text-Colors-Text-Text-Primary text-sm font-medium font-['Inter'] leading-normal">
              Khách truy cập hàng đầu
            </div>
            <Avatar>
              <img
                src="https://images.unsplash.com/photo-1502685104226-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1hbnxlbnwwfHx8fDE2OTY5NzQ3NTg&ixlib=rb-4.0.3&q=80&w=400"
                alt="Ảnh đại diện người dùng"
                className="rounded-full"
              />
            </Avatar>
          </div>
        </Container>

        <Container>
          <div className="flex flex-col items-center  h-full p-4">
            <div className="flex justify-center items-center gap-3">
              <span className="text-Colors-Text-Text-Secondary text-base font-medium font-['Inter'] leading-normal">
                $
              </span>
              <span className="text-Colors-Text-Text-Primary text-3xl font-semibold font-['Inter']">
                51,352
              </span>

              <div
                data-size="Small"
                data-state="Secondary"
                data-type="Basic"
                className="px-2 py-1 bg-[#E7F8F3] rounded-2xl inline-flex justify-center items-center gap-2.5"
              >
                <div className="text-center justify-start text-[#11B886] text-xs font-medium font-['Inter']">
                  +12.5%
                </div>
              </div>
            </div>

            <span className="justify-start text-Colors-Text-Text-Secondary text-sm font-medium font-['Inter'] leading-normal">
              Doanh số trung bình hàng ngày
            </span>
          </div>
        </Container>

        <Container>
          <div className="flex flex-col items-center  h-full p-4">
            <div className="flex justify-center items-center gap-3">
              <span className="text-Colors-Text-Text-Primary text-3xl font-semibold font-['Inter']">
                1,352
              </span>

              <div
                data-size="Small"
                data-state="Secondary"
                data-type="Basic"
                className="px-2 py-1 bg-[#E7F8F3] rounded-2xl inline-flex justify-center items-center gap-2.5"
              >
                <div className="text-center justify-start text-[#11B886] text-xs font-medium font-['Inter']">
                  +12.5%
                </div>
              </div>
            </div>

            <span className="justify-start text-Colors-Text-Text-Secondary text-sm font-medium font-['Inter'] leading-normal">
              Đơn hàng trong tháng
            </span>
            <div className="flex justify-between items-center w-full mt-2">
              <span className="justify-start text-Colors-Text-Text-Secondary text-sm font-medium font-['Inter'] leading-normal">
                1,500 để đạt mục tiêu
              </span>
              <text className="text-sm font-medium text-[#6B7280]">75%</text>
            </div>

            <Progress value={70} className="w-full mt-2" />
          </div>
        </Container>

        <Container>
          <div className="flex flex-col items-center  h-full p-4">
            <div className="flex justify-center items-center gap-3">
              <span className="text-Colors-Text-Text-Primary text-3xl font-semibold font-['Inter']">
                1,352
              </span>

              <div
                data-size="Small"
                data-state="Secondary"
                data-type="Basic"
                className="px-2 py-1 bg-[#E7F8F3] rounded-2xl inline-flex justify-center items-center gap-2.5"
              >
                <div className="text-center justify-start text-[#11B886] text-xs font-medium font-['Inter']">
                  +12.5%
                </div>
              </div>
            </div>

            <span className="justify-start text-Colors-Text-Text-Secondary text-sm font-medium font-['Inter'] leading-normal">
              Doanh số hàng tháng
            </span>
            <div className="flex justify-between items-center w-full mt-2">
              <span className="justify-start text-Colors-Text-Text-Secondary text-sm font-medium font-['Inter'] leading-normal">
                1,500 để đạt mục tiêu
              </span>
              <text className="text-sm font-medium text-[#6B7280]">75%</text>
            </div>

            <Progress value={70} className="w-full mt-2" />
          </div>
        </Container>
      </div>

      <Container>
        <SalesChart />
      </Container>

      <Container>
        <ReviewSummary />
      </Container>

      <div className="col-span-2 grid grid-cols-[1fr_1fr] gap-4">
        <Container>
          <ReturningRateChart />
        </Container>
        <Container>
          <OrderTable />
        </Container>
      </div>
    </div>
  );
}
