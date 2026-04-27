import { NavLink, Navigate, Route, Routes } from 'react-router-dom'

const highlights = [
  { label: '今日上新', value: '24' },
  { label: '活跃用户', value: '18,402' },
  { label: '7日成交', value: '¥ 82.6w' },
  { label: '收藏总量', value: '126k' },
]

const quickEntries = ['品牌专区', '发行日历', '权益中心', '帮助文档']

const collections = [
  {
    title: '云影计划 01',
    artist: 'NOVA STUDIO',
    price: '¥ 229',
    change: '+12.4%',
    badge: '热门',
  },
  {
    title: '晨海档案',
    artist: 'MORI LAB',
    price: '¥ 169',
    change: '+7.8%',
    badge: '趋势',
  },
  {
    title: '2046 霓光',
    artist: 'PIXEL MUSE',
    price: '¥ 319',
    change: '+18.1%',
    badge: '稀有',
  },
]

const trendItems = [
  { title: '发行转化率', value: '68%', tag: '较昨日 +6%' },
  { title: '用户留存', value: '41%', tag: '7 日口径' },
]

function SectionHeader({
  title,
  extra,
}: {
  title: string
  extra: React.ReactNode
}) {
  return (
    <div className="mb-[12px] flex items-center justify-between">
      <h2 className="m-0 text-[15px] font-medium text-[#1f2933]">{title}</h2>
      {extra}
    </div>
  )
}

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto grid min-h-svh max-w-[480px] gap-[12px] [padding-top:calc(16px+var(--safe-top))] [padding-right:calc(16px+var(--safe-right))] [padding-bottom:calc(16px+var(--safe-bottom))] [padding-left:calc(16px+var(--safe-left))] md:max-w-[864px] md:grid-cols-[1.2fr_1fr] md:content-start md:px-[24px] md:py-[24px]">
      <header className="flex items-center justify-between rounded-[18px] border border-[#e6dcc5] bg-[rgba(255,251,243,0.86)] px-[14px] py-[12px] backdrop-blur-[10px] md:col-span-2">
        <div>
          <p className="m-0 text-[30px] uppercase tracking-[0.12em] text-[#829ab1]">
            MOBILE TEMPLATE
          </p>
          <p className="mt-[4px] text-[14px] font-medium text-[#102a43]">
            375 设计稿直接写 px
          </p>
        </div>
        <button
          type="button"
          className="h-[34px] rounded-full border border-[#d9cda8] bg-[#fff7dd] px-[12px] text-[12px] text-[#7c5f1a]"
        >
          预览
        </button>
      </header>

      {children}

      <nav className="sticky [bottom:calc(12px+var(--safe-bottom))] z-10 grid grid-cols-4 gap-[8px] rounded-[18px] border border-[#e6dcc5] bg-[rgba(255,251,243,0.92)] px-[8px] pt-[8px] [padding-bottom:calc(8px+var(--safe-bottom))] backdrop-blur-[14px] md:col-span-2">
        {[
          { label: '首页', to: '/' },
          { label: '资产', to: '/assets' },
          { label: '行情', to: '/market' },
          { label: '我的', to: '/profile' },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              isActive
                ? 'rounded-[12px] bg-[#102a43] px-[8px] py-[10px] text-center text-[12px] text-white no-underline'
                : 'rounded-[12px] px-[8px] py-[10px] text-center text-[12px] text-[#486581] no-underline'
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </main>
  )
}

function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#102a43_0%,#144552_45%,#2a6f65_100%)] px-[16px] py-[16px] text-[#f6f4ef] shadow-[0_14px_40px_rgba(16,42,67,0.32)] before:pointer-events-none before:absolute before:inset-[auto_-22%_-48%_auto] before:h-[192px] before:w-[192px] before:rotate-[20deg] before:rounded-full before:bg-[rgba(241,239,225,0.08)] before:content-[''] after:pointer-events-none after:absolute after:inset-[0_0_auto_0] after:h-[120px] after:bg-[radial-gradient(circle_at_90%_-10%,rgba(246,185,84,0.32),transparent_50%)] after:content-[''] md:min-h-[256px] md:px-[20px] md:py-[20px]">
        <p className="m-0 text-[10px] uppercase tracking-[0.14em] text-[rgba(246,244,239,0.76)]">
          DIGITAL ASSETS HUB
        </p>
        <h1 className="my-[8px] text-[26px] leading-[1.2] font-medium md:max-w-[14em]">
          把数字资产放进可交易的画廊
        </h1>
        <p className="m-0 w-[88%] text-[13px] text-[rgba(246,244,239,0.85)]">
          375 设计稿移动端示例。默认使用 rem 尺寸，关键布局叠加 vw，兼顾还原度与可读性。
        </p>
        <div className="mt-[14px] flex gap-[8px]">
          <NavLink
            to="/assets"
            className="h-[36px] rounded-full border-0 bg-[#f6c453] px-[14px] leading-[36px] text-[13px] text-[#102a43] no-underline"
          >
            立即探索
          </NavLink>
          <NavLink
            to="/market"
            className="h-[36px] rounded-full border-0 bg-[rgba(246,244,239,0.12)] px-[14px] leading-[36px] text-[13px] text-[#f6f4ef] no-underline backdrop-blur-[4px]"
          >
            查看白皮书
          </NavLink>
        </div>
      </section>

      <section className="grid grid-cols-4 gap-[8px] md:col-span-2">
        {quickEntries.map((entry) => (
          <button
            key={entry}
            type="button"
            className="rounded-[14px] border border-[#e2d8bf] bg-[#fffdf7] px-[8px] py-[12px] text-[12px] text-[#334e68] shadow-[0_6px_18px_rgba(16,42,67,0.06)]"
          >
            {entry}
          </button>
        ))}
      </section>

      <section
        className="rounded-[16px] border border-[#e6dcc5] bg-[#f7f4eb] p-[14px]"
        aria-label="核心数据"
      >
        <SectionHeader
          title="核心数据"
          extra={<span className="text-[11px] text-[#486581]">实时更新</span>}
        />
        <div className="grid grid-cols-2 gap-[8px]">
          {highlights.map((item) => (
            <article
              key={item.label}
              className="rounded-[12px] border border-[#e9e4d8] bg-white p-[10px]"
            >
              <p className="m-0 text-[11px] text-[#7b8794]">{item.label}</p>
              <strong className="mt-[6px] block text-[17px] text-[#102a43]">
                {item.value}
              </strong>
            </article>
          ))}
        </div>
      </section>

      <section
        className="rounded-[16px] border border-[#e6dcc5] bg-[#f7f4eb] p-[14px]"
        aria-label="趋势指标"
      >
        <SectionHeader
          title="趋势指标"
          extra={<span className="text-[11px] text-[#486581]">本周</span>}
        />
        <div className="grid gap-[8px]">
          {trendItems.map((item) => (
            <article
              key={item.title}
              className="rounded-[12px] border border-[#e9e4d8] bg-white p-[10px]"
            >
              <p className="m-0 text-[11px] text-[#7b8794]">{item.title}</p>
              <div className="mt-[6px] flex items-end justify-between">
                <strong className="text-[18px] text-[#102a43]">{item.value}</strong>
                <span className="rounded-full bg-[#eef8f0] px-[8px] py-[3px] text-[10px] text-[#2f9e44]">
                  {item.tag}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="rounded-[16px] border border-[#e6dcc5] bg-[#f7f4eb] p-[14px] md:col-span-2"
        aria-label="热门合集"
      >
        <SectionHeader
          title="热门合集"
          extra={
            <NavLink to="/assets" className="text-[11px] text-[#486581] no-underline">
              全部
            </NavLink>
          }
        />
        <div className="grid gap-[8px]">
          {collections.map((item) => (
            <article
              key={item.title}
              className="relative grid grid-cols-[42px_1fr_auto] items-center gap-[10px] rounded-[12px] border border-[#e7ddc6] bg-white p-[10px]"
            >
              <div
                aria-hidden="true"
                className="h-[42px] w-[42px] rounded-[10px] bg-[linear-gradient(130deg,rgba(42,111,101,0.8),rgba(246,196,83,0.88))]"
              />
              <div>
                <p className="m-0 text-[13px] text-[#1f2933]">{item.title}</p>
                <p className="mt-[4px] text-[11px] text-[#7b8794]">{item.artist}</p>
              </div>
              <div>
                <p className="m-0 text-right text-[12px] text-[#102a43]">{item.price}</p>
                <span className="mt-[4px] block text-right text-[11px] text-[#2f9e44]">
                  {item.change}
                </span>
              </div>
              <i className="absolute top-[8px] right-[8px] rounded-full border border-[#c8b890] bg-[#fff7dd] px-[6px] py-[2px] text-[9px] not-italic text-[#8d6b1f]">
                {item.badge}
              </i>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function OverviewPage({
  title,
  description,
  accent,
}: {
  title: string
  description: string
  accent: string
}) {
  return (
    <section className="rounded-[20px] border border-[#e6dcc5] bg-[#fffdf7] p-[16px] shadow-[0_10px_30px_rgba(16,42,67,0.08)] md:col-span-2">
      <div
        className="mb-[16px] h-[140px] rounded-[16px]"
        style={{ background: accent }}
      />
      <h1 className="m-0 text-[26px] font-medium leading-[1.2] text-[#102a43]">{title}</h1>
      <p className="mt-[8px] text-[13px] text-[#486581]">{description}</p>
      <div className="mt-[16px] grid gap-[8px] md:grid-cols-3">
        {['待发布', '进行中', '已归档'].map((item, index) => (
          <article
            key={item}
            className="rounded-[14px] border border-[#ece3ce] bg-[#f7f4eb] p-[12px]"
          >
            <p className="m-0 text-[11px] text-[#7b8794]">{item}</p>
            <strong className="mt-[6px] block text-[20px] text-[#102a43]">
              {index * 7 + 12}
            </strong>
          </article>
        ))}
      </div>
    </section>
  )
}

function NotFoundPage() {
  return (
    <section className="rounded-[20px] border border-[#e6dcc5] bg-[#fffdf7] p-[20px] text-center shadow-[0_10px_30px_rgba(16,42,67,0.08)] md:col-span-2">
      <p className="m-0 text-[12px] uppercase tracking-[0.12em] text-[#829ab1]">404</p>
      <h1 className="mt-[8px] text-[24px] font-medium text-[#102a43]">页面不存在</h1>
      <p className="mt-[8px] text-[13px] text-[#486581]">当前地址没有匹配的页面，返回首页继续浏览。</p>
      <NavLink
        to="/"
        className="mt-[16px] inline-block rounded-full bg-[#102a43] px-[16px] py-[10px] text-[12px] text-white no-underline"
      >
        返回首页
      </NavLink>
    </section>
  )
}

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/assets"
          element={
            <OverviewPage
              title="资产中心"
              description="管理合集、发行批次和资产状态。这里适合接你后面的真实资产列表和筛选条件。"
              accent="linear-gradient(135deg, #19456b 0%, #2a6f97 100%)"
            />
          }
        />
        <Route
          path="/market"
          element={
            <OverviewPage
              title="行情概览"
              description="集中展示成交额、涨跌幅和热门榜单。这里后续可以接图表与实时行情接口。"
              accent="linear-gradient(135deg, #5f0f40 0%, #9a031e 100%)"
            />
          }
        />
        <Route
          path="/profile"
          element={
            <OverviewPage
              title="我的空间"
              description="展示账户、持仓、权益和订单记录。这里适合接用户中心相关页面。"
              accent="linear-gradient(135deg, #0f766e 0%, #2dd4bf 100%)"
            />
          }
        />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  )
}

export default App
