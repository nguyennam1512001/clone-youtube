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
  ArrowLeft,
} from '~/public/assets/icons';

const menuSettingArr = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
    auth: false,
    items: [
      {
        iconLeft: <ShieldUser />,
        text: 'Dữ liệu của bạn trong YouTube',
        iconRight: null,
      },
      {
        iconLeft: <Moon />,
        text: 'Giao diện:',
        iconRight: <ChevronRight />,
        popup: {
          title: 'Giao diện',
          option: [
            {
              id: 1,
              text: 'Dùng giao diện của thiết bị',
            },
            {
              id: 2,
              text: 'Giao diện tối',
              theme: 'dark',
            },
            {
              id: 3,
              text: 'Giao diện sáng',
              theme: 'light',
            },
          ],
        },
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
    id: 4,

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
    id: 5,
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
