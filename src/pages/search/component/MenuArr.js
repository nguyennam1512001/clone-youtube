import { AddList, WaitList, Share } from '~/public/assets/icons';
import * as iconSidebars from '~/public/assets/icons/iconSideBars';

const menuArr = [
  {
    auth: true,
    items: [
      {
        iconLeft: <WaitList />,
        text: 'Thêm vào danh sách chờ',
        iconRight: null,
      },
      {
        iconLeft: <iconSidebars.Clock />,
        text: 'Lưu vào danh sách Xem sau',
        iconRight: null,
      },
      {
        iconLeft: <AddList />,
        text: 'Lưu vào danh sách phát',
        iconRight: null,
      },
      {
        iconLeft: <Share />,
        text: 'Chia sẻ',
        iconRight: null,
      },
    ],
  },
  {
    auth: true,
    items: [
      {
        iconLeft: <iconSidebars.Flag />,
        text: 'Báo cáo vi phạm',
        iconRight: null,
      },
    ],
  },
];

export default menuArr;
