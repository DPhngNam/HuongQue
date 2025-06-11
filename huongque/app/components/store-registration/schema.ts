import * as z from "zod";

// Vietnamese phone number regex pattern
// Matches: 03x, 05x, 07x, 08x, 09x followed by 8 digits
const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;

// Vietnamese name regex pattern (allows Vietnamese characters and spaces)
const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;

export const formSchema = z.object({
  // Phase 1
  email: z.string()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ. Vui lòng nhập email đúng định dạng (VD: example@email.com)")
    .max(100, "Email không được vượt quá 100 ký tự"),
  
  name: z.string()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(50, "Tên không được vượt quá 50 ký tự")
    .regex(nameRegex, "Tên chỉ được chứa chữ cái và khoảng trắng")
    .refine((val) => val.trim().length >= 2, {
      message: "Tên không được chỉ chứa khoảng trắng"
    }),
  
  phone: z.string()
    .min(1, "Số điện thoại không được để trống")
    .regex(phoneRegex, "Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam hợp lệ (VD: 0912345678)")
    .min(10, "Số điện thoại phải có 10 chữ số")
    .max(10, "Số điện thoại không được vượt quá 10 chữ số"),
  
  // Phase 2
  shopName: z.string()
    .min(2, "Tên cửa hàng phải có ít nhất 2 ký tự")
    .max(100, "Tên cửa hàng không được vượt quá 100 ký tự")
    .refine((val) => val.trim().length >= 2, {
      message: "Tên cửa hàng không được chỉ chứa khoảng trắng"
    }),
  
  address: z.string()
    .min(5, "Địa chỉ phải có ít nhất 5 ký tự")
    .max(200, "Địa chỉ không được vượt quá 200 ký tự")
    .refine((val) => val.trim().length >= 5, {
      message: "Địa chỉ không được chỉ chứa khoảng trắng"
    }),
  
  avatar: z.string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: "Vui lòng tải lên ảnh đại diện cửa hàng"
    }),
  
  banner: z.string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: "Vui lòng tải lên ảnh bìa cửa hàng"
    }),
  
  description: z.string()
    .min(10, "Mô tả phải có ít nhất 10 ký tự")
    .max(1000, "Mô tả không được vượt quá 1000 ký tự")
    .refine((val) => val.trim().length >= 10, {
      message: "Mô tả không được chỉ chứa khoảng trắng"
    }),
  
  businessType: z.string()
    .min(1, "Vui lòng chọn loại hình kinh doanh"),
  
  // Phase 3
  bankAccount: z.object({
    accountNumber: z.string()
      .min(10, "Số tài khoản phải có ít nhất 10 ký tự")
      .max(20, "Số tài khoản không được vượt quá 20 ký tự")
      .regex(/^[0-9]+$/, "Số tài khoản chỉ được chứa chữ số"),
    
    accountName: z.string()
      .min(2, "Tên tài khoản phải có ít nhất 2 ký tự")
      .max(100, "Tên tài khoản không được vượt quá 100 ký tự")
      .refine((val) => val.trim().length >= 2, {
        message: "Tên tài khoản không được chỉ chứa khoảng trắng"
      }),
    
    bankName: z.string()
      .min(2, "Tên ngân hàng phải có ít nhất 2 ký tự")
      .max(100, "Tên ngân hàng không được vượt quá 100 ký tự")
      .refine((val) => val.trim().length >= 2, {
        message: "Tên ngân hàng không được chỉ chứa khoảng trắng"
      }),
    
    branch: z.string()
      .min(2, "Chi nhánh phải có ít nhất 2 ký tự")
      .max(100, "Chi nhánh không được vượt quá 100 ký tự")
      .refine((val) => val.trim().length >= 2, {
        message: "Chi nhánh không được chỉ chứa khoảng trắng"
      }),
  }),
  
  idCard: z.string()
    .min(1, "Vui lòng tải lên CCCD")
    .refine((val) => val.length > 0, {
      message: "Vui lòng tải lên CCCD"
    }),
  
  businessLicense: z.string()
    .min(1, "Vui lòng tải lên giấy phép đăng ký kinh doanh")
    .refine((val) => val.length > 0, {
      message: "Vui lòng tải lên giấy phép đăng ký kinh doanh"
    }),
  
  foodSafetyCertificate: z.string()
    .min(1, "Vui lòng tải lên giấy chứng nhận an toàn thực phẩm")
    .refine((val) => val.length > 0, {
      message: "Vui lòng tải lên giấy chứng nhận an toàn thực phẩm"
    }),
});

export type FormValues = z.infer<typeof formSchema>;

export const businessTypes = [
  { value: "retail", label: "Bán lẻ" },
  { value: "wholesale", label: "Bán sỉ" },
  { value: "both", label: "Bán lẻ và bán sỉ" },
  { value: "service", label: "Dịch vụ" },
]; 