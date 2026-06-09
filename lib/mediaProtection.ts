import type { DragEvent, MouseEvent } from 'react';

export function preventMediaContextMenu(event: MouseEvent<HTMLElement>) {
  event.preventDefault();
}

export function preventMediaDrag(event: DragEvent<HTMLElement>) {
  event.preventDefault();
}

/** Discourage save-as and drag-download on portfolio images. */
export const protectedImageProps = {
  draggable: false,
  onContextMenu: preventMediaContextMenu,
  onDragStart: preventMediaDrag,
} as const;

/** Discourage save-as on portfolio videos. */
export const protectedVideoProps = {
  onContextMenu: preventMediaContextMenu,
  onDragStart: preventMediaDrag,
  controlsList: 'nodownload',
  disablePictureInPicture: true,
} as const;

/** For background-image panels and media wrappers (no onDragStart — conflicts with motion.div). */
export const protectedMediaSurfaceProps = {
  onContextMenu: preventMediaContextMenu,
} as const;
