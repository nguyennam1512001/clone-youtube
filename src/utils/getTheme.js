export default function getTheme(mode) {
  return {
    palette: {
      mode,
      bgcolor: {
        default: '#fff',
        secondary: '#F2F2F2',
        paper: '#fff',
        popup: '#fff',
        ...(mode === 'dark' && { default: '#0F0F0F', secondary: '#282828', popup: '#282828' }),
      },
      text: {
        primary: '#0F0F0F',
        secondary: '#606060',
        ...(mode === 'dark' && { primary: '#fff', secondary: '#AAAAAA' }),
      },
      icon: {
        primary: '#030303',
        ...(mode === 'dark' && { primary: '#fff' }),
      },
      action: {
        bgcolor: '#0f0f0f',
        text: '#fff',
        ...(mode === 'dark' && {
          bgcolor: '#f1f1f1',
          text: '#0f0f0f',
        }),
      },
    },
  };
}
