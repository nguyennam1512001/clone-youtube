import * as iconSidebars from '~/public/assets/icons/iconSideBars';
import { User } from '~/public/assets/icons';
import { path } from '~/utils';
export const sidebarMiniArr = [
  { id: 1, icon: <iconSidebars.Home />, iconActive: <iconSidebars.HomeActive />, text: 'Trang chủ', path: '/' },
  {
    id: 2,
    icon: <iconSidebars.Short />,
    iconActive: <iconSidebars.ShortActive />,
    text: 'Shorts',
    path: '/shorts',
    exact: false,
  },
  // {
  //   id: 3,
  //   icon: <iconSidebars.Subscrip />,
  //   iconActive: <iconSidebars.SubscripActive />,
  //   text: 'Kênh đăng kí',
  //   path: '/feed/subscriptions',
  // },
  // {
  //   id: 4,
  //   icon: <iconSidebars.YouVideo />,
  //   iconActive: <iconSidebars.YouVideoActive />,
  //   text: 'Bạn',
  //   path: '/feed/you',
  // },
];
export const sidebarItems = [
  {
    title: '',
    items: [
      { id: 1, icon: <iconSidebars.Home />, iconActive: <iconSidebars.HomeActive />, text: 'Trang chủ', path: '/' },
      {
        id: 2,
        icon: <iconSidebars.Short />,
        iconActive: <iconSidebars.ShortActive />,
        text: 'Shorts',
        path: '/shorts',
        exact: false,
      },
      // {
      //   id: 3,
      //   icon: <iconSidebars.Subscrip />,
      //   iconActive: <iconSidebars.SubscripActive />,
      //   text: 'Kênh đăng kí',
      //   path: '/feed/subscriptions',
      // },
    ],
  },
  {
    title: { text: 'Bạn', icon: <iconSidebars.ChevronRight /> },
    items: [
      // {
      //   id: 4,
      //   icon: <iconSidebars.YouVideo />,
      //   iconActive: <iconSidebars.YouVideoActive />,
      //   text: 'Bạn',
      //   path: '/feed/you',
      // },
      {
        id: 5,
        icon: <iconSidebars.YourChannel />,
        iconActive: <iconSidebars.YourChannelActive />,
        text: 'Kênh của bạn',
        auth: true,
        path: path.MY_CHANNEL,
      },
      // {
      //   id: 6,
      //   icon: <iconSidebars.History />,
      //   iconActive: <iconSidebars.HistoryActive />,
      //   text: 'Video đã xem',
      //   path: '/feed/history',
      // },
      {
        id: 7,
        icon: <iconSidebars.YourVideo />,
        iconActive: <iconSidebars.YourVideo />,
        text: 'Video của bạn',
        auth: true,
        path: path.UPLOAD,
      },
      // {
      //   id: 8,
      //   icon: <iconSidebars.Clock />,
      //   iconActive: <iconSidebars.ClockActive />,
      //   text: 'Xem sau',
      //   auth: true,
      //   path: '/playlist?list=WL',
      // },
      // {
      //   id: 9,
      //   icon: <iconSidebars.Scissors />,
      //   iconActive: <iconSidebars.ScissorsActive />,
      //   text: 'Đoạn video của bạn',
      //   auth: true,
      //   path: '/feed/clips',
      // },
    ],
    // showMore: { icon: <iconSidebars.ChevronDown />, text: 'Thêm' },
    // showFewer: { icon: <iconSidebars.ChevronUp />, text: 'Ẩn bớt' },
  },
  {
    auth: false,
    title: '',
    type: 'login',
    descript: 'Hãy đăng nhập để thích video, bình luận và đăng ký kênh.',
    icon: <User />,
    path: '/login',
  },
  {
    title: { text: 'Khám phá', icon: '' },
    items: [
      {
        id: 13,
        icon: <iconSidebars.Trending />,
        iconActive: <iconSidebars.TrendingActive />,
        text: 'Thịnh hành',
        path: '/trending',
      },
      // {
      //   id: 14,
      //   icon: <iconSidebars.Music />,
      //   iconActive: <iconSidebars.MusicActive />,
      //   text: 'Âm nhạc',
      //   path: '/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ',
      // },
      // { id: 15, icon: <iconSidebars.Game />, iconActive: <iconSidebars.GameActive />, text: 'Trò chơi', path: '/game' },
      // {
      //   id: 16,
      //   icon: <iconSidebars.News />,
      //   iconActive: <iconSidebars.NewsActive />,
      //   text: 'Tin tức',
      //   path: '/channel/UCYfdidRxbB8Qhf0Nx7ioOYw',
      // },
      // {
      //   id: 17,
      //   icon: <iconSidebars.Trophy />,
      //   iconActive: <iconSidebars.TrophyActive />,
      //   text: 'Thể thao',
      //   path: '/channel/UCEgdi0XIXXZ-qJOFPf4JSKw',
      // },
    ],
  },
  // {
  //   title: '',
  //   items: [
  //     {
  //       id: 18,
  //       icon: <iconSidebars.Plus />,
  //       iconActive: <iconSidebars.Plus />,
  //       text: 'Xem qua các kênh',
  //       path: '/feed/guide_builder',
  //     },
  //   ],
  // },
  {
    title: { text: 'Dịch vụ khác của YouTube', icon: '' },
    items: [
      // {
      //   id: 19,
      //   icon: <iconSidebars.YouTubePremium />,
      //   iconActive: <iconSidebars.YouTubePremium />,
      //   text: 'YouTube Premium',
      //   path: '/premium',
      // },
      {
        id: 20,
        icon: <iconSidebars.YouTubeStudio />,
        iconActive: <iconSidebars.YouTubeStudio />,
        text: 'YouTube Studio',
        path: path.OVERVIEW,
      },
      // {
      //   id: 21,
      //   icon: <iconSidebars.YouTubeMusic />,
      //   iconActive: <iconSidebars.YouTubeMusic />,
      //   text: 'YouTube Music',
      //   path: 'https://music.youtube.com/',
      // },
      // {
      //   id: 22,
      //   icon: <iconSidebars.YouTubeKids />,
      //   iconActive: <iconSidebars.YouTubeKids />,
      //   text: 'YouTube Kids',
      //   path: 'https://www.youtubekids.com/?source=youtube_web',
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
  //       id: 24,
  //       icon: <iconSidebars.Flag />,
  //       iconActive: <iconSidebars.FlagActive />,
  //       text: 'Nhật kí báo cáo',
  //       path: '/reporthistory',
  //     },
  //     { id: 25, icon: <iconSidebars.Help />, iconActive: <iconSidebars.Help />, text: 'Trợ giúp', path: '/help' },
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
