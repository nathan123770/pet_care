import BookingForm from "@/components/BookingForm";

const services = [
  {
    icon: "泡",
    title: "基础洗护",
    color: "bg-[var(--blue)]",
    description: "温和清洁、吹干梳理、耳眼护理、脚底毛和指甲修剪。",
    points: ["一宠一巾一消毒", "低噪音吹水区", "护理报告同步"],
  },
  {
    icon: "剪",
    title: "精修造型",
    color: "bg-[var(--sage)]",
    description: "根据品种、毛量、生活习惯设计日常好打理的造型。",
    points: ["护理师一对一沟通", "圆脸、泰迪装、赛级线条", "可拍照确认效果"],
  },
  {
    icon: "护",
    title: "皮毛 SPA",
    color: "bg-[var(--coral)]",
    description: "针对干燥、打结、换毛期和敏感皮肤，做深层养护。",
    points: ["低敏配方可选", "开结与废毛管理", "香味轻柔不刺激"],
  },
];

const prices = [
  ["小型犬基础洗护", "洗澡、吹干、梳理、耳眼清洁、剪指甲", "¥98起"],
  ["猫咪轻柔洗护", "独立时段预约，低压力清洁与吹干", "¥168起"],
  ["全身精修造型", "适合贵宾、比熊、雪纳瑞、约克夏等犬种", "¥238起"],
  ["皮毛养护 SPA", "深层滋养、换毛期护理、毛结梳通", "¥128起"],
];

const reviews = [
  ["“我家狗很怕吹风，护理师一直分段休息，回家后完全没有应激，毛也蓬得很自然。”", "王女士 · 柯基主人"],
  ["“猫咪洗护全程有照片，耳朵和脚底毛处理得特别细，店里也没有刺鼻香精味。”", "陈先生 · 布偶主人"],
  ["“造型不是那种模板剪法，会问日常遛狗和打理习惯，这点很专业。”", "林小姐 · 比熊主人"],
];

const stats = [
  ["6年+", "主理人洗护经验"],
  ["30min", "接待间隔消毒"],
  ["4.9", "顾客平均评分"],
];

export default function Home() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-20 flex items-center justify-between gap-5 border-b border-[rgba(230,221,211,0.72)] bg-[rgba(255,250,243,0.88)] px-[clamp(18px,5vw,72px)] py-4 backdrop-blur-2xl max-[560px]:px-4 max-[560px]:py-3">
        <a aria-label="毛茸日记首页" className="flex items-center gap-2.5 whitespace-nowrap font-extrabold" href="#top">
          <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-[var(--sage)] text-lg text-white">
            P
          </span>
          <span>毛茸日记</span>
        </a>
        <nav aria-label="主导航" className="flex gap-[clamp(14px,2vw,30px)] text-sm text-[var(--muted)] max-[900px]:hidden">
          <a href="#services">洗护服务</a>
          <a href="#pricing">套餐价格</a>
          <a href="#reviews">顾客评价</a>
          <a href="#visit">到店信息</a>
        </nav>
        <a
          className="inline-flex min-h-[42px] items-center justify-center rounded-full bg-[var(--ink)] px-[18px] font-bold text-white shadow-[0_10px_24px_rgba(36,32,29,0.18)] max-[560px]:min-h-[38px] max-[560px]:px-3 max-[560px]:text-[13px]"
          href="#book"
        >
          立即预约
        </a>
      </header>

      <main className="overflow-hidden" id="top">
        <section
          aria-label="宠物洗护预约"
          className="grid min-h-[92vh] items-end bg-[linear-gradient(90deg,rgba(22,19,17,0.78)_0%,rgba(22,19,17,0.42)_46%,rgba(22,19,17,0.08)_100%),url('https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1800&q=82')] bg-cover bg-center px-[clamp(18px,5vw,72px)] pb-11 pt-[118px] max-[900px]:min-h-0 max-[900px]:pt-[104px] max-[560px]:px-4"
        >
          <div className="mx-auto grid w-[min(1180px,100%)] grid-cols-[minmax(0,1fr)_360px] items-end gap-[clamp(28px,5vw,72px)] max-[900px]:grid-cols-1">
            <div className="max-w-[720px] pb-[34px] text-white max-[900px]:pb-0">
              <div className="mb-[18px] inline-flex items-center gap-2.5 text-sm font-extrabold text-[#f7d7cf]">
                <span className="h-0.5 w-[42px] bg-current" />
                宠物洗护 · SPA · 造型修剪
              </div>
              <h1 className="m-0 max-w-[680px] text-[clamp(46px,8vw,86px)] font-extrabold leading-[0.96] tracking-normal">
                让每一次洗护，都像一次安心的小旅行
              </h1>
              <p className="mb-8 mt-[22px] max-w-[580px] text-[clamp(17px,2vw,20px)] text-white/85">
                毛茸日记为猫狗提供低压力洗护、精细修剪、皮毛护理与接送服务。透明看护、独立消毒、预约制接待，让宝贝干净、松弛、漂亮回家。
              </p>
              <div className="flex flex-wrap gap-3 max-[560px]:grid">
                <a
                  className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-[var(--coral)] px-6 font-bold text-white shadow-[0_10px_24px_rgba(36,32,29,0.18)] max-[560px]:w-full"
                  href="#book"
                >
                  预约今日档期
                </a>
                <a
                  className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-white/40 bg-white/15 px-[18px] font-bold text-white max-[560px]:w-full"
                  href="#services"
                >
                  查看服务
                </a>
              </div>
            </div>
            <BookingForm />
          </div>
        </section>

        <section className="bg-white px-[clamp(18px,5vw,72px)] py-[72px] max-[560px]:px-4 max-[560px]:py-[54px]" id="services">
          <div className="mx-auto w-[min(1180px,100%)]">
            <SectionTitle
              copy="每只宠物都先做状态评估，再安排对应洗护流程。敏感、年幼、老年宠物会预留更安静的护理时段。"
              title="洗护不赶场，细节有章法"
            />
            <div className="grid grid-cols-3 gap-[18px] max-[900px]:grid-cols-1">
              {services.map((service) => (
                <article className="min-h-[260px] rounded-lg border border-[var(--line)] bg-[var(--paper)] p-6" key={service.title}>
                  <div className={`mb-[26px] grid h-[46px] w-[46px] place-items-center rounded-full text-[22px] text-white ${service.color}`}>
                    {service.icon}
                  </div>
                  <h3 className="m-0 text-[22px] font-bold tracking-normal">{service.title}</h3>
                  <p className="text-[var(--muted)]">{service.description}</p>
                  <ul className="mt-5 grid list-none gap-2 p-0 font-semibold text-[var(--ink)]">
                    {service.points.map((point) => (
                      <li key={point}>
                        <span className="mr-2 text-[var(--sage-dark)]">✓</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-[clamp(18px,5vw,72px)] py-[72px] max-[560px]:px-4 max-[560px]:py-[54px]">
          <div className="mx-auto grid w-[min(1180px,100%)] grid-cols-[0.95fr_1.05fr] items-center gap-[clamp(28px,5vw,62px)] max-[900px]:grid-cols-1">
            <div className="min-h-[520px] overflow-hidden rounded-lg shadow-[0_18px_50px_rgba(52,39,29,0.14)] max-[900px]:min-h-[360px]">
              <img
                alt="护理师为狗狗梳理毛发"
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1541599468348-e96984315921?auto=format&fit=crop&w=1000&q=82"
              />
            </div>
            <div>
              <h2 className="mb-[18px] mt-0 text-[clamp(32px,5vw,54px)] font-extrabold leading-[1.05] tracking-normal">
                我们把“洗干净”做成一套可被信任的流程
              </h2>
              <p className="text-[17px] text-[var(--muted)]">
                到店先观察情绪、皮肤、耳道和毛结情况，再决定水温、洗剂、吹干方式和休息节奏。开放式护理台让主人能看见关键步骤，护理结束后会收到照片和本次护理建议。
              </p>
              <p className="text-[17px] text-[var(--muted)]">
                店内设有猫咪独立时段、犬只分区等候和臭氧消毒设备，减少交叉接触，也减少宠物的紧张感。
              </p>
              <div className="mt-7 grid grid-cols-3 gap-3.5 max-[560px]:grid-cols-1">
                {stats.map(([value, label]) => (
                  <div className="rounded-lg border-l-4 border-[var(--coral)] bg-white p-[18px]" key={label}>
                    <strong className="block text-[28px]">{value}</strong>
                    <span className="text-[13px] text-[var(--muted)]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[var(--cream)] px-[clamp(18px,5vw,72px)] py-[72px] max-[560px]:px-4 max-[560px]:py-[54px]" id="pricing">
          <div className="mx-auto w-[min(1180px,100%)]">
            <SectionTitle copy="价格按体型、毛量、打结程度微调，到店评估后再确认，不做隐形加价。" title="常用套餐" />
            <div className="grid gap-3">
              {prices.map(([title, copy, price]) => (
                <div
                  className="grid grid-cols-[1fr_auto] items-center gap-[18px] rounded-lg border border-[var(--line)] bg-white px-[22px] py-5 max-[560px]:grid-cols-1"
                  key={title}
                >
                  <div>
                    <strong className="text-lg">{title}</strong>
                    <span className="mt-1 block text-sm text-[var(--muted)]">{copy}</span>
                  </div>
                  <div className="whitespace-nowrap text-2xl font-black text-[var(--sage-dark)]">{price}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-[clamp(18px,5vw,72px)] py-[72px] max-[560px]:px-4 max-[560px]:py-[54px]" id="reviews">
          <div className="mx-auto w-[min(1180px,100%)]">
            <SectionTitle copy="干净只是基础，稳定、温柔、好沟通才是长期托付的关键。" title="被主人反复预约的理由" />
            <div className="grid grid-cols-3 gap-[18px] max-[900px]:grid-cols-1">
              {reviews.map(([quote, name]) => (
                <blockquote className="m-0 min-h-[210px] rounded-lg border border-[var(--line)] bg-[var(--paper)] p-6" key={name}>
                  <p className="mb-[22px] mt-0 text-[17px]">{quote}</p>
                  <footer className="font-bold text-[var(--muted)]">{name}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-[minmax(0,1fr)_420px] items-stretch gap-6 bg-[var(--sage-dark)] px-[clamp(18px,5vw,72px)] py-[72px] text-white max-[900px]:grid-cols-1 max-[560px]:px-4 max-[560px]:py-[54px]" id="visit">
          <div>
            <h2 className="m-0 text-[clamp(30px,5vw,48px)] font-extrabold tracking-normal">来店前，先把档期留好</h2>
            <p className="max-w-[650px] text-[17px] text-white/80">
              我们每天限制接待数量，给每只宠物留出足够洗护、安抚和收尾时间。支持电话、微信和页面预约，附近 3 公里可咨询接送。
            </p>
            <div className="mt-[30px] grid grid-cols-3 gap-3 max-[900px]:grid-cols-1">
              <ContactItem label="营业时间" value="10:00 - 20:00" />
              <ContactItem label="预约电话" value="021-8866 5200" />
              <ContactItem label="门店地址" value="上海市静安区花园路 88 号" />
            </div>
          </div>
          <div
            aria-label="宠物洗护门店照片"
            className="min-h-80 overflow-hidden rounded-lg bg-[linear-gradient(rgba(36,32,29,0.1),rgba(36,32,29,0.1)),url('https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=82')] bg-cover bg-center shadow-[0_18px_50px_rgba(52,39,29,0.14)]"
          />
        </section>
      </main>

      <footer className="flex justify-between gap-[18px] border-t border-[var(--line)] bg-white px-[clamp(18px,5vw,72px)] py-6 text-sm text-[var(--muted)] max-[560px]:grid">
        <span>© 2026 毛茸日记宠物洗护店</span>
        <span>预约制接待 · 透明护理 · 一宠一消毒</span>
      </footer>
    </>
  );
}

function SectionTitle({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="mb-[30px] flex items-end justify-between gap-6 max-[900px]:block">
      <h2 className="m-0 text-[clamp(30px,5vw,48px)] font-extrabold leading-[1.05] tracking-normal">{title}</h2>
      <p className="m-0 max-w-[420px] text-[var(--muted)] max-[900px]:mt-3">{copy}</p>
    </div>
  );
}

function ContactItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/20 bg-white/10 p-[18px]">
      <span className="block text-[13px] text-white/60">{label}</span>
      <strong className="mt-1.5 block [overflow-wrap:anywhere]">{value}</strong>
    </div>
  );
}
