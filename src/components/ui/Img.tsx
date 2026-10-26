import type { Photo } from '../../data/images'
import { photoSrc, photoSrcSet } from '../../data/images'

interface ImgProps {
  photo: Photo
  /** giá trị `sizes` cho srcset */
  sizes: string
  className?: string
  priority?: boolean
}

/** Ảnh WebP đáp ứng, lấp đầy khung cha (cha quyết định kích thước/tỉ lệ). */
export function Img({ photo, sizes, className = '', priority = false }: ImgProps) {
  return (
    <img
      src={photoSrc(photo.id)}
      srcSet={photoSrcSet(photo.id)}
      sizes={sizes}
      alt={photo.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      draggable={false}
      className={`h-full w-full object-cover ${className}`}
      style={photo.focus ? { objectPosition: photo.focus } : undefined}
    />
  )
}

export const ratioClass: Record<NonNullable<Photo['ratio']>, string> = {
  '2/3': 'aspect-[2/3]',
  '4/5': 'aspect-[4/5]',
  '3/2': 'aspect-[3/2]',
  '1/1': 'aspect-square',
}
