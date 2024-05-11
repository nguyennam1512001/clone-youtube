import * as icons from '~/public/assets/icons';
import * as iconSidebars from '~/public/assets/icons/iconSideBars';
import { path } from '~/utils';

const menuSettingArr = [
  {
    id: 1,
    auth: true,
    items: [
      {
        iconLeft: <iconSidebars.YourChannel />,
        text: 'Kênh của bạn',
        iconRight: null,
        path: path.MY_CHANNEL,
      },
      {
        iconLeft: <icons.Youtube />,
        text: 'Youtube',
        iconRight: null,
        path: '/',
      },
      // {
      //   iconLeft: <icons.ChangeAcount />,
      //   text: 'Chuyển đổi tài khoản',
      //   iconRight: <icons.ChevronRight />,
      // },
      {
        iconLeft: <icons.Singout />,
        text: 'Đăng xuất',
        iconRight: null,
        path: '/logout',
      },
    ],
  },

  // {
  //   id: 3,
  //   auth: false,
  //   items: [
  //     {
  //       iconLeft: <icons.Moon />,
  //       text: 'Giao diện:',
  //       iconRight: <icons.ChevronRight />,
  //       popup: {
  //         title: 'Giao diện',
  //         option: [
  //           {
  //             id: 1,
  //             text: 'Dùng giao diện của thiết bị',
  //           },
  //           {
  //             id: 2,
  //             text: 'Giao diện tối',
  //             theme: 'dark',
  //           },
  //           {
  //             id: 3,
  //             text: 'Giao diện sáng',
  //             theme: 'light',
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       iconLeft: <icons.Help />,
  //       text: 'Trợ giúp',
  //       iconRight: null,
  //     },
  //   ],
  // },
];

export default menuSettingArr;
