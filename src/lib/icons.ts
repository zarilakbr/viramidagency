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
  Calendar,
  Clock,
  Video,
  Users,
  User,
  Phone,
  FileText,
  Link2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  CalendarPlus,
  Download,
  Trash2,
  HelpCircle,
  ShieldCheck,
  Briefcase,
  Copy,
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
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-down': ChevronDown,

  // Kontrol UI
  menu: Menu,
  close: X,
  check: Check,
  'check-circle': CheckCircle2,
  'alert-circle': AlertCircle,
  trash: Trash2,
  copy: Copy,

  // Kontak & Media Sosial
  mail: Mail,
  'message-square': MessageSquare,
  'map-pin': MapPin,
  instagram: Instagram,
  globe: Globe,
  phone: Phone,
  user: User,

  // Booking & Jadwal
  calendar: Calendar,
  'calendar-plus': CalendarPlus,
  clock: Clock,
  video: Video,
  users: Users,
  'file-text': FileText,
  link: Link2,
  download: Download,

  // Kategori & Fitur
  layers: Layers,
  palette: Palette,
  zap: Zap,
  sparkles: Sparkles,
  'help-circle': HelpCircle,
  'shield-check': ShieldCheck,
  briefcase: Briefcase,
} as const;

export type IconName = keyof typeof ICON_MAP;
export type { LucideIcon };
