import React from "react";
import Container from "./components/container";
import { Avatar } from "@radix-ui/react-avatar";
import SalesChart from "./charts/SalesChart";
import ReviewSummary from "./charts/ReviewSumary";
import OrderTable from "./components/OrderTable";

export default function page() {
  return (
    <div className="grid grid-cols-[1.5fr_1fr] gap-4 w-full px-5 bg-[#FBFBFD">
      <div className="grid grid-cols-4 col-span-2 gap-4 w-full px-5">
        <Container>
          <div className="flex flex-col items-center justify-between h-full p-4">
            <div>
              <div className="justify-start text-Colors-Text-Text-Primary text-3xl font-semibold font-['Inter']">
                1,352
              </div>
              <div className="justify-start text-Colors-Text-Text-Secondary text-sm font-medium font-['Inter'] leading-normal">
                Daily Visitors
              </div>
            </div>
            <div className="justify-start text-Colors-Text-Text-Primary text-sm font-medium font-['Inter'] leading-normal">
              Top Visitors
            </div>
            <Avatar>
              <img
                src="https://images.unsplash.com/photo-1502685104226-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1hbnxlbnwwfHx8fDE2OTY5NzQ3NTg&ixlib=rb-4.0.3&q=80&w=400"
                alt="User Avatar"
                className="rounded-full"
              />
            </Avatar>
          </div>
        </Container>

        <Container>
          <div className="flex flex-col items-center justify-between h-full p-4">
            <div>
              <div className="justify-start text-Colors-Text-Text-Primary text-3xl font-semibold font-['Inter']">
                1,352
              </div>
              <div className="justify-start text-Colors-Text-Text-Secondary text-sm font-medium font-['Inter'] leading-normal">
                Daily Visitors
              </div>
            </div>
            <div className="justify-start text-Colors-Text-Text-Primary text-sm font-medium font-['Inter'] leading-normal">
              Top Visitors
            </div>
            <Avatar>
              <img
                src="https://images.unsplash.com/photo-1502685104226-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1hbnxlbnwwfHx8fDE2OTY5NzQ3NTg&ixlib=rb-4.0.3&q=80&w=400"
                alt="User Avatar"
                className="rounded-full"
              />
            </Avatar>
          </div>
        </Container>

        <Container>
          <div className="flex flex-col items-center justify-between h-full p-4">
            <div>
              <div className="justify-start text-Colors-Text-Text-Primary text-3xl font-semibold font-['Inter']">
                1,352
              </div>
              <div className="justify-start text-Colors-Text-Text-Secondary text-sm font-medium font-['Inter'] leading-normal">
                Daily Visitors
              </div>
            </div>
            <div className="justify-start text-Colors-Text-Text-Primary text-sm font-medium font-['Inter'] leading-normal">
              Top Visitors
            </div>
            <Avatar>
              <img
                src="https://images.unsplash.com/photo-1502685104226-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1hbnxlbnwwfHx8fDE2OTY5NzQ3NTg&ixlib=rb-4.0.3&q=80&w=400"
                alt="User Avatar"
                className="rounded-full"
              />
            </Avatar>
          </div>
        </Container>

        <Container>
          <div className="flex flex-col items-center justify-between h-full p-4">
            <div>
              <div className="justify-start text-Colors-Text-Text-Primary text-3xl font-semibold font-['Inter']">
                1,352
              </div>
              <div className="justify-start text-Colors-Text-Text-Secondary text-sm font-medium font-['Inter'] leading-normal">
                Daily Visitors
              </div>
            </div>
            <div className="justify-start text-Colors-Text-Text-Primary text-sm font-medium font-['Inter'] leading-normal">
              Top Visitors
            </div>
            <Avatar>
              <img
                src="https://images.unsplash.com/photo-1502685104226-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1hbnxlbnwwfHx8fDE2OTY5NzQ3NTg&ixlib=rb-4.0.3&q=80&w=400"
                alt="User Avatar"
                className="rounded-full"
              />
            </Avatar>
          </div>
        </Container>
      </div>

      <Container>
        <SalesChart />
      </Container>

      <Container>
        <ReviewSummary />
      </Container>

      <Container className=" col-span-2" >
        <OrderTable />
      </Container>
    </div>
  );
}
