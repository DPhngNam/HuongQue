"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/ui/file-upload";
import { FormValues } from "./schema";

interface Phase3FormProps {
  form: UseFormReturn<FormValues>;
}

export function Phase3Form({ form }: Phase3FormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Thông tin tài khoản ngân hàng</h2>
        <FormField
          control={form.control}
          name="bankAccount.accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số tài khoản</FormLabel>
              <FormControl>
                <Input placeholder="Nhập số tài khoản" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bankAccount.accountName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên tài khoản</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên tài khoản" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bankAccount.bankName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên ngân hàng</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên ngân hàng" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bankAccount.branch"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chi nhánh</FormLabel>
              <FormControl>
                <Input placeholder="Nhập chi nhánh" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Giấy tờ xác thực</h3>
        <FormField
          control={form.control}
          name="idCard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CCCD</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value}
                  onChange={field.onChange}
                  onRemove={() => field.onChange(undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="businessLicense"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giấy phép đăng ký kinh doanh</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value}
                  onChange={field.onChange}
                  onRemove={() => field.onChange(undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="foodSafetyCertificate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giấy chứng nhận cơ sở đủ điều kiện an toàn thực phẩm</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value}
                  onChange={field.onChange}
                  onRemove={() => field.onChange(undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
} 