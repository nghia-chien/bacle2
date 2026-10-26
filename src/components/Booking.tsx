import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { bookingIntro } from '../data/content'
import { concepts } from '../data/concepts'
import { site } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { Button, LinkButton } from './ui/Button'
import { SectionTitle } from './ui/SectionTitle'
import { IconMessenger, IconPhone } from './ui/Icons'

interface BookingProps {
  concept: string
  onConceptChange: (slug: string) => void
}

interface FormState {
  name: string
  phone: string
  date: string
  message: string
}

type Errors = Partial<Record<'name' | 'phone', string>>

const PHONE_RE = /^(0|\+?84)\d{9,10}$/

function validate(f: FormState): Errors {
  const errors: Errors = {}
  if (f.name.trim().length < 2) errors.name = 'Vui lòng nhập tên của hai bạn.'
  const digits = f.phone.replace(/[\s.-]/g, '')
  if (!digits) errors.phone = 'Vui lòng nhập số điện thoại để BACLE liên hệ lại.'
  else if (!PHONE_RE.test(digits)) errors.phone = 'Số điện thoại chưa đúng, ví dụ: 0935 221 463.'
  return errors
}

function formatDate(iso: string) {
  if (!iso) return 'Chưa chốt'
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

const today = () => new Date().toISOString().slice(0, 10)

export function Booking({ concept, onConceptChange }: BookingProps) {
  const scope = useRef<HTMLElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)
  const uid = useId()
  const [form, setForm] = useState<FormState>({ name: '', phone: '', date: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [result, setResult] = useState<{ text: string; copied: boolean } | null>(null)
  useReveal(scope)

  useEffect(() => {
    if (result) resultRef.current?.focus()
  }, [result])

  const conceptName = concepts.find((c) => c.slug === concept)?.name ?? 'Cần tư vấn thêm'

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = found.name ? 'name' : 'phone'
      document.getElementById(`${uid}-${first}`)?.focus()
      return
    }
    const text = [
      'Chào BACLE, mình muốn đặt lịch chụp ảnh cưới.',
      `- Tên: ${form.name.trim()}`,
      `- SĐT: ${form.phone.trim()}`,
      `- Ngày dự kiến: ${formatDate(form.date)}`,
      `- Concept: ${conceptName}`,
      form.message.trim() ? `- Lời nhắn: ${form.message.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n')
    let copied = false
    try {
      await navigator.clipboard.writeText(text)
      copied = true
    } catch {
      copied = false
    }
    setResult({ text, copied })
  }

  const field = (key: keyof FormState) => ({
    id: `${uid}-${key}`,
    value: form[key],
    onChange: (e: { target: { value: string } }) => setForm((f) => ({ ...f, [key]: e.target.value })),
  })

  const input =
    'mt-2 block w-full border-0 border-b border-line bg-transparent px-0 py-3 text-base text-ink placeholder:text-ink-soft/60 transition-colors focus:border-ink focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-error'
  const label = 'caps text-ink-soft'

  return (
    <section id="dat-lich" ref={scope} aria-labelledby="booking-title" className="bg-ivory px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-[80rem] gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <SectionTitle id="booking-title" script={bookingIntro.script} title={bookingIntro.title} align="left" />
          <p data-reveal="up" className="mt-5 max-w-md text-base text-ink-soft">
            {bookingIntro.body}
          </p>

          {result ? (
            <div ref={resultRef} tabIndex={-1} role="status" className="mt-12 border border-line bg-cream p-6 focus:outline-none md:p-10">
              <h3 className="text-3xl md:text-4xl">Tin nhắn đã sẵn sàng</h3>
              <p className="mt-3 text-sm text-ink-soft">
                {result.copied
                  ? 'Nội dung đã được sao chép. Mở Zalo hoặc Messenger rồi dán vào khung chat để gửi cho BACLE.'
                  : 'Hãy sao chép nội dung bên dưới, sau đó mở Zalo hoặc Messenger để gửi cho BACLE.'}
              </p>
              <pre className="mt-6 border-l border-ink/30 pl-4 font-sans text-sm leading-relaxed whitespace-pre-wrap text-ink">
                {result.text}
              </pre>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <LinkButton href={site.zaloHref}>Gửi qua Zalo</LinkButton>
                <LinkButton href={`${site.messengerHref}?text=${encodeURIComponent(result.text)}`} variant="outline">
                  <IconMessenger width={18} height={18} /> Gửi qua Messenger
                </LinkButton>
                <button
                  type="button"
                  className="caps min-h-12 cursor-pointer px-2 text-ink-soft underline-offset-4 hover:text-ink hover:underline"
                  onClick={() => setResult(null)}
                >
                  Sửa thông tin
                </button>
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2" data-reveal="up">
              <div>
                <label htmlFor={`${uid}-name`} className={label}>
                  Tên hai bạn *
                </label>
                <input
                  {...field('name')}
                  type="text"
                  autoComplete="name"
                  placeholder="Ví dụ: Minh & Thư"
                  className={input}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? `${uid}-name-err` : undefined}
                />
                {errors.name ? (
                  <p id={`${uid}-name-err`} className="mt-2 text-sm text-error">
                    {errors.name}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor={`${uid}-phone`} className={label}>
                  Số điện thoại / Zalo *
                </label>
                <input
                  {...field('phone')}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="09xx xxx xxx"
                  className={input}
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
                />
                {errors.phone ? (
                  <p id={`${uid}-phone-err`} className="mt-2 text-sm text-error">
                    {errors.phone}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor={`${uid}-date`} className={label}>
                  Ngày dự kiến chụp
                </label>
                <input {...field('date')} type="date" min={today()} className={input} />
              </div>
              <div>
                <label htmlFor={`${uid}-concept`} className={label}>
                  Concept
                </label>
                <select
                  id={`${uid}-concept`}
                  value={concept}
                  onChange={(e) => onConceptChange(e.target.value)}
                  className={`${input} cursor-pointer`}
                >
                  <option value="">Cần tư vấn thêm</option>
                  {concepts.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`${uid}-message`} className={label}>
                  Lời nhắn
                </label>
                <textarea
                  {...field('message')}
                  rows={3}
                  placeholder="Số trang phục mong muốn, địa điểm, ngày cưới…"
                  className={`${input} resize-none`}
                />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" className="w-full sm:w-auto">
                  Soạn tin đặt lịch
                </Button>
              </div>
            </form>
          )}
        </div>

        <aside aria-label="Thông tin liên hệ" className="lg:col-span-4 lg:col-start-9 lg:pt-6">
          <dl data-reveal="up" className="divide-y divide-line border-y border-line">
            <div className="py-5">
              <dt className="caps text-ink-soft">Điện thoại / Zalo</dt>
              <dd className="mt-2">
                <a href={site.phoneHref} className="inline-flex items-center gap-3 text-2xl font-normal tracking-[0.04em] tabular-nums hover:underline md:text-[1.75rem]">
                  <IconPhone /> {site.phoneDisplay}
                </a>
              </dd>
            </div>
            <div className="py-5">
              <dt className="caps text-ink-soft">Facebook</dt>
              <dd className="mt-2">
                <a href={site.facebookHref} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  facebook.com/BACLEphotography
                </a>
              </dd>
            </div>
            <div className="py-5">
              <dt className="caps text-ink-soft">Studio</dt>
              <dd className="mt-2">
                {site.city} ·{' '}
                <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink-soft">
                  Chỉ đường trên Google Maps
                </a>
              </dd>
            </div>
          </dl>
          <div data-reveal="up" className="frame mt-8 aspect-[4/3] overflow-hidden bg-sand">
            <iframe
              title="Bản đồ BACLE Photography"
              src={site.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0 grayscale-[35%] sepia-[15%]"
            />
          </div>
        </aside>
      </div>
    </section>
  )
}
