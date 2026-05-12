"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  FormButtonDefaultPrimary,
  FormButtonDisabledVariant,
  FormButtonErrorVariant,
  FormButtonLoadingVariant,
  FormButtonSuccessVariant,
} from "@/components/project/interactions";

type FormStatus = "idle" | "loading" | "success" | "error";

const FAKE_ERROR = true;

export function ReservationForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [canSubmit, setCanSubmit] = useState(false);

  const recomputeValidity = useCallback(() => {
    const form = formRef.current;
    if (!form) return;
    setCanSubmit(form.checkValidity());
  }, []);

  const resetForm = useCallback(() => {
    const form = formRef.current;
    form?.reset();
    setStatus("idle");
    queueMicrotask(() => recomputeValidity());
  }, [recomputeValidity]);

  const clearStatus = useCallback(() => {
    setStatus("idle");
    queueMicrotask(() => recomputeValidity());
  }, [recomputeValidity]);

  useEffect(() => {
    recomputeValidity();
  }, [recomputeValidity]);

  const isBusy = status === "loading";

  const fieldsetDisabled = isBusy;

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    try {
      setStatus("loading");

      // Placeholder async: swap to real API call when ready.
      await new Promise((r) => setTimeout(r, 900));

      if (FAKE_ERROR) throw new Error("Fake error");

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }, []);

  const actionButton = useMemo(() => {
    if (status === "loading") {
      return <FormButtonLoadingVariant type="submit" disabled />;
    }

    if (status === "success") {
      return (
        <FormButtonSuccessVariant
          type="button"
          title="Reserved! Reserve again"
          onClick={resetForm}
        />
      );
    }

    if (status === "error") {
      return (
        <FormButtonErrorVariant
          type="button"
          title="Something went wrong."
          onClick={clearStatus}
        />
      );
    }

    if (!canSubmit) {
      return (
        <FormButtonDisabledVariant
          type="submit"
          title="Reserve Now"
          disabled={false}
          aria-disabled
        />
      );
    }

    return <FormButtonDefaultPrimary type="submit" title="Reserve Now" />;
  }, [canSubmit, clearStatus, resetForm, status]);

  return (
    <form
      ref={formRef}
      className="home-reservation-form-list"
      onSubmit={onSubmit}
      onInput={recomputeValidity}
      onChange={recomputeValidity}
    >
      <fieldset className="home-reservation-fieldset" disabled={fieldsetDisabled}>
        <label className="label-wrap">
          <span className="type-body home-reservation-label-text">Full Name*</span>
          <input
            className="home-reservation-input"
            type="text"
            name="Full Name"
            placeholder="John Smith"
            required
            autoComplete="name"
          />
        </label>

        <label className="label-wrap">
          <span className="type-body home-reservation-label-text">Phone number*</span>
          <input
            className="home-reservation-input"
            type="tel"
            name="Phone Number"
            placeholder="(310) 555-1234"
            required
            autoComplete="tel"
          />
        </label>

        <label className="label-wrap">
          <span className="type-body home-reservation-label-text">Email address*</span>
          <input
            className="home-reservation-input"
            type="email"
            name="Email Address"
            placeholder="john.smith@email.com"
            required
            autoComplete="email"
          />
        </label>

        <label className="label-wrap">
          <span className="type-body home-reservation-label-text">Number of guests*</span>
          <input
            className="home-reservation-input"
            type="number"
            name="Number of Guests"
            placeholder="4 guests"
            required
            min={1}
          />
        </label>

        <label className="label-wrap">
          <span className="type-body home-reservation-label-text">Date*</span>
          <input
            className="home-reservation-input"
            type="date"
            name="Date"
            required
          />
        </label>

        <label className="label-wrap">
          <span className="type-body home-reservation-label-text">Time*</span>
          <input
            className="home-reservation-input"
            type="time"
            name="Time"
            required
          />
        </label>

        <label className="label-wrap label-wrap--span2">
          <span className="type-body home-reservation-label-text">Special requests</span>
          <textarea
            className="home-reservation-textarea"
            name="Special requests"
            placeholder="Window seat with birthday decoration"
          />
        </label>
      </fieldset>
      {actionButton}
    </form>
  );
}

