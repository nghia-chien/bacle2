import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'

/**
 * Hiệu ứng xuất hiện dùng chung, giới hạn trong phạm vi một section.
 * - [data-lines] > [data-line]: tiêu đề trồi lên theo dòng (mask)
 * - [data-reveal="up"]: nhóm nội dung trồi nhẹ, stagger theo batch
 * - [data-reveal="clip"]: khung ảnh mở từ dưới lên, ảnh bên trong thu nhẹ về 1
 * - [data-parallax="n"]: trôi chậm khi cuộn (chỉ desktop)
 * Nội dung luôn hiển thị mặc định; chỉ ẩn khi JS chạy và người dùng không giảm chuyển động.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>('[data-lines]').forEach((group) => {
          gsap.from(group.querySelectorAll('[data-line]'), {
            yPercent: 110,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.09,
            scrollTrigger: { trigger: group, start: 'top 88%', once: true },
          })
        })

        ScrollTrigger.batch('[data-reveal="up"]', {
          start: 'top 90%',
          once: true,
          onEnter: (els) =>
            gsap.fromTo(
              els,
              { autoAlpha: 0, y: 28 },
              { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, overwrite: true },
            ),
        })
        gsap.set('[data-reveal="up"]', { autoAlpha: 0 })

        gsap.utils.toArray<HTMLElement>('[data-reveal="clip"]').forEach((frame) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start: 'top 88%', once: true } })
          tl.from(frame, { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.3, ease: 'expo.out' })
          const img = frame.querySelector('img')
          if (img) tl.from(img, { scale: 1.14, duration: 1.6, ease: 'expo.out' }, 0)
        })
      })

      mm.add(`${MOTION_OK} and (min-width: 768px)`, () => {
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          const speed = Number(el.dataset.parallax ?? '10')
          gsap.to(el, {
            yPercent: -speed,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          })
        })
      })
    },
    { scope },
  )
}
