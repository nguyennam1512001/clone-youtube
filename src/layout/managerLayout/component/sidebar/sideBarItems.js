import * as iconSidebars from '~/public/assets/icons/iconSideBars';
import * as icon from '~/public/assets/icons';
import { path } from '~/utils';

export const sidebarItems = [
  {
    title: '',
    items: [
      {
        id: 1,
        icon: <icon.OverView />,
        iconActive: <icon.OverViewBold />,
        text: 'Tổng quan',
        path: path.OVERVIEW,
      },
      {
        id: 2,
        icon: <iconSidebars.YouVideo />,
        iconActive: <iconSidebars.YouVideoActive />,
        text: 'Nội dụng',
        path: path.UPLOAD,
        exact: false,
      },
      // {
      //   id: 3,
      //   icon: <icon.Analytics />,
      //   iconActive: <icon.AnalyticsBold />,
      //   text: 'Số liệu phân tích',
      //   path: '/channel/analytics',
      // },
      // {
      //   id: 4,
      //   icon: <icon.Comment />,
      //   iconActive: <icon.CommentBold />,
      //   text: 'Bình luận',
      //   path: '/channel/comments',
      // },
      // {
      //   id: 5,
      //   icon: <icon.Translation />,
      //   iconActive: <icon.TranslationBold />,
      //   text: 'Phụ đề',
      //   auth: true,
      //   path: '/channel/translations',
      // },
      // {
      //   id: 6,
      //   icon: <icon.Copyright />,
      //   iconActive: <icon.CopyrightBold />,
      //   text: 'Bản quyền',
      //   path: '/channel/copyright',
      // },
      // {
      //   id: 7,
      //   icon: <icon.Currency />,
      //   iconActive: <icon.CurrencyBold />,
      //   text: 'Kiếm tiền',
      //   auth: true,
      //   path: '/channel/monetization',
      // },
      // {
      //   id: 8,
      //   icon: <icon.EditPen />,
      //   iconActive: <icon.EditPenBold />,
      //   text: 'Tuỳ chỉnh',
      //   auth: true,
      //   path: '/channel/editing',
      // },
      // {
      //   id: 9,
      //   icon: <icon.LibraryMusic />,
      //   iconActive: <icon.LibraryMusicBold />,
      //   text: 'Thư viện âm thanh',
      //   auth: true,
      //   path: '/channel/music',
      // },
    ],
  },

  // {
  //   title: { text: '', icon: '' },
  //   items: [
  //     {
  //       id: 23,
  //       icon: <iconSidebars.Setting />,
  //       iconActive: <iconSidebars.SettingActive />,
  //       text: 'Cài đặt',
  //       path: '/setting',
  //     },
  //     {
  //       id: 26,
  //       icon: <iconSidebars.Message />,
  //       iconActive: <iconSidebars.Message />,
  //       text: 'gửi ý kiến phản hồi',
  //       path: '/message',
  //     },
  //   ],
  // },
];
// const newArr = sidebarItems[0].items.concat(sidebarItems[1].items);
const newArr = sidebarItems[0].items;

export const sidebarMiniArr = newArr.map(({ text, ...rest }) => {
  return { ...rest };
});
