'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CategorySection } from '@/components/CategorySection';

export interface CategoryStackItem {
  title: string;
  href: string;
  slug: string;
  videoSrc: string;
  mobileVideoSrc?: string;
  imageSrc?: string;
}

interface Props {
  categories: CategoryStackItem[];
}

export function CategoryStack({ categories }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const updateFocusedIndex = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || categories.length === 0) return;

    const { top, height } = wrapper.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (top >= viewportHeight) {
      setFocusedIndex(-1);
      return;
    }

    const sectionHeight = height / categories.length;
    if (sectionHeight <= 0) return;

    const scrolledIntoStack = Math.max(0, -top);
    const currentIndex = Math.min(
      categories.length - 1,
      Math.floor(scrolledIntoStack / sectionHeight),
    );

    setFocusedIndex(currentIndex);
  }, [categories.length]);

  useEffect(() => {
    updateFocusedIndex();

    window.addEventListener('scroll', updateFocusedIndex, { passive: true });
    window.addEventListener('resize', updateFocusedIndex, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateFocusedIndex);
      window.removeEventListener('resize', updateFocusedIndex);
    };
  }, [updateFocusedIndex]);

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
          videoLoadEnabled={
            focusedIndex >= 0 && Math.abs(i - focusedIndex) <= 1
          }
        />
      ))}
    </div>
  );
}
