"use client";

import { ClipboardEvent, FormEvent, useEffect, useState } from "react";

function todayForInput() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 10);
}

type RegionOptions = Record<string, Record<string, readonly string[]>>;

const regionOptions: RegionOptions = {
  上海市: {
    上海市: ["黄浦区", "徐汇区", "长宁区", "静安区", "普陀区", "浦东新区"],
  },
  北京市: {
    北京市: ["东城区", "西城区", "朝阳区", "海淀区", "丰台区", "通州区"],
  },
  江苏省: {
    南京市: ["玄武区", "秦淮区", "建邺区", "鼓楼区", "江宁区"],
    苏州市: ["姑苏区", "吴中区", "相城区", "工业园区", "昆山市"],
  },
  浙江省: {
    杭州市: ["上城区", "拱墅区", "西湖区", "滨江区", "萧山区"],
    宁波市: ["海曙区", "江北区", "鄞州区", "镇海区", "北仑区"],
  },
  广东省: {
    广州市: ["越秀区", "荔湾区", "天河区", "海珠区", "番禺区"],
    深圳市: ["福田区", "罗湖区", "南山区", "宝安区", "龙岗区"],
  },
};

const mapAddressOptions = [
  {
    city: "上海市",
    detail: "花园路 88 号",
    district: "静安区",
    name: "毛茸日记静安店",
    province: "上海市",
    x: "52%",
    y: "42%",
  },
  {
    city: "上海市",
    detail: "南京西路 1266 号",
    district: "静安区",
    name: "南京西路服务点",
    province: "上海市",
    x: "62%",
    y: "36%",
  },
  {
    city: "上海市",
    detail: "陆家嘴环路 1000 号",
    district: "浦东新区",
    name: "陆家嘴服务点",
    province: "上海市",
    x: "74%",
    y: "54%",
  },
  {
    city: "深圳市",
    detail: "深南大道 2008 号",
    district: "福田区",
    name: "福田中心服务点",
    province: "广东省",
    x: "44%",
    y: "62%",
  },
];

type AddressTab = "province" | "city" | "district";

function compactAddress(address: string) {
  return address.replace(/\s+/g, "").replace(/[，,。；;]/g, "");
}

function parseAddress(address: string) {
  const compacted = compactAddress(address);

  for (const provinceName of Object.keys(regionOptions)) {
    const cities = regionOptions[provinceName];

    for (const cityName of Object.keys(cities)) {
      for (const districtName of cities[cityName]) {
        if (!compacted.includes(districtName)) {
          continue;
        }

        const hasProvince = compacted.includes(provinceName);
        const hasCity = compacted.includes(cityName);

        if (!hasProvince && !hasCity) {
          continue;
        }

        let detail = address;
        detail = detail.replace(provinceName, "");
        if (cityName !== provinceName) {
          detail = detail.replace(cityName, "");
        }
        detail = detail.replace(districtName, "");
        detail = detail.replace(/^[\s，,。；;-]+/, "").trim();

        return {
          city: cityName,
          detail,
          district: districtName,
          province: provinceName,
        };
      }
    }
  }

  return null;
}

export default function BookingForm() {
  const [date, setDate] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [addressTab, setAddressTab] = useState<AddressTab>("province");
  const [isAddressPickerOpen, setIsAddressPickerOpen] = useState(false);
  const [isMapPickerOpen, setIsMapPickerOpen] = useState(false);

  const cityOptions = province ? Object.keys(regionOptions[province]) : [];
  const districtOptions = province && city ? regionOptions[province][city] : [];
  const selectedRegion = [province, city, district].filter(Boolean).join(" / ");

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

    if (!province || !city || !district) {
      window.alert("请选择省份、城市和区，方便护理师安排上门服务。");
      return;
    }

    if (!detailAddress.trim()) {
      window.alert("请填写详细地址，方便护理师准确上门。");
      return;
    }

    window.alert("预约已提交，我们会尽快联系你确认时间。");
    event.currentTarget.reset();
    setContactName("");
    setPhone("");
    setProvince("");
    setCity("");
    setDistrict("");
    setDetailAddress("");
    setAddressTab("province");
    setIsAddressPickerOpen(false);
    setIsMapPickerOpen(false);
    setDate(todayForInput());
  }

  function handleAddressPaste(event: ClipboardEvent<HTMLInputElement>) {
    const pastedAddress = event.clipboardData.getData("text").trim();
    const parsedAddress = parseAddress(pastedAddress);

    if (!parsedAddress) {
      return;
    }

    event.preventDefault();
    setProvince(parsedAddress.province);
    setCity(parsedAddress.city);
    setDistrict(parsedAddress.district);
    setDetailAddress(parsedAddress.detail);
    setAddressTab("district");
    setIsAddressPickerOpen(false);
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

      <div className="my-3">
        <span className="mb-[7px] block text-[13px] font-bold text-[var(--muted)]">
          住址信息
        </span>
        <div className="grid gap-2">
          <button
            aria-expanded={isAddressPickerOpen}
            className="flex h-11 w-full cursor-pointer items-center justify-between rounded-lg border border-[var(--line)] bg-white px-3 text-left text-[var(--ink)]"
            onClick={() => {
              setIsAddressPickerOpen((isOpen) => !isOpen);
              setIsMapPickerOpen(false);
            }}
            type="button"
          >
            <span className={selectedRegion ? "" : "text-neutral-400"}>
              {selectedRegion || "请选择省 / 市 / 区"}
            </span>
            <span aria-hidden="true" className="text-sm text-[var(--muted)]">
              ▾
            </span>
          </button>

          {isAddressPickerOpen ? (
            <div className="rounded-lg border border-[var(--line)] bg-white p-3 shadow-[0_10px_24px_rgba(36,32,29,0.12)]">
              <div className="mb-3 grid grid-cols-3 border-b border-[var(--line)] text-sm font-bold">
                {(["province", "city", "district"] as AddressTab[]).map((tab) => (
                  <button
                    className={`border-b-2 px-2 pb-2 text-left ${
                      addressTab === tab
                        ? "border-[var(--coral)] text-[var(--ink)]"
                        : "border-transparent text-[var(--muted)]"
                    }`}
                    key={tab}
                    onClick={() => setAddressTab(tab)}
                    type="button"
                  >
                    {tab === "province" ? province || "省份" : null}
                    {tab === "city" ? city || "城市" : null}
                    {tab === "district" ? district || "区县" : null}
                  </button>
                ))}
              </div>

              {addressTab === "province" ? (
                <div className="grid grid-cols-3 gap-2 text-sm max-[560px]:grid-cols-2">
                  {Object.keys(regionOptions).map((option) => (
                    <button
                      className={`min-h-9 rounded-lg border px-2 text-left ${
                        province === option
                          ? "border-[var(--coral)] bg-[rgba(234,117,98,0.1)] text-[var(--ink)]"
                          : "border-[var(--line)] text-[var(--muted)]"
                      }`}
                      key={option}
                      onClick={() => {
                        setProvince(option);
                        setCity("");
                        setDistrict("");
                        setAddressTab("city");
                      }}
                      type="button"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : null}

              {addressTab === "city" ? (
                <div className="grid grid-cols-3 gap-2 text-sm max-[560px]:grid-cols-2">
                  {cityOptions.length ? (
                    cityOptions.map((option) => (
                      <button
                        className={`min-h-9 rounded-lg border px-2 text-left ${
                          city === option
                            ? "border-[var(--coral)] bg-[rgba(234,117,98,0.1)] text-[var(--ink)]"
                            : "border-[var(--line)] text-[var(--muted)]"
                        }`}
                        key={option}
                        onClick={() => {
                          setCity(option);
                          setDistrict("");
                          setAddressTab("district");
                        }}
                        type="button"
                      >
                        {option}
                      </button>
                    ))
                  ) : (
                    <p className="col-span-full m-0 text-sm text-[var(--muted)]">请先选择省份</p>
                  )}
                </div>
              ) : null}

              {addressTab === "district" ? (
                <div className="grid grid-cols-3 gap-2 text-sm max-[560px]:grid-cols-2">
                  {districtOptions.length ? (
                    districtOptions.map((option) => (
                      <button
                        className={`min-h-9 rounded-lg border px-2 text-left ${
                          district === option
                            ? "border-[var(--coral)] bg-[rgba(234,117,98,0.1)] text-[var(--ink)]"
                            : "border-[var(--line)] text-[var(--muted)]"
                        }`}
                        key={option}
                        onClick={() => {
                          setDistrict(option);
                          setIsAddressPickerOpen(false);
                        }}
                        type="button"
                      >
                        {option}
                      </button>
                    ))
                  ) : (
                    <p className="col-span-full m-0 text-sm text-[var(--muted)]">请先选择城市</p>
                  )}
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="grid grid-cols-[1fr_auto] gap-2 max-[560px]:grid-cols-1">
            <input
              className="h-11 w-full rounded-lg border border-[var(--line)] bg-white px-3 text-[var(--ink)] placeholder:text-neutral-400"
              id="detailAddress"
              name="detailAddress"
              onChange={(event) => setDetailAddress(event.target.value)}
              onPaste={handleAddressPaste}
              placeholder="粘贴完整地址，或填写街道门牌号"
              type="text"
              value={detailAddress}
            />
            <button
              className="h-11 cursor-pointer rounded-lg border border-[var(--line)] bg-white px-3 text-sm font-bold text-[var(--ink)]"
              onClick={() => {
                setIsMapPickerOpen((isOpen) => !isOpen);
                setIsAddressPickerOpen(false);
              }}
              type="button"
            >
              地图选点
            </button>
          </div>

          {isMapPickerOpen ? (
            <div className="rounded-lg border border-[var(--line)] bg-white p-3">
              <div className="relative h-40 overflow-hidden rounded-lg border border-[var(--line)] bg-[linear-gradient(135deg,#e8f2ef_0%,#f9efe5_52%,#e7edf7_100%)]">
                <div className="absolute left-[10%] right-[10%] top-1/2 h-px bg-white/80" />
                <div className="absolute bottom-[16%] left-1/2 top-[14%] w-px bg-white/80" />
                {mapAddressOptions.map((option) => (
                  <button
                    aria-label={`选择${option.name}`}
                    className="absolute grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-[var(--coral)] text-xs font-black text-white shadow-[0_10px_24px_rgba(36,32,29,0.18)]"
                    key={option.name}
                    onClick={() => {
                      setProvince(option.province);
                      setCity(option.city);
                      setDistrict(option.district);
                      setDetailAddress(option.detail);
                      setAddressTab("district");
                      setIsMapPickerOpen(false);
                    }}
                    style={{ left: option.x, top: option.y }}
                    type="button"
                  >
                    ·
                  </button>
                ))}
              </div>
              <div className="mt-2 grid gap-2">
                {mapAddressOptions.map((option) => (
                  <button
                    className="rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-left text-sm text-[var(--ink)]"
                    key={option.name}
                    onClick={() => {
                      setProvince(option.province);
                      setCity(option.city);
                      setDistrict(option.district);
                      setDetailAddress(option.detail);
                      setAddressTab("district");
                      setIsMapPickerOpen(false);
                    }}
                    type="button"
                  >
                    <strong className="block">{option.name}</strong>
                    <span className="text-[var(--muted)]">
                      {option.province}
                      {option.city}
                      {option.district}
                      {option.detail}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
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
