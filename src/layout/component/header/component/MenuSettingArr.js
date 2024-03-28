import {
  ChevronRight,
  Google,
  ChangeAcount,
  Singout,
  Studio,
  Dolar,
  ShieldUser,
  Moon,
  Language,
  ShieldLimit,
  Globe,
  KeyShort,
  Setting,
  Help,
  Message,
} from '~/assets/icons';

const menuSettingArr = [
  {
    auth: true,
    items: [
      {
        iconLeft: <Google />,
        text: 'Tài khoản Google',
        iconRight: null,
      },
      {
        iconLeft: <ChangeAcount />,
        text: 'Chuyển đổi tài khoản',
        iconRight: <ChevronRight />,
      },
      {
        iconLeft: <Singout />,
        text: 'Đăng xuất',
        iconRight: null,
        path: '/logout',
      },
    ],
  },
  {
    auth: true,
    items: [
      {
        iconLeft: <Studio />,
        text: 'YouTube Studio',
        iconRight: null,
      },
      {
        iconLeft: <Dolar />,
        text: 'Giao dịch mua và gói thành viên',
        iconRight: null,
      },
    ],
  },
  {
    auth: false,
    items: [
      {
        iconLeft: <ShieldUser />,
        text: 'Dữ liệu của bạn trong YouTube',
        iconRight: null,
      },
      {
        iconLeft: <Moon />,
        text: 'Giao diện: Giao diện thiết bị',
        iconRight: <ChevronRight />,
      },
      {
        iconLeft: <Language />,
        text: 'Ngôn ngữ: Tiếng việt',
        iconRight: <ChevronRight />,
      },
      {
        iconLeft: <ShieldLimit />,
        text: 'Chế độ hạn chế: Đã tắt',
        iconRight: <ChevronRight />,
      },
      {
        iconLeft: <Globe />,
        text: 'Địa điểm: Việt Nam',
        iconRight: <ChevronRight />,
      },
      {
        iconLeft: <KeyShort />,
        text: 'Phím tắt',
        iconRight: null,
      },
    ],
  },
  {
    auth: false,
    items: [
      {
        iconLeft: <Setting />,
        text: 'Cài đặt',
        iconRight: null,
      },
    ],
  },
  {
    auth: false,
    items: [
      {
        iconLeft: <Help />,
        text: 'Trợ giúp',
        iconRight: null,
      },
      {
        iconLeft: <Message />,
        text: 'Gửi ý kiến phản hồi',
        iconRight: null,
      },
    ],
  },
];

export default menuSettingArr;
