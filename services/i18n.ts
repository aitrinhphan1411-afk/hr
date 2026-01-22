
import { Language, TranslationSchema } from '../types';

export const translations: Record<Language, TranslationSchema> = {
  [Language.VI]: {
    login: {
      title: "Cổng thông tin nhân sự",
      description: "Chúng tôi trân trọng phản hồi chân thực từ bạn để cùng xây dựng môi trường làm việc tốt hơn.",
      emailPlaceholder: "Email công ty (ví dụ: name@company.com)",
      submit: "Đăng nhập",
      trustNote: "Mọi thông tin phản hồi của bạn đều được bảo mật và xử lý ẩn danh."
    },
    survey: {
      title: "Khảo sát Trải nghiệm Nhân viên",
      optional: "(Không bắt buộc)",
      submit: "Gửi phản hồi",
      submitting: "Đang xử lý...",
      duplicate: "Bạn đã hoàn thành khảo sát này. Cảm ơn bạn!"
    },
    thanks: {
      title: "Cảm ơn bạn!",
      message: "Phản hồi của bạn đã được ghi nhận. Những đóng góp này rất quan trọng để chúng tôi cải thiện chương trình gắn kết nhân viên.",
      backHome: "Về trang chủ"
    },
    admin: {
      dashboard: "Bảng điều khiển Nhân sự",
      metrics: "Chỉ số tổng quan",
      engagement: "Điểm gắn kết",
      participation: "Tỷ lệ tham gia",
      anonymizedTitle: "Phản hồi ẩn danh",
      nonParticipantsTitle: "Danh sách chưa phản hồi"
    }
  },
  [Language.EN]: {
    login: {
      title: "HR Insight Portal",
      description: "We value your honest feedback to build a better workplace together.",
      emailPlaceholder: "Company email (e.g., name@company.com)",
      submit: "Login",
      trustNote: "Your feedback is strictly confidential and processed anonymously."
    },
    survey: {
      title: "Employee Experience Survey",
      optional: "(Optional)",
      submit: "Submit Feedback",
      submitting: "Submitting...",
      duplicate: "You have already completed this survey. Thank you!"
    },
    thanks: {
      title: "Thank You!",
      message: "Your feedback has been received. These insights are vital for improving our employee engagement programs.",
      backHome: "Back to Home"
    },
    admin: {
      dashboard: "HR Admin Dashboard",
      metrics: "Overview Metrics",
      engagement: "Engagement Score",
      participation: "Participation Rate",
      anonymizedTitle: "Anonymized Feedback",
      nonParticipantsTitle: "Pending Responses"
    }
  }
};
