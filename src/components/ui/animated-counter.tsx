"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
    to: number;
    duration?: number;
    suffix?: string;
}

export function AnimatedCounter({ to, duration = 2, suffix = "" }: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number | null = null;
        const startValue = 0;
        const endValue = to;

        const animate = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);

            // Easing function (easeOutExpo)
            const easeOutExpo = (t: number): number => {
                return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            };

            const currentCount = Math.floor(
                startValue + (endValue - startValue) * easeOutExpo(progress)
            );

            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(endValue);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, to, duration]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
}
