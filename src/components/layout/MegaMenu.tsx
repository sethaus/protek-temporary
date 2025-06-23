'use client'

import { motion } from 'framer-motion'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

interface MegaMenuSection {
  title: string
  icon: React.ComponentType<any>
  links: Array<{
    name: string
    href: string
    description?: string
    icon?: React.ComponentType<any>
  }>
}

interface MegaMenuProps {
  sections: MegaMenuSection[]
  onClose: () => void
  anchor: { left: number; width: number }
}

export default function MegaMenu({ sections, onClose, anchor }: MegaMenuProps) {
  // Tüm linkleri tek bir diziye düzleştir
  const allLinks = sections.flatMap(section =>
    section.links.map(link => ({
      ...link,
      sectionTitle: section.title,
      sectionIcon: section.icon
    }))
  )

  // Pozisyonu hesapla (anchor'ın ortasına hizala, ekran dışına taşmasın)
  const menuWidth = 480 // px, max-w-xl
  const padding = 16 // px, sağ/sol boşluk
  let left = anchor.left - menuWidth / 2
  const minLeft = padding
  const maxLeft = typeof window !== 'undefined' ? window.innerWidth - menuWidth - padding : 0
  if (left < minLeft) left = minLeft
  if (left > maxLeft) left = maxLeft

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="fixed top-[76px] z-40 w-full max-w-xl px-2 md:px-0"
      style={{ pointerEvents: 'auto', left, width: menuWidth, minWidth: 320 }}
    >
      <div className="relative rounded-xl bg-white/95 shadow-md border border-neutral-100 backdrop-blur-md mx-auto">
        <div className="relative z-10 py-4 px-2 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
            {allLinks.map((link, idx) => {
              const Icon = link.icon || link.sectionIcon
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-start gap-3 p-3 rounded-lg bg-white/80 hover:bg-primary-50/60 border border-transparent hover:border-primary-200 shadow-sm hover:shadow-md transition-all duration-150 min-h-[56px]"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary-100 to-secondary-100 group-hover:from-primary-200 group-hover:to-secondary-200">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-neutral-900 group-hover:text-primary-700 text-sm">
                      {link.name}
                    </div>
                    {link.description && (
                      <div className="text-xs text-neutral-500 mt-0.5 group-hover:text-neutral-700 line-clamp-2">
                        {link.description}
                      </div>
                    )}
                  </div>
                  <ArrowRightIcon className="w-4 h-4 text-neutral-300 opacity-0 group-hover:opacity-100 mt-1 transition-opacity" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
} 