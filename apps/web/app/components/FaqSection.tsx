"use client";

import { useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { cn } from "~/lib/utils";

interface FaqItem {
    question: string;
    answer: string;
}

const DEFAULT_FAQS: FaqItem[] = [
    {
        question: "How do I book a ride?",
        answer:
            "Select your pickup university and dropoff train station, pick a date, and confirm. Your driver will be matched and details shared instantly.",
    },
    {
        question: "How is pricing calculated?",
        answer:
            "Fares are based on distance, route, and time of day, and are shown upfront before you confirm your booking — no surprises.",
    },
    {
        question: "Are drivers verified?",
        answer:
            "Yes. Every driver undergoes identity verification and background checks before they can accept rides on Beckon.",
    },
    {
        question: "Can I cancel or change my ride?",
        answer:
            "You can cancel from the Ride tab before your driver departs. Fees may apply depending on how close to pickup you cancel.",
    },
    {
        question: "What if my train is delayed?",
        answer:
            "No problem. Drivers monitor train schedules, and you can adjust your pickup time from the app if you're running late.",
    },
    {
        question: "How do I get help or support?",
        answer:
            "Drop us a line using the contact form or in-app chat — our support team usually responds within a few hours.",
    },
];

export interface FaqSectionProps {
    faqs?: FaqItem[];
    className?: string;
}

export default function FaqSection({ faqs, className }: FaqSectionProps) {
    const items = faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS;
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <LazyMotion features={domAnimation}>
            <section className={cn("px-6", className)}>
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center">
                        Have questions? Relax, we have the answers.
                    </h2>
                    <p className="text-neutral-500 text-lg mb-10 text-center">
                        If you can't find an answer that you're looking for, feel
                        free to drop us a line.
                    </p>

                    <div className="space-y-4">
                        {items.map((item, index) => {
                            const open = openIndex === index;

                            return (
                                <div
                                    key={item.question}
                                    className={cn(
                                        "border border-neutral-200 rounded-2xl",
                                        open ? "bg-neutral-50" : "bg-white",
                                    )}
                                >
                                    <button
                                        type="button"
                                        aria-expanded={open}
                                        aria-controls={`faq-panel-${index}`}
                                        id={`faq-button-${index}`}
                                        onClick={() =>
                                            setOpenIndex(open ? null : index)
                                        }
                                        className={cn(
                                            "w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors rounded-t-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                            !open && "rounded-b-2xl",
                                            !open && "hover:bg-neutral-50",
                                        )}
                                    >
                                        <h3 className="text-lg md:text-xl font-semibold leading-[1.3] text-neutral-800">
                                            {item.question}
                                        </h3>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className={cn(
                                                "shrink-0 text-neutral-400 transition-transform duration-200",
                                                open && "rotate-180",
                                            )}
                                        >
                                            <path d="m6 9 6 6 6-6" />
                                        </svg>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {open && (
                                            <m.div
                                                id={`faq-panel-${index}`}
                                                role="region"
                                                aria-labelledby={`faq-button-${index}`}
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{
                                                    height: "auto",
                                                    opacity: 1,
                                                }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{
                                                    duration: 0.3,
                                                    ease: [0.4, 0, 0.2, 1],
                                                }}
                                                className="px-6 overflow-hidden"
                                            >
                                                <p className="pb-6 text-neutral-600 text-base leading-relaxed">
                                                    {item.answer}
                                                </p>
                                            </m.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </LazyMotion>
    );
}