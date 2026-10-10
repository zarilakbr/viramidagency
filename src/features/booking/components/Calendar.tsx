/**
 * @file src/features/booking/components/Calendar.tsx
 * Komponen kalender bulanan interaktif dan aksesibel (WCAG AA & Keyboard Navigation).
 */

import React, { useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  addDays,
  parseISO,
} from 'date-fns';
import { BOOKING_CONFIG } from '../../../data/booking.config';
import { isDateAvailable, formatDateString } from '../lib/slots';
import { Icon } from '../../../components/ui/Icon';

interface CalendarProps {
  selectedDate: string; // "YYYY-MM-DD"
  onSelectDate: (dateStr: string) => void;
  minDate?: Date;
}

const HARI_SINGKAT = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onSelectDate,
  minDate = new Date(),
}) => {
  const initialDate = selectedDate ? parseISO(selectedDate) : minDate;
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(initialDate));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 }); // Dimulai dari Minggu
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const allCalendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  const selectedDateObj = selectedDate ? parseISO(selectedDate) : null;

  // Tanggal pertama yang tersedia di bulan aktif untuk fokus awal keyboard jika belum ada tanggal terpilih
  const firstAvailableDay = allCalendarDays.find(
    (day) => isSameMonth(day, currentMonth) && isDateAvailable(day, BOOKING_CONFIG, minDate)
  );

  // Keyboard navigation handler untuk aksesibilitas penuh
  const handleKeyDown = (e: React.KeyboardEvent, day: Date, isAvailable: boolean) => {
    if (!isAvailable) return;

    let targetDate: Date | null = null;
    switch (e.key) {
      case 'ArrowLeft':
        targetDate = addDays(day, -1);
        break;
      case 'ArrowRight':
        targetDate = addDays(day, 1);
        break;
      case 'ArrowUp':
        targetDate = addDays(day, -7);
        break;
      case 'ArrowDown':
        targetDate = addDays(day, 7);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        onSelectDate(formatDateString(day));
        return;
      default:
        return;
    }

    if (targetDate) {
      e.preventDefault();
      if (!isSameMonth(targetDate, currentMonth)) {
        setCurrentMonth(startOfMonth(targetDate));
      }
      if (isDateAvailable(targetDate, BOOKING_CONFIG, minDate)) {
        onSelectDate(formatDateString(targetDate));
      }
    }
  };

  return (
    <div className="w-full bg-surface p-4 sm:p-5 rounded-xl border border-border">
      {/* Header Navigasi Bulan */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
        <div className="flex flex-col">
          <span className="font-heading font-bold text-base text-foreground">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <span className="text-[11px] font-mono text-muted">
            Pilih hari kerja aktif
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            aria-label="Bulan Sebelumnya"
            className="p-1.5 rounded-lg border border-border bg-surface hover:bg-surface-hover hover:border-orange text-foreground transition-colors"
          >
            <Icon name="chevron-left" size={16} />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="Bulan Berikutnya"
            className="p-1.5 rounded-lg border border-border bg-surface hover:bg-surface-hover hover:border-orange text-foreground transition-colors"
          >
            <Icon name="chevron-right" size={16} />
          </button>
        </div>
      </div>

      {/* Baris Nama Hari */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2" role="row">
        {HARI_SINGKAT.map((namaHari, idx) => (
          <div
            key={namaHari}
            className={`text-[11px] font-mono font-semibold py-1 ${
              idx === 0 || idx === 6 ? 'text-muted/50' : 'text-muted'
            }`}
            aria-label={namaHari}
          >
            {namaHari}
          </div>
        ))}
      </div>

      {/* Grid Tanggal Kalender */}
      <div className="grid grid-cols-7 gap-1" role="grid" aria-label="Kalender Booking">
        {allCalendarDays.map((day) => {
          const dateStr = formatDateString(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSelected = selectedDateObj ? isSameDay(day, selectedDateObj) : false;
          const isTodayDate = isToday(day);
          const isAvailable = isCurrentMonth && isDateAvailable(day, BOOKING_CONFIG, minDate);

          const isFocusable =
            isSelected || (!selectedDateObj && firstAvailableDay && isSameDay(day, firstAvailableDay));

          return (
            <button
              key={dateStr}
              type="button"
              disabled={!isAvailable}
              tabIndex={isFocusable ? 0 : -1}
              onClick={() => isAvailable && onSelectDate(dateStr)}
              onKeyDown={(e) => handleKeyDown(e, day, isAvailable)}
              aria-label={`${format(day, 'EEEE, d MMMM yyyy')}${
                !isAvailable ? ' (Tidak Tersedia)' : ''
              }${isSelected ? ' (Terpilih)' : ''}`}
              aria-selected={isSelected}
              className={`relative h-10 w-full rounded-lg text-xs font-mono font-medium transition-all duration-150 flex flex-col items-center justify-center ${
                !isCurrentMonth
                  ? 'opacity-20 cursor-not-allowed pointer-events-none'
                  : !isAvailable
                  ? 'opacity-30 text-muted cursor-not-allowed hover:bg-transparent'
                  : isSelected
                  ? 'bg-orange text-navy font-bold shadow-sm ring-1 ring-orange scale-[1.02]'
                  : 'text-foreground hover:bg-orange/15 hover:text-orange cursor-pointer border border-transparent hover:border-orange/30'
              }`}
            >
              <span>{format(day, 'd')}</span>

              {/* Titik Penanda Hari Ini */}
              {isTodayDate && (
                <span
                  className={`absolute bottom-1 w-1 h-1 rounded-full ${
                    isSelected ? 'bg-navy' : 'bg-orange'
                  }`}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Legenda Keterangan */}
      <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-muted">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-orange" />
          <span>Hari Ini</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded bg-orange" />
          <span>Terpilih</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded bg-surface border border-border opacity-40" />
          <span>Libur / Tutup</span>
        </span>
      </div>
    </div>
  );
};
