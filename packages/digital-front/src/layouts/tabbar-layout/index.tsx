import type { CSSProperties } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TabBar from "@/components/tabbar";
import type { TabBarItem } from "@/components/tabbar";

type TabKey = "house" | "goods" | "exchange" | "me";

const tabRouteMap: Record<TabKey, string> = {
  house: "/home",
  goods: "/goods",
  exchange: "/exchange",
  me: "/me",
};

const routeTabMap: Record<string, TabKey> = {
  "/home": "house",
  "/goods": "goods",
  "/exchange": "exchange",
  "/me": "me",
};

const tabItems: TabBarItem[] = [
  { key: "house", label: "首页" },
  { key: "goods", label: "商品" },
  { key: "exchange", label: "兑换" },
  { key: "me", label: "我的" },
];

export default function TabbarLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeKey = routeTabMap[pathname] ?? "house";

  return (
    <div
      className="relative"
      style={
        { "--safe-bottom": "env(safe-area-inset-bottom)" } as CSSProperties
      }
    >
      <main className="pb-[calc(56px+var(--safe-bottom))]">
        <Outlet />
      </main>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 mx-auto flex w-full justify-center pb-[var(--safe-bottom)]]">
        <TabBar
          activeKey={activeKey}
          items={tabItems}
          onChange={(key) => navigate(tabRouteMap[key])}
          className="pointer-events-auto"
        />
      </div>
    </div>
  );
}
