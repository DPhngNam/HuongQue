import React, { Suspense } from "react";
import { PaymentStatusClient } from "./client";

function PaymentStatusFallback() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-black bg-gradient-to-b from-background to-muted/20">
      <div className="w-full max-w-md mx-auto bg-card p-6 sm:p-10 rounded-xl shadow-xl border border-border/50 text-center space-y-4 sm:space-y-6 backdrop-blur-sm">
        <div className="flex justify-center">
          <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-card-foreground">
          Loading Payment Status
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Please wait while we load your payment information...
        </p>
      </div>
    </div>
  );
}

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={<PaymentStatusFallback />}>
      <PaymentStatusClient />
    </Suspense>
  );
}