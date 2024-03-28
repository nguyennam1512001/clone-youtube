import React from 'react';
import bar from './bar.svg';
import search from './search.svg';
import closeSearchQuery from './closeSearchQuery.svg';
import voiceSearch from './voiceSearch.svg';
import menu from './menu.svg';
import user from './user.svg';
import WrapSvg from '../WrapSvg';
import { Setting, Help, Message } from './iconSideBars';

function User() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 1c4.96 0 9 4.04 9 9 0 1.42-.34 2.76-.93 3.96-1.53-1.72-3.98-2.89-7.38-3.03A3.996 3.996 0 0016 9c0-2.21-1.79-4-4-4S8 6.79 8 9c0 1.97 1.43 3.6 3.31 3.93-3.4.14-5.85 1.31-7.38 3.03C3.34 14.76 3 13.42 3 12c0-4.96 4.04-9 9-9zM9 9c0-1.65 1.35-3 3-3s3 1.35 3 3-1.35 3-3 3-3-1.35-3-3zm3 12c-3.16 0-5.94-1.64-7.55-4.12C6.01 14.93 8.61 13.9 12 13.9c3.39 0 5.99 1.03 7.55 2.98C17.94 19.36 15.16 21 12 21z"
          fill="#085ED4"
        ></path>
      </svg>
    </WrapSvg>
  );
}

function Tick() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z"></path>
      </svg>
    </WrapSvg>
  );
}

function Menu() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 24 24"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path>
      </svg>
    </WrapSvg>
  );
}

function ChevronLeft() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path d="M14.96 18.96 8 12l6.96-6.96.71.71L9.41 12l6.25 6.25-.7.71z"></path>
      </svg>
    </WrapSvg>
  );
}

function ChevronRight() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path d="m9.4 18.4-.7-.7 5.6-5.6-5.7-5.7.7-.7 6.4 6.4-6.3 6.3z"></path>
      </svg>
    </WrapSvg>
  );
}

function Search() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 24 24"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"></path>
      </svg>
    </WrapSvg>
  );
}

function Google() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path d="M12 13.9v-3.72h9.36c.14.63.25 1.22.25 2.05 0 5.71-3.83 9.77-9.6 9.77C6.48 22 2 17.52 2 12S6.48 2 12 2c2.7 0 4.96.99 6.69 2.61l-2.84 2.76c-.72-.68-1.97-1.49-3.85-1.49-3.31 0-6.01 2.75-6.01 6.12s2.7 6.12 6.01 6.12c3.83 0 5.24-2.65 5.5-4.22H12z"></path>
      </svg>
    </WrapSvg>
  );
}
function ChangeAcount() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path d="M4 20h14v1H3V6h1v14zM6 3v15h15V3H6zm2.02 14c.36-2.13 1.93-4.1 5.48-4.1s5.12 1.97 5.48 4.1H8.02zM11 8.5a2.5 2.5 0 015 0 2.5 2.5 0 01-5 0zm3.21 3.43A3.507 3.507 0 0017 8.5C17 6.57 15.43 5 13.5 5S10 6.57 10 8.5c0 1.69 1.2 3.1 2.79 3.43-3.48.26-5.4 2.42-5.78 5.07H7V4h13v13h-.01c-.38-2.65-2.31-4.81-5.78-5.07z"></path>
      </svg>
    </WrapSvg>
  );
}
function Singout() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 24 24"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path d="M20 3v18H8v-1h11V4H8V3h12zm-8.9 12.1.7.7 4.4-4.4L11.8 7l-.7.7 3.1 3.1H3v1h11.3l-3.2 3.3z"></path>
      </svg>
    </WrapSvg>
  );
}
function Studio() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 24 24"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path d="M10 9.35 15 12l-5 2.65ZM12 3a.73.73 0 00-.31.06L4.3 7.28a.79.79 0 00-.3.52v8.4a.79.79 0 00.3.52l7.39 4.22a.83.83 0 00.62 0l7.39-4.22a.79.79 0 00.3-.52V7.8a.79.79 0 00-.3-.52l-7.39-4.22A.73.73 0 0012 3m0-1a1.6 1.6 0 01.8.19l7.4 4.22A1.77 1.77 0 0121 7.8v8.4a1.77 1.77 0 01-.8 1.39l-7.4 4.22a1.78 1.78 0 01-1.6 0l-7.4-4.22A1.77 1.77 0 013 16.2V7.8a1.77 1.77 0 01.8-1.39l7.4-4.22A1.6 1.6 0 0112 2Zm0 4a.42.42 0 00-.17 0l-4.7 2.8a.59.59 0 00-.13.39v5.61a.65.65 0 00.13.37l4.7 2.8A.42.42 0 0012 18a.34.34 0 00.17 0l4.7-2.81a.56.56 0 00.13-.39V9.19a.62.62 0 00-.13-.37L12.17 6A.34.34 0 0012 6m0-1a1.44 1.44 0 01.69.17L17.39 8A1.46 1.46 0 0118 9.19v5.61a1.46 1.46 0 01-.61 1.2l-4.7 2.81A1.44 1.44 0 0112 19a1.4 1.4 0 01-.68-.17L6.62 16A1.47 1.47 0 016 14.8V9.19A1.47 1.47 0 016.62 8l4.7-2.8A1.4 1.4 0 0112 5Z"></path>
      </svg>
    </WrapSvg>
  );
}
function Dolar() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 24 24"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path d="M12 3c4.96 0 9 4.04 9 9s-4.04 9-9 9-9-4.04-9-9 4.04-9 9-9m0-1C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 7V7h-3V5h-2v2h-1c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h4v2H8v2h3v2h2v-2h1c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2h-4V9h6z"></path>
      </svg>
    </WrapSvg>
  );
}
function ShieldUser() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path d="m12 3.06 7 3.21v4.84c0 1.3-.25 2.6-.75 3.86-.15.37-.33.76-.55 1.17-.15.27-.31.54-.48.81-1.32 2.01-3.17 3.42-5.23 3.98-2.06-.56-3.91-1.97-5.23-3.98-.17-.27-.33-.54-.48-.81-.22-.41-.4-.79-.55-1.17-.48-1.26-.73-2.56-.73-3.86V6.27l7-3.21m0-1.1L4 5.63v5.49c0 1.47.3 2.9.81 4.22.17.44.37.86.6 1.28.16.3.34.6.52.88 1.42 2.17 3.52 3.82 5.95 4.44l.12.02.12-.03c2.43-.61 4.53-2.26 5.95-4.43.19-.29.36-.58.52-.88.22-.41.43-.84.6-1.28.51-1.33.81-2.76.81-4.23V5.63l-8-3.67zm1.08 10.15c-.32-.06-.64-.11-.96-.12A2.997 2.997 0 0012 6a2.996 2.996 0 00-.12 5.99c-.32.01-.64.06-.96.12C8.64 12.58 7 14.62 7 17h10c0-2.38-1.64-4.42-3.92-4.89zM10 9c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm1.12 4.09c.37-.08.64-.11.88-.11s.51.03.88.11c1.48.3 2.63 1.46 3 2.91H8.12c.37-1.45 1.52-2.61 3-2.91z"></path>
      </svg>
    </WrapSvg>
  );
}
function Globe() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path d="M11.99,1.98C6.46,1.98,1.98,6.47,1.98,12s4.48,10.02,10.01,10.02c5.54,0,10.03-4.49,10.03-10.02S17.53,1.98,11.99,1.98z M8.86,14.5c-0.16-0.82-0.25-1.65-0.25-2.5c0-0.87,0.09-1.72,0.26-2.55h6.27c0.17,0.83,0.26,1.68,0.26,2.55 c0,0.85-0.09,1.68-0.25,2.5H8.86z M14.89,15.5c-0.54,1.89-1.52,3.64-2.89,5.15c-1.37-1.5-2.35-3.25-2.89-5.15H14.89z M9.12,8.45 c0.54-1.87,1.52-3.61,2.88-5.1c1.36,1.49,2.34,3.22,2.88,5.1H9.12z M16.15,9.45h4.5c0.24,0.81,0.37,1.66,0.37,2.55 c0,0.87-0.13,1.71-0.36,2.5h-4.51c0.15-0.82,0.24-1.65,0.24-2.5C16.39,11.13,16.3,10.28,16.15,9.45z M20.29,8.45h-4.38 c-0.53-1.97-1.47-3.81-2.83-5.4C16.33,3.45,19.04,5.56,20.29,8.45z M10.92,3.05c-1.35,1.59-2.3,3.43-2.83,5.4H3.71 C4.95,5.55,7.67,3.44,10.92,3.05z M3.35,9.45h4.5C7.7,10.28,7.61,11.13,7.61,12c0,0.85,0.09,1.68,0.24,2.5H3.34 c-0.23-0.79-0.36-1.63-0.36-2.5C2.98,11.11,3.11,10.26,3.35,9.45z M3.69,15.5h4.39c0.52,1.99,1.48,3.85,2.84,5.45 C7.65,20.56,4.92,18.42,3.69,15.5z M13.09,20.95c1.36-1.6,2.32-3.46,2.84-5.45h4.39C19.08,18.42,16.35,20.55,13.09,20.95z"></path>
      </svg>
    </WrapSvg>
  );
}
function Moon() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path d="M12 22C10.93 22 9.86998 21.83 8.83998 21.48L7.41998 21.01L8.83998 20.54C12.53 19.31 15 15.88 15 12C15 8.12 12.53 4.69 8.83998 3.47L7.41998 2.99L8.83998 2.52C9.86998 2.17 10.93 2 12 2C17.51 2 22 6.49 22 12C22 17.51 17.51 22 12 22ZM10.58 20.89C11.05 20.96 11.53 21 12 21C16.96 21 21 16.96 21 12C21 7.04 16.96 3 12 3C11.53 3 11.05 3.04 10.58 3.11C13.88 4.81 16 8.21 16 12C16 15.79 13.88 19.19 10.58 20.89Z"></path>
      </svg>
    </WrapSvg>
  );
}
function Language() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 24 24"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path d="M13.33 6c-1 2.42-2.22 4.65-3.57 6.52l2.98 2.94-.7.71-2.88-2.84c-.53.67-1.06 1.28-1.61 1.83l-3.19 3.19-.71-.71 3.19-3.19c.55-.55 1.08-1.16 1.6-1.83l-.16-.15c-1.11-1.09-1.97-2.44-2.49-3.9l.94-.34c.47 1.32 1.25 2.54 2.25 3.53l.05.05c1.2-1.68 2.29-3.66 3.2-5.81H2V5h6V3h1v2h7v1h-2.67zM22 21h-1l-1.49-4h-5.02L13 21h-1l4-11h2l4 11zm-2.86-5-1.86-5h-.56l-1.86 5h4.28z"></path>
      </svg>
    </WrapSvg>
  );
}
function ShieldLimit() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path d="M12 20.95Q8.975 20.075 6.987 17.312Q5 14.55 5 11.1V5.7L12 3.075L19 5.7V11.35Q18.775 11.275 18.5 11.2Q18.225 11.125 18 11.075V6.375L12 4.15L6 6.375V11.1Q6 12.575 6.438 13.938Q6.875 15.3 7.625 16.438Q8.375 17.575 9.413 18.425Q10.45 19.275 11.625 19.725L11.675 19.7Q11.8 20 11.975 20.288Q12.15 20.575 12.375 20.825Q12.275 20.85 12.188 20.888Q12.1 20.925 12 20.95ZM17 17Q17.625 17 18.062 16.562Q18.5 16.125 18.5 15.5Q18.5 14.875 18.062 14.438Q17.625 14 17 14Q16.375 14 15.938 14.438Q15.5 14.875 15.5 15.5Q15.5 16.125 15.938 16.562Q16.375 17 17 17ZM17 20Q17.8 20 18.438 19.65Q19.075 19.3 19.5 18.7Q18.925 18.35 18.3 18.175Q17.675 18 17 18Q16.325 18 15.7 18.175Q15.075 18.35 14.5 18.7Q14.925 19.3 15.562 19.65Q16.2 20 17 20ZM17 21Q15.325 21 14.163 19.837Q13 18.675 13 17Q13 15.325 14.163 14.162Q15.325 13 17 13Q18.675 13 19.837 14.162Q21 15.325 21 17Q21 18.675 19.837 19.837Q18.675 21 17 21ZM12 11.95Q12 11.95 12 11.95Q12 11.95 12 11.95Q12 11.95 12 11.95Q12 11.95 12 11.95Q12 11.95 12 11.95Q12 11.95 12 11.95Q12 11.95 12 11.95Q12 11.95 12 11.95Q12 11.95 12 11.95Q12 11.95 12 11.95Z"></path>
      </svg>
    </WrapSvg>
  );
}
function KeyShort() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
      >
        <path d="M16 16H8v-2h8v2zm0-5h-2v2h2v-2zm3 0h-2v2h2v-2zm-6 0h-2v2h2v-2zm-3 0H8v2h2v-2zm-3 0H5v2h2v-2zm9-3h-2v2h2V8zm3 0h-2v2h2V8zm-6 0h-2v2h2V8zm-3 0H8v2h2V8zM7 8H5v2h2V8zm15-3v14H2V5h20zm-1 1H3v12h18V6z"></path>
      </svg>
    </WrapSvg>
  );
}
function MicroPhone() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path d="M12 3c-1.66 0-3 1.37-3 3.07v5.86c0 1.7 1.34 3.07 3 3.07s3-1.37 3-3.07V6.07C15 4.37 13.66 3 12 3zm6.5 9h-1c0 3.03-2.47 5.5-5.5 5.5S6.5 15.03 6.5 12h-1c0 3.24 2.39 5.93 5.5 6.41V21h2v-2.59c3.11-.48 5.5-3.17 5.5-6.41z"></path>
      </svg>
    </WrapSvg>
  );
}
function CameraMovie() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
      >
        <path d="M14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2zm3-7H3v12h14v-6.39l4 1.83V8.56l-4 1.83V6m1-1v3.83L22 7v8l-4-1.83V19H2V5h16z"></path>
      </svg>
    </WrapSvg>
  );
}
function Bell() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 24 24"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path d="M10 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm10-2.65V19H4v-1.65l2-1.88v-5.15C6 7.4 7.56 5.1 10 4.34v-.38c0-1.42 1.49-2.5 2.99-1.76.65.32 1.01 1.03 1.01 1.76v.39c2.44.75 4 3.06 4 5.98v5.15l2 1.87zm-1 .42-2-1.88v-5.47c0-2.47-1.19-4.36-3.13-5.1-1.26-.53-2.64-.5-3.84.03C8.15 6.11 7 7.99 7 10.42v5.47l-2 1.88V18h14v-.23z"></path>
      </svg>
    </WrapSvg>
  );
}
function Live() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 24 24"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <g>
          <path d="M14 12c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM8.48 8.45l-.71-.7C6.68 8.83 6 10.34 6 12s.68 3.17 1.77 4.25l.71-.71C7.57 14.64 7 13.39 7 12s.57-2.64 1.48-3.55zm7.75-.7-.71.71c.91.9 1.48 2.15 1.48 3.54s-.57 2.64-1.48 3.55l.71.71C17.32 15.17 18 13.66 18 12s-.68-3.17-1.77-4.25zM5.65 5.63l-.7-.71C3.13 6.73 2 9.24 2 12s1.13 5.27 2.95 7.08l.71-.71C4.02 16.74 3 14.49 3 12s1.02-4.74 2.65-6.37zm13.4-.71-.71.71C19.98 7.26 21 9.51 21 12s-1.02 4.74-2.65 6.37l.71.71C20.87 17.27 22 14.76 22 12s-1.13-5.27-2.95-7.08z"></path>
        </g>
      </svg>
    </WrapSvg>
  );
}
function LikeBold() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path d="M8 21V9.282c0-.834.26-1.647.745-2.325L13 1l.551.331c1.153.691 1.705 2.065 1.351 3.362L14 8h5.192c.827 0 1.609.376 2.125 1.022.711.888.795 2.125.209 3.101L21 13l.165.413c.519 1.296.324 2.769-.514 3.885l-.151.202v.5c0 1.657-1.343 3-3 3H8ZM4.5 9C3.672 9 3 9.672 3 10.5v9c0 .828.672 1.5 1.5 1.5H7V9H4.5Z"></path>
      </svg>
    </WrapSvg>
  );
}

function DisLikeBold() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path d="M16 3v11.718c0 .834-.26 1.647-.745 2.325L11 23l-.551-.331c-1.153-.691-1.705-2.065-1.351-3.362L10 16H4.808c-.827 0-1.609-.376-2.125-1.022-.711-.888-.795-2.125-.209-3.101L3 11l-.165-.413c-.519-1.296-.324-2.769.514-3.885L3.5 6.5V6c0-1.657 1.343-3 3-3H16Zm3 12c1.105 0 2-.895 2-2V5c0-1.105-.895-2-2-2h-2v12h2Z"></path>
      </svg>
    </WrapSvg>
  );
}

function CommentBold() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path
          clipRule="evenodd"
          d="M21 5c0-1.105-.895-2-2-2H5c-1.105 0-2 .895-2 2v12c0 1.105.895 2 2 2h12l3.146 3.146c.315.315.854.092.854-.353V5ZM7 9c0-.552.448-1 1-1h8c.552 0 1 .448 1 1s-.448 1-1 1H8c-.552 0-1-.448-1-1Zm1 3c-.552 0-1 .448-1 1s.448 1 1 1h5c.552 0 1-.448 1-1s-.448-1-1-1H8Z"
          fillRule="evenodd"
        ></path>
      </svg>
    </WrapSvg>
  );
}
function Share() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path d="M15 5.63 20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z"></path>
      </svg>
    </WrapSvg>
  );
}
function ShareBold() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path d="m13.202 3.368 9.438 7.865c.48.4.48 1.137 0 1.537l-9.438 7.865c-.652.543-1.64.08-1.64-.768V16H9.957c-2.778 0-5.406 1.263-7.141 3.432-.304.38-.912.086-.803-.388l1.118-4.843C3.968 10.572 7.2 8 10.926 8h.636V4.137c0-.848.989-1.311 1.64-.769Z"></path>
      </svg>
    </WrapSvg>
  );
}

function ArrowUp() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <polygon points="19.35,11.5 11.5,3.65 3.65,11.5 4.35,12.21 11,5.56 11,20 12,20 12,5.56 18.65,12.21"></polygon>
      </svg>
    </WrapSvg>
  );
}
function ArrowDown() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <polygon points="18.65,11.65 12,18.29 12,4 11,4 11,18.29 4.35,11.65 3.65,12.35 11.5,20.21 19.35,12.35"></polygon>
      </svg>
    </WrapSvg>
  );
}
function Filter() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 24 24"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path d="M15 17h6v1h-6v-1zm-4 0H3v1h8v2h1v-5h-1v2zm3-9h1V3h-1v2H3v1h11v2zm4-3v1h3V5h-3zM6 14h1V9H6v2H3v1h3v2zm4-2h11v-1H10v1z"></path>
      </svg>
    </WrapSvg>
  );
}
function Close() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 24 24"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path d="m12.71 12 8.15 8.15-.71.71L12 12.71l-8.15 8.15-.71-.71L11.29 12 3.15 3.85l.71-.71L12 11.29l8.15-8.15.71.71L12.71 12z"></path>
      </svg>
    </WrapSvg>
  );
}

function WaitList() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path d="M21 16h-7v-1h7v1zm0-5H9v1h12v-1zm0-4H3v1h18V7zm-11 8-7-4v8l7-4z"></path>
      </svg>
    </WrapSvg>
  );
}
function AddList() {
  return (
    <WrapSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        <path d="M22 13h-4v4h-2v-4h-4v-2h4V7h2v4h4v2zm-8-6H2v1h12V7zM2 12h8v-1H2v1zm0 4h8v-1H2v1z"></path>
      </svg>
    </WrapSvg>
  );
}
const icons = {
  bar,
  search,
  closeSearchQuery,
  voiceSearch,
  menu,
  user,
  // Thêm các biểu tượng khác vào đây
};
export {
  Close,
  User,
  Tick,
  Menu,
  ChevronLeft,
  ChevronRight,
  Search,
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
  MicroPhone,
  CameraMovie,
  Bell,
  Live,
  LikeBold,
  DisLikeBold,
  CommentBold,
  Share,
  ShareBold,
  ArrowUp,
  ArrowDown,
  Filter,
  WaitList,
  AddList,
};
export default icons;
