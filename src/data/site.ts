export const site = {
  name: 'BACLE Photography',
  category: 'Chụp ảnh cưới',
  city: 'TP. Hồ Chí Minh',
  tagline: 'all you need is love',
  phoneDisplay: '093 522 14 63',
  phoneHref: 'tel:0935221463',
  zaloHref: 'https://zalo.me/0935221463',
  facebookHref: 'https://www.facebook.com/BACLEphotography',
  messengerHref: 'https://m.me/BACLEphotography',
  mapsHref:
    'https://www.google.com/maps/place/BACLE+Photography/@10.7901029,106.6723896,17z/data=!3m1!4b1!4m6!3m5!1s0x31752f001df21d13:0x1717c36cd08b4794!8m2!3d10.7901029!4d106.6749645!16s%2Fg%2F11nbwd8hy3',
  mapsEmbed: 'https://maps.google.com/maps?q=10.7901029,106.6749645&z=16&output=embed',
} as const

export interface NavItem {
  label: string
  href: string
}

export const navLeft: NavItem[] = [
  { label: 'Giới thiệu', href: '#gioi-thieu' },
  { label: 'Concept', href: '#concept' },
  { label: 'Bộ sưu tập', href: '#bo-suu-tap' },
]

export const navRight: NavItem[] = [
  { label: 'Đánh giá', href: '#danh-gia' },
  { label: 'Bảng giá', href: '#bang-gia' },
]
