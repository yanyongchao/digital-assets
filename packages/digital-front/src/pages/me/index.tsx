import GavelSvg from "@/assets/svg/gavel.svg?react";
import ReceiptSvg from "@/assets/svg/receipt.svg?react";
import CalendarClockSvg from "@/assets/svg/calendar-clock.svg?react";
import WalletSvg from "@/assets/svg/wallet.svg?react";
import IDCardSvg from "@/assets/svg/id-card.svg?react";
import LocationSvg from "@/assets/svg/location.svg?react";
import InfoSvg from "@/assets/svg/info.svg?react";
import ChevronRightSvg from "@/assets/svg/chevron-right.svg?react";

// ── 用户头像 ───────────────────────────────────────────────
function NFTAvatar() {
  return (
    <svg
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <circle cx="27" cy="27" r="27" fill="#faf7f6" />
      {/* 身体 */}
      <path
        d="M14 44C14 36 19 31 27 31C35 31 40 36 40 44"
        fill="#ffffff"
        stroke="#111111"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* 头 */}
      <rect
        x="17"
        y="14"
        width="20"
        height="17"
        rx="6"
        fill="#ffffff"
        stroke="#111111"
        strokeWidth="1.2"
      />
      {/* 左眼 */}
      <ellipse cx="23" cy="21" rx="2" ry="2.2" fill="#111111" />
      {/* 右眼 */}
      <ellipse cx="31" cy="21" rx="2" ry="2.2" fill="#111111" />
      {/* 嘴 */}
      <path
        d="M23 26.5C23 26.5 25 28 27 28C29 28 31 26.5 31 26.5"
        stroke="#111111"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* 黄色饼干 */}
      <circle
        cx="38"
        cy="35"
        r="5.5"
        fill="#f6d32f"
        stroke="#111111"
        strokeWidth="1"
      />
      <path
        d="M35.5 35H40.5"
        stroke="#111111"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M38 32.5V37.5"
        stroke="#111111"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* 小星星 */}
      <path
        d="M41 11L41.9 13.6H44.7L42.4 15.2L43.3 17.8L41 16.2L38.7 17.8L39.6 15.2L37.3 13.6H40.1L41 11Z"
        fill="#fdd000"
      />
    </svg>
  );
}

// ── 主页面 ─────────────────────────────────────────────────
const quickActions = [
  {
    label: "抢购",
    icon: <GavelSvg className="w-7 h-7 text-[#333333]" aria-hidden="true" />,
  },
  {
    label: "账单",
    icon: <ReceiptSvg className="w-7 h-7 text-[#333333]" aria-hidden="true" />,
  },
  {
    label: "预约",
    icon: (
      <CalendarClockSvg className="w-7 h-7 text-[#333333]" aria-hidden="true" />
    ),
  },
  {
    label: "钱包",
    icon: <WalletSvg className="w-7 h-7 text-[#333333]" aria-hidden="true" />,
  },
] as const;

const menuItems = [
  {
    label: "个人信息",
    icon: (
      <IDCardSvg className="w-4.5 h-4.5 text-[#71717a]" aria-hidden="true" />
    ),
  },
  {
    label: "我的地址",
    icon: (
      <LocationSvg className="w-4.5 h-4.5 text-[#71717a]" aria-hidden="true" />
    ),
  },
  {
    label: "关于我们",
    icon: <InfoSvg className="w-4.5 h-4.5 text-[#71717a]" aria-hidden="true" />,
  },
] as const;

export default function MePage() {
  return (
    <div className="relative overflow-x-hidden">
      {/* 暖色渐变背景 */}
      <div className="absolute inset-x-0 top-0 h-65 bg-[#fff8de] overflow-hidden pointer-events-none">
        <div
          className="absolute -right-20 -top-8 w-88 h-60 rounded-full"
          style={{
            background: "rgba(190, 152, 102, 0.36)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute -left-12 top-42.5 w-54.5 h-42.5 rounded-full"
          style={{
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.42), rgba(255,221,176,0.3), #f1e9db)",
            filter: "blur(35px)",
          }}
        />
        <div
          className="absolute -left-14 -top-24 w-49.75 h-40.75 rounded-full"
          style={{
            background: "rgba(190, 152, 102, 0.4)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* 标题栏占位（等同 Figma Title Bar 56px） */}
        <div className="h-14" />

        {/* 用户头像 & 信息 */}
        <div className="flex items-center px-4">
          <div
            className="w-13.5 h-13.5 rounded-full shrink-0 overflow-hidden"
            style={{ border: "2px solid #ffffff" }}
          >
            <NFTAvatar />
          </div>
          <div className="ml-4">
            <p className="text-[16px] leading-6 font-medium text-[#333333]">
              大收藏家001
            </p>
            <p className="text-[13px] leading-6 text-[#777777]">ID:10019283</p>
          </div>
        </div>

        {/* 快捷操作卡片 */}
        <div
          className="mx-2 mt-4 rounded-[10px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, #ffffff 63%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow:
              "0 5px 15px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div className="flex">
            {quickActions.map(({ label, icon }) => (
              <button
                key={label}
                type="button"
                className="flex-1 flex flex-col items-center pt-4.25 pb-3.75 gap-2 active:opacity-70"
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  {icon}
                </div>
                <span className="text-[12px] text-[#1b1b1b]">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 菜单列表 */}
        <div className="px-2 pt-3 flex flex-col gap-2">
          {menuItems.map(({ label, icon }) => (
            <button
              key={label}
              type="button"
              className="flex items-center w-full h-12 px-2 bg-white rounded-[10px] active:opacity-70"
            >
              <div className="w-4.5 h-4.5 shrink-0 flex items-center justify-center">
                {icon}
              </div>
              <span className="flex-1 ml-3 text-[14px] text-[#18181b] text-left">
                {label}
              </span>
              <ChevronRightSvg
                className="w-4.5 h-4.5 text-[#999999]"
                aria-hidden="true"
              />
            </button>
          ))}

          {/* 退出登录 */}
          <button
            type="button"
            className="flex items-center w-full h-12 px-2 bg-white rounded-[10px] active:opacity-70"
          >
            <span className="flex-1 text-[14px] text-[#7c221f] text-left">
              退出登录
            </span>
            <ChevronRightSvg
              className="w-4.5 h-4.5 text-[#999999]"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
