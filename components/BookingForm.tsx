"use client";

import { FormEvent, useEffect, useState } from "react";

function todayForInput() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 10);
}

export default function BookingForm() {
  const [date, setDate] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setDate(todayForInput());
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!contactName.trim()) {
      window.alert("请留下联系人，方便护理师确认档期。");
      return;
    }

    if (!phone.trim()) {
      window.alert("请留下联系电话，方便护理师确认档期。");
      return;
    }

    window.alert("预约已提交，我们会尽快联系你确认时间。");
    event.currentTarget.reset();
    setContactName("");
    setPhone("");
    setDate(todayForInput());
  }

  return (
    <form
      className="rounded-lg border border-white/80 bg-[rgba(255,250,243,0.94)] p-[22px] shadow-[0_18px_50px_rgba(52,39,29,0.14)] max-[900px]:max-w-[520px]"
      id="book"
      onSubmit={handleSubmit}
    >
      <h2 className="m-0 text-2xl font-bold tracking-normal">快速预约</h2>
      <p className="mb-[18px] mt-1.5 text-sm text-[var(--muted)]">
        提交后 10 分钟内由护理师确认档期。
      </p>

      <div className="my-3">
        <label className="mb-[7px] block text-[13px] font-bold text-[var(--muted)]" htmlFor="pet">
          宝贝类型
        </label>
        <select
          className="h-11 w-full rounded-lg border border-[var(--line)] bg-white px-3 text-[var(--ink)]"
          id="pet"
          name="pet"
        >
          <option>小型犬</option>
          <option>中大型犬</option>
          <option>短毛猫</option>
          <option>长毛猫</option>
        </select>
      </div>

      <div className="my-3">
        <label className="mb-[7px] block text-[13px] font-bold text-[var(--muted)]" htmlFor="service">
          服务项目
        </label>
        <select
          className="h-11 w-full rounded-lg border border-[var(--line)] bg-white px-3 text-[var(--ink)]"
          id="service"
          name="service"
        >
          <option>基础洗护</option>
          <option>精修造型</option>
          <option>皮毛 SPA</option>
          <option>洁牙护理</option>
        </select>
      </div>

      <div className="my-3">
        <label className="mb-[7px] block text-[13px] font-bold text-[var(--muted)]" htmlFor="date">
          期望日期
        </label>
        <input
          className="h-11 w-full rounded-lg border border-[var(--line)] bg-white px-3 text-[var(--ink)]"
          id="date"
          name="date"
          onChange={(event) => setDate(event.target.value)}
          type="date"
          value={date}
        />
      </div>

      <div className="my-3">
        <label className="mb-[7px] block text-[13px] font-bold text-[var(--muted)]" htmlFor="contactName">
          联系人
        </label>
        <input
          className="h-11 w-full rounded-lg border border-[var(--line)] bg-white px-3 text-[var(--ink)] placeholder:text-neutral-400"
          id="contactName"
          name="contactName"
          onChange={(event) => setContactName(event.target.value)}
          placeholder="请输入联系人姓名"
          type="text"
          value={contactName}
        />
      </div>

      <div className="my-3">
        <label className="mb-[7px] block text-[13px] font-bold text-[var(--muted)]" htmlFor="phone">
          联系电话
        </label>
        <input
          className="h-11 w-full rounded-lg border border-[var(--line)] bg-white px-3 text-[var(--ink)] placeholder:text-neutral-400"
          id="phone"
          name="phone"
          onChange={(event) => setPhone(event.target.value)}
          placeholder="请输入手机号"
          type="tel"
          value={phone}
        />
      </div>

      <button
        className="mt-2 inline-flex min-h-[42px] w-full cursor-pointer items-center justify-center rounded-full border-0 bg-[var(--sage)] px-[18px] font-bold text-white shadow-[0_10px_24px_rgba(36,32,29,0.18)]"
        type="submit"
      >
        发送预约
      </button>
    </form>
  );
}
