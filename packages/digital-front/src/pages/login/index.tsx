import { useEffect, useState } from 'react'
import LoginHeroImg from '@/assets/images/login-hero.png'
import MailSvg from '@/assets/svg/mail.svg?react'
import CodeSvg from '@/assets/svg/code.svg?react'

export default function LoginPage() {
	const [email, setEmail] = useState('peterparker@dpop.site')
	const [code, setCode] = useState('')
	const [secondsLeft, setSecondsLeft] = useState(59)

	useEffect(() => {
		if (secondsLeft === 0) {
			return
		}

		const timer = window.setTimeout(() => {
			setSecondsLeft((current) => Math.max(current - 1, 0))
		}, 1000)

		return () => window.clearTimeout(timer)
	}, [secondsLeft])

	const resendLabel =
		secondsLeft > 0 ? `重新发送验证码(${secondsLeft})` : '重新发送验证码'

	return (
		<main className="min-h-svh bg-[#f7f4ef] text-[#1b1b1b]">
			<section className="mx-auto min-h-svh max-w-[480px] overflow-hidden bg-white shadow-[0_18px_60px_rgba(74,51,25,0.08)]">
				<div className="relative h-[403px] overflow-hidden bg-[#f8f5ef]">
					<img
						src={LoginHeroImg}
						alt="Porcelain 古瓷盛境"
						className="h-full w-full object-cover object-top"
					/>
				</div>

				<div className="relative z-10 -mt-[8px] rounded-t-[30px] bg-white px-[24px] pt-[28px] pb-[56px] shadow-[0_-18px_38px_rgba(27,27,27,0.08)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-[84px] before:bg-[linear-gradient(180deg,rgba(151,151,151,0.16),rgba(255,255,255,0))] before:content-['']">
					<div className="relative z-[1]">
						<h1
							className="m-0 text-[28px] leading-[1.2] font-bold tracking-[0.01em] text-[#111111]"
							style={{ fontFamily: 'STSong, Songti SC, Noto Serif SC, serif' }}
						>
							欢迎登录
						</h1>

						<form className="mt-[34px]" onSubmit={(event) => event.preventDefault()}>
							<label className="flex h-[48px] items-center gap-[8px] rounded-[8px] border border-[#bdc1c6] bg-white px-[12px] shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] transition-colors focus-within:border-[#be9866]">
								<span className="shrink-0 text-[#be9866]">
									<MailSvg />
								</span>
								<input
									type="email"
									value={email}
									onChange={(event) => setEmail(event.target.value)}
									className="h-full w-full border-0 bg-transparent p-0 text-[14px] text-[#111111] outline-none placeholder:text-[#979797]"
									placeholder="输入邮箱"
								/>
							</label>

							<label className="mt-[20px] flex h-[48px] items-center gap-[8px] rounded-[8px] border border-[#bdc1c6] bg-white px-[12px] transition-colors focus-within:border-[#be9866]">
								<span className="shrink-0 text-[#bdc1c6]">
									<CodeSvg />
								</span>
								<input
									type="text"
									inputMode="numeric"
									maxLength={6}
									value={code}
									onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
									className="h-full w-full border-0 bg-transparent p-0 text-[14px] text-[#111111] outline-none placeholder:text-[#979797]"
									placeholder="输入验证码"
								/>
							</label>

							<div className="mt-[18px] flex justify-end">
								<button
									type="button"
									disabled={secondsLeft > 0}
									onClick={() => setSecondsLeft(59)}
									className="border-0 bg-transparent p-0 text-[14px] text-[#be9866] disabled:cursor-default disabled:opacity-100"
								>
									{resendLabel}
								</button>
							</div>

							<button
								type="submit"
								className="mt-[40px] flex h-[48px] w-full items-center justify-center rounded-[8px] border border-[#fdf0be] bg-[linear-gradient(180deg,#fff4ca_0%,#e8b55c_100%)] text-[16px] font-semibold text-[#734833] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_0_rgba(234,180,83,0.9),0_12px_18px_rgba(148,72,10,0.1)]"
							>
								登录
							</button>
						</form>
					</div>
				</div>
			</section>
		</main>
	)
}
