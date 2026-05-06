import type { CSSProperties, ReactNode } from "react";
import { TabBar as AntdTabBar } from "antd-mobile";
import HouseSvg from "@/assets/svg/tab-house.svg?react";
import GoodsSvg from "@/assets/svg/tab-goods.svg?react";
import ExchangeSvg from "@/assets/svg/tab-exchange.svg?react";
import MeSvg from "@/assets/svg/tab-me.svg?react";

type TabBarItemKey = "house" | "goods" | "exchange" | "me";

export interface TabBarItem {
  key: TabBarItemKey;
  label: string;
  icon?: ReactNode | ((active: boolean) => ReactNode);
}

interface TabBarProps {
  activeKey?: TabBarItemKey;
  items?: TabBarItem[];
  onChange?: (key: TabBarItemKey) => void;
  className?: string;
  activeColor?: string;
  inactiveColor?: string;
}

function DefaultIcon({
  active,
  tabKey,
}: {
  active: boolean;
  tabKey: TabBarItemKey;
}) {
  const baseClassName = `h-[24px] w-[24px] ${active ? "text-[var(--tab-active-color)]" : "text-[var(--tab-inactive-color)]"}`;

  if (tabKey === "house") {
    return <HouseSvg className={baseClassName} aria-hidden="true" />;
  }

  if (tabKey === "goods") {
    return <GoodsSvg className={baseClassName} aria-hidden="true" />;
  }

  if (tabKey === "exchange") {
    return <ExchangeSvg className={baseClassName} aria-hidden="true" />;
  }

  return <MeSvg className={baseClassName} aria-hidden="true" />;
}

const defaultItems: TabBarItem[] = [
  { key: "house", label: "首页" },
  { key: "goods", label: "商品" },
  { key: "exchange", label: "兑换" },
  { key: "me", label: "我的" },
];

export default function TabBar({
  activeKey = "house",
  items = defaultItems,
  onChange,
  className = "",
  activeColor = "#BE9866",
  inactiveColor = "#1B1B1B",
}: TabBarProps) {
  const style = {
    "--tab-active-color": activeColor,
    "--tab-inactive-color": inactiveColor,
    "--adm-color-primary": activeColor,
  } as CSSProperties;

  return (
    <nav
      aria-label="底部导航"
      style={style}
      className={`h-[56px] w-full bg-white px-[8px] shadow-[inset_0_1px_0_rgba(255,255,255,1),0_5px_15px_rgba(0,0,0,0.03)] backdrop-blur-[20px] ${className}`}
    >
      <AntdTabBar
        activeKey={activeKey}
        onChange={(key) => onChange?.(key as TabBarItemKey)}
        className="h-full"
      >
        {items.map((item) => {
          const active = item.key === activeKey;
          const icon =
            typeof item.icon === "function"
              ? item.icon(active)
              : (item.icon ?? (
                  <DefaultIcon active={active} tabKey={item.key} />
                ));

          return (
            <AntdTabBar.Item
              key={item.key}
              icon={icon}
              title={
                <span
                  className="text-[12px] leading-[16px]"
                  style={{
                    color: active ? activeColor : inactiveColor,
                    fontWeight: 330,
                  }}
                >
                  {item.label}
                </span>
              }
            />
          );
        })}
      </AntdTabBar>
    </nav>
  );
}
