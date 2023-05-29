import routes from './routes'

export default {
    INTERNAL_INFO: {
        height: 24,
        title: 'Thông tin nội bộ',
        icon: 'newspaper',
        content: [
            {
                label: 'Thông báo',
                route: routes.NOTIFICATION_DRAWER,
            },
        ],
    },

    WORK_MANAGEMENT: {},

    USER: {
        height: 60,
        title: 'Chỉ số NVKT',
        icon: 'person',
        content: [
            {
                label: 'Cá nhân NVKT',
                route: routes.INDIVIDUAL,
            },
            {
                label: 'Báo cáo hằng ngày',
                route: routes.DAILY_REPORT,
            },
        ],
    },

    ADMINISTRATIVE_PROCEDURES: {
        height: 100,
        title: 'Thủ tục hành chính',
        icon: 'newspaper',
        content: [
            {
                label: 'Giấy đề nghị, xác nhận',
                route: routes.PROPOSALPAPER,
            },
            {
                label: 'Đơn xin nghỉ phép',
                route: routes.ONLEAVE,
            },
            {
                label: 'Đăng ký lịch Parttime',
                route: routes.SIGNUPPARTTIME,
            },
        ],
    },

    ORDER_PROGRESS: {
        height: 230,
        title: 'Tiến trình đơn hàng',
        icon: 'newspaper',
        content: [
            {
                label: 'Đơn chờ thực hiện',
                route: routes.ONLEAVE,
            },
            {
                label: 'Đơn đang thực hiện',
                route: routes.ONLEAVE,
            },
            {
                label: 'Đơn đã xong',
                route: routes.ONLEAVE,
            },
            {
                label: 'Đơn thu hồi nợ',
                route: routes.ONLEAVE,
            },
            {
                label: 'Đơn bị lỗi',
                route: routes.ONLEAVE,
            },
            {
                label: 'Đơn hủy',
                route: routes.ONLEAVE,
            },
            {
                label: 'Chỉ đường',
                route: routes.ONLEAVE,
            },
        ],
    },

    ADMINISTRATIVE_PROCEDURES: {
        height: 100,
        title: 'Thủ tục hành chính',
        icon: 'calendar',

        content: [
            {
                label: 'Giấy đề nghị, xác nhận',
                route: routes.PROPOSALPAPER,
            },
            {
                label: 'Đơn xin nghỉ phép',
                route: routes.ONLEAVE,
            },
            {
                label: 'Đăng ký lịch Parttime',
                route: routes.SIGNUPPARTTIME,
            },
        ],
    },

    ORDER_PROGRESS: {
        height: 230,
        title: 'Tiến trình đơn hàng',
        icon: 'newspaper',
        content: [
            {
                label: 'Đơn chờ thực hiện',
                route: routes.PENDING_ORDERS,
            },
            {
                label: 'Đơn đang thực hiện',
                route: routes.ACTIVE_ORDER,
            },
            {
                label: 'Đơn đã xong',
                route: routes.ORDER_DONE,
            },
            {
                label: 'Đơn thu hồi nợ',
                route: routes.DEBT_Collection_Orders,
            },
            {
                label: 'Đơn bị lỗi',
                route: routes.ERROR_ORĐER,
            },
            {
                label: 'Đơn hủy',
                route: routes.CANCE_ORDER,
            },
            {
                label: 'Chỉ đường',
                route: routes.DIRECT,
            },
        ],
    },


    ADMINISTRATIVE_PAYMENT: {
        height: 70,
        title: 'Thanh Toán Đơn Hàng',
        icon: 'archive',

        content: [
            {
                label: 'Liệt Kê POS',
                route: routes.LISTED_POS,
            },
            {
                label: 'Đề Nghị Sửa Hóa Đơn',
                route: routes.Offer_To_Correct_The_Invoice,
            },

        ],
    },



    ADMINISTRATIVE_Penalty: {
        height: 25,
        title: 'Quản Lý Nhân Viên',
        icon: 'arrow-up',

        content: [
            {
                label: 'Phiếu Phạt',
                route: routes.Penalty_slips,
            },

        ],
    },


    ADMINISTRATIVE_Sales: {
        height: 200,
        title: 'Quản Lý Bán Hàng',
        icon: 'cart',
        content: [

            {
                label: 'Nhưng đơn đặt hàng đang nợ',
                route: routes.Orders_Owed,
            },
            {
                label: 'Đơn hàng chưa thanh toán',
                route: routes.Unpaid_Orders,
            },
            {
                label: 'Mã QR',
                route: routes.QR_Code,
            },
            {
                label: 'Xác Nhận Thanh Toán',
                route: routes.Payment_Confirmation,
            },

            {
                label: 'Tồn Kho cá nhân',
                route: routes.Personal_Inventory,
            },
            {
                label: 'Các Phiếu đã xác nhận',
                route: routes.Confirmed_Votes,
            },
        ],
    },


    ADMINISTRATIVE_Salary: {
        height: 60,
        title: 'Lương',
        icon: 'heart',
        content: [
            {
                label: 'Thưởng Hàng Ngày',
                route: routes.Daily_Bonus,
            },
            {
                label: 'Xác Nhận Bảng Lương',
                route: routes.Payroll_Confirmation,
            },

        ],
    },


    ADMINISTRATIVE_Browse: {
        height: 30,
        title: 'Quản Lý Chi Phí',
        icon: 'heart',
        content: [
            {
                label: 'Duyệt Chi',
                route: routes.Browse,
            },

        ],
    },

    ADMINISTRATIVE_Update_Profile: {
        height: 30,
        title: 'Cập Nhật ProFile',
        icon: 'heart',
        content: [
            {
                label: 'Cập Nhật ProFile',
                route: routes.Update_Profile,
            },

        ],
    }

}

