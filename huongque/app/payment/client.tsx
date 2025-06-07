"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Loader2, AlertTriangle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELED = "CANCELED",
}

export function PaymentStatusClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();
  const [status, setStatus] = useState<PaymentStatus>(PaymentStatus.PENDING);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const statusParam = searchParams.get("status");
    const redirectStatus = searchParams.get("redirect_status");

    if (redirectStatus === "succeeded" || statusParam === "success") {
      setStatus(PaymentStatus.COMPLETED);
    } else if (redirectStatus === "failed" || statusParam === "failed") {
      setStatus(PaymentStatus.FAILED);
    } else if (redirectStatus === "processing") {
      setStatus(PaymentStatus.PENDING);
    } else if (statusParam === "canceled") {
      setStatus(PaymentStatus.CANCELED);
    } else {
      setStatus(PaymentStatus.FAILED);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [searchParams]);
  const renderStatusContent = () => {
    switch (status) {
      case PaymentStatus.COMPLETED:
        return (
          <>
            <div className="flex justify-center">
              <CheckCircle
                className={`${
                  isMobile ? "h-12 w-12" : "h-16 w-16"
                } text-green-500`}
              />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-card-foreground">
              Payment Successful!
            </h1>{" "}
            <p className="text-sm sm:text-base text-muted-foreground">
              Thank you for your payment. Your transaction has been completed
              successfully. We&apos;ve sent a confirmation email with your
              receipt and transaction details.
            </p>
            <div className="pt-4 border-t border-border">
              <div
                className={`flex ${
                  isMobile
                    ? "flex-col space-y-2"
                    : "flex-row space-x-2 justify-center"
                }`}
              >
                <Link
                  href="/"
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors ${
                    isMobile ? "text-sm" : ""
                  }`}
                >
                  Return to Home
                </Link>
                <Link
                  href="/explore"
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors ${
                    isMobile ? "text-sm" : ""
                  }`}
                >
                  Explore More Sites
                </Link>
              </div>
            </div>
          </>
        );

      case PaymentStatus.FAILED:
        return (
          <>
            <div className="flex justify-center">
              <XCircle
                className={`${
                  isMobile ? "h-12 w-12" : "h-16 w-16"
                } text-destructive`}
              />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-card-foreground">
              Payment Failed
            </h1>{" "}
            <p className="text-sm sm:text-base text-muted-foreground">
              We&apos;re sorry, but your payment could not be processed. This
              could be due to insufficient funds, an expired card, or other
              payment issues. No charges have been made to your account.
            </p>
            <div className="pt-4 border-t border-border">
              <div
                className={`flex ${
                  isMobile
                    ? "flex-col space-y-2"
                    : "flex-row space-x-2 justify-center"
                }`}
              >
                <button
                  onClick={() => router.back()}
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors ${
                    isMobile ? "text-sm" : ""
                  }`}
                >
                  Try Again
                </button>
                <Link
                  href="/"
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors ${
                    isMobile ? "text-sm" : ""
                  }`}
                >
                  Return to Home
                </Link>
              </div>
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-4">
              If you continue to experience issues, please contact our support
              team for assistance.
            </div>
          </>
        );

      case PaymentStatus.PENDING:
        return (
          <>
            <div className="flex justify-center">
              <Loader2
                className={`${
                  isMobile ? "h-12 w-12" : "h-16 w-16"
                } text-primary animate-spin`}
              />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-card-foreground">
              Processing Payment
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Your payment is currently being processed. This may take a moment.
              Please do not close this page or refresh your browser.
            </p>
            <div className="w-full bg-secondary rounded-full h-2.5 mt-4">
              <div className="bg-primary h-2.5 rounded-full animate-pulse"></div>
            </div>
          </>
        );

      case PaymentStatus.CANCELED:
        return (
          <>
            <div className="flex justify-center">
              <AlertTriangle
                className={`${
                  isMobile ? "h-12 w-12" : "h-16 w-16"
                } text-yellow-500`}
              />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-card-foreground">
              Payment Canceled
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Your payment has been canceled. No charges have been made to your
              account.
            </p>
            <div className="pt-4 border-t border-border">
              <div
                className={`flex ${
                  isMobile
                    ? "flex-col space-y-2"
                    : "flex-row space-x-2 justify-center"
                }`}
              >
                <button
                  onClick={() => router.back()}
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors ${
                    isMobile ? "text-sm" : ""
                  }`}
                >
                  Try Again
                </button>
                <Link
                  href="/"
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors ${
                    isMobile ? "text-sm" : ""
                  }`}
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </>
        );

      default:
        return (
          <>
            <div className="flex justify-center">
              <AlertTriangle
                className={`${
                  isMobile ? "h-12 w-12" : "h-16 w-16"
                } text-yellow-500`}
              />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-card-foreground">
              Unknown Payment Status
            </h1>{" "}
            <p className="text-sm sm:text-base text-muted-foreground">
              We couldn&apos;t determine the status of your payment. Please
              check your email for confirmation or contact our support team for
              assistance.
            </p>
            <div className="pt-4 border-t border-border">
              <div
                className={`flex ${
                  isMobile
                    ? "flex-col space-y-2"
                    : "flex-row space-x-2 justify-center"
                }`}
              >
                <Link
                  href="/"
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors ${
                    isMobile ? "text-sm" : ""
                  }`}
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-start pt-10 sm:pt-16 px-4 sm:p-6 bg-black bg-gradient-to-b from-background to-muted/20">
      <div className="w-full max-w-md bg-card p-6 sm:p-10 rounded-xl shadow-xl border border-border/50 text-center space-y-4 sm:space-y-6 backdrop-blur-sm transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        {loading ? (
          <>
            <div className="flex justify-center">
              <Loader2
                className={`${
                  isMobile ? "h-12 w-12" : "h-16 w-16"
                } text-primary animate-spin`}
              />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-card-foreground">
              Verifying Payment
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Please wait while we verify your payment status...
            </p>
          </>
        ) : (
          renderStatusContent()
        )}
      </div>
    </div>
  );
}