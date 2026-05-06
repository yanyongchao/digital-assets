import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="grid min-h-svh place-items-center bg-[#f7f4ef] px-[20px] text-[#1b1b1b]">
      <section className="w-full max-w-[420px] rounded-[24px] border border-[#eadfc7] bg-white p-[28px] text-center shadow-[0_18px_50px_rgba(72,48,20,0.1)]">
        <p className="m-0 text-[14px] tracking-[0.18em] text-[#be9866]">404</p>
        <h1 className="mt-[10px] mb-0 text-[28px] leading-[1.2] font-semibold text-[#111111]">
          页面不存在
        </h1>
        <p className="mt-[10px] mb-0 text-[14px] leading-[1.6] text-[#6e6e6e]">
          你访问的页面可能已被移动或删除，请返回登录页继续操作。
        </p>

        <Link
          to="/login"
          className="mt-[26px] inline-flex h-[46px] min-w-[148px] items-center justify-center rounded-[8px] border border-[#fdf0be] bg-[linear-gradient(180deg,#fff4ca_0%,#e8b55c_100%)] px-[18px] text-[15px] font-semibold text-[#734833] no-underline shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_0_rgba(234,180,83,0.9),0_10px_18px_rgba(148,72,10,0.12)]"
        >
          返回登录
        </Link>
      </section>
    </main>
  )
}