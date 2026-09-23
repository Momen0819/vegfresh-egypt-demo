"use client";

import { useState, type FormEvent } from "react";
import { waLink } from "@/lib/site";
import type { Dictionary } from "@/i18n/dictionaries/ar";

type Labels = Dictionary["contact"]["form"];

/** Quote request form. No backend: it opens WhatsApp with the message pre-filled. */
export function RfqForm({ t }: { t: Labels }) {
  const [status, setStatus] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const v = (k: string) => String(data.get(k) ?? "").trim();
    if (!v("name") || !v("product")) {
      setStatus(t.error);
      return;
    }
    const text = [
      t.waTitle,
      `${t.name}: ${v("name")}`,
      `${t.email}: ${v("email")}`,
      `${t.product}: ${v("product")}`,
      `${t.qty}: ${v("qty")}`,
      v("message"),
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(text), "_blank", "noopener");
    setStatus(t.sent);
  }

  return (
    <form className="rfq" noValidate onSubmit={onSubmit}>
      <label>
        <span>{t.name}</span>
        <input id="f-name" name="name" type="text" placeholder={t.namePh} required autoComplete="name" />
      </label>
      <label>
        <span>{t.email}</span>
        <input id="f-mail" name="email" type="email" placeholder="name@company.com" autoComplete="email" />
      </label>
      <label>
        <span>{t.product}</span>
        <input id="f-prod" name="product" type="text" placeholder={t.productPh} required />
      </label>
      <label>
        <span>{t.qty}</span>
        <input id="f-qty" name="qty" type="text" placeholder={t.qtyPh} />
      </label>
      <label className="full">
        <span>{t.message}</span>
        <textarea id="f-msg" name="message" rows={2} placeholder={t.messagePh} />
      </label>
      <div className="full rfq-actions">
        <button className="btn btn-o" type="submit">
          {t.send}
        </button>
        <span className="form-msg" role="status">
          {status}
        </span>
      </div>
    </form>
  );
}
