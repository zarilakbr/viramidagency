import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  ArrowDownRight,
  Check,
  Menu,
  X,
  Mail,
  MessageSquare,
  MapPin,
  Instagram,
  Layers,
  Palette,
  Zap,
  Globe,
  ExternalLink,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

/**
 * Peta terpusat untuk seluruh ikon di website ViramidAgency.
 * Semua ikon menggunakan Lucide dengan makna semantik yang konsisten.
 */
export const ICON_MAP = {
  // Navigasi & Arah
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'arrow-up-right': ArrowUpRight,
  'arrow-down-right': ArrowDownRight,
  'external-link': ExternalLink,

  // Kontrol UI
  menu: Menu,
  close: X,
  check: Check,

  // Kontak & Media Sosial
  mail: Mail,
  'message-square': MessageSquare,
  'map-pin': MapPin,
  instagram: Instagram,
  globe: Globe,

  // Kategori & Fitur
  layers: Layers,
  palette: Palette,
  zap: Zap,
  sparkles: Sparkles,
} as const;

export type IconName = keyof typeof ICON_MAP;
export type { LucideIcon };
