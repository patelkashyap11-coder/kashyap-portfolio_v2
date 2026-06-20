'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CategorySection } from '@/components/CategorySection';

export interface CategoryStackItem {
  title: string;
  href: string;
  slug: string;
  videoSrc: string;
  imageSrc: string;
}

interface Props {
  categories: CategoryStackItem[];
}

export function CategoryStack({ categories }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const updateActiveIndex = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || categories.length === 0) return;

    const { top, height } = wrapper.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Stack still below the viewport — don't load any category videos yet.
    if (top >= viewportHeight) return;

    const sectionHeight = height / categories.length;
    if (sectionHeight <= 0) return;

    const scrolledIntoStack = Math.max(0, -top);
    const currentIndex = Math.min(
      categories.length - 1,
      Math.floor(scrolledIntoStack / sectionHeight),
    );

    setActiveIndex((prev) => Math.max(prev, currentIndex));
  }, [categories.length]);

  useEffect(() => {
    updateActiveIndex();

    window.addEventListener('scroll', updateActiveIndex, { passive: true });
    window.addEventListener('resize', updateActiveIndex, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateActiveIndex);
      window.removeEventListener('resize', updateActiveIndex);
    };
  }, [updateActiveIndex]);

  return (
    <div
      ref={wrapperRef}
      className="category-stack-wrapper"
      style={{
        height: `${categories.length * 100}vh`,
        ['--category-stack-count' as string]: categories.length,
      }}
    >
      {categories.map((cat, i) => (
        <CategorySection
          key={cat.href}
          {...cat}
          index={i}
          videoLoadEnabled={activeIndex >= 0 && i <= activeIndex + 1}
        />
      ))}
    </div>
  );
}
