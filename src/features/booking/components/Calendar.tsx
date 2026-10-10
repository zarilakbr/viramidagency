/**
 * @file src/features/booking/components/Calendar.tsx
 * Komponen kalender bulanan interaktif dan aksesibel (WCAG AA & Keyboard Navigation).
 * Desain modern berkontras tinggi dengan elevasi visual yang tegas.
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
  isBefore,
  isAfter,
} from 'date-fns';
import { BOOKING_CONFIG } from '../../../data/booking.config';
import { isDateAvailable, formatDateString, parseDateInput } from '../lib/slots';
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
  const initialDate = selectedDate ? parseDateInput(selectedDate) : minDate;
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(initialDate));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 }); // Dimulai dari Minggu
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const allCalendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const maxForwardDate = addDays(minDate, BOOKING_CONFIG.maksimalHariKedepan);
  const isPrevDisabled = isSameMonth(currentMonth, minDate) || isBefore(currentMonth, minDate);
  const isNextDisabled = isSameMonth(currentMonth, maxForwardDate) || isAfter(currentMonth, maxForwardDate);

  const handlePrevMonth = () => {
    if (!isPrevDisabled) {
      setCurrentMonth((prev) => subMonths(prev, 1));
    }
  };

  const handleNextMonth = () => {
    if (!isNextDisabled) {
      setCurrentMonth((prev) => addMonths(prev, 1));
    }
  };

  const selectedDateObj = selectedDate ? parseDateInput(selectedDate) : null;

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
    <div className="w-full bg-[#121240] p-4 sm:p-5 rounded-2xl border border-[#2A2A6E] shadow-sm">
      {/* Header Navigasi Bulan */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#2A2A6E]">
        <div className="flex flex-col">
          <span className="font-heading font-bold text-base text-cream">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <span className="text-[11px] font-mono text-muted">
            Pilih hari kerja aktif
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={isPrevDisabled}
            onClick={handlePrevMonth}
            aria-label="Bulan Sebelumnya"
            className="p-2 rounded-lg border border-[#2A2A6E] bg-[#181850] hover:bg-orange/20 hover:border-orange text-cream transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[#2A2A6E] disabled:hover:bg-[#181850] cursor-pointer"
          >
            <Icon name="chevron-left" size={16} />
          </button>
          <button
            type="button"
            disabled={isNextDisabled}
            onClick={handleNextMonth}
            aria-label="Bulan Berikutnya"
            className="p-2 rounded-lg border border-[#2A2A6E] bg-[#181850] hover:bg-orange/20 hover:border-orange text-cream transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[#2A2A6E] disabled:hover:bg-[#181850] cursor-pointer"
          >
            <Icon name="chevron-right" size={16} />
          </button>
        </div>
      </div>

      {/* Baris Nama Hari */}
      <div className="grid grid-cols-7 gap-1.5 text-center mb-2" role="row">
        {HARI_SINGKAT.map((namaHari, idx) => (
          <div
            key={namaHari}
            className={`text-[11px] font-mono font-semibold py-1 ${
              idx === 0 || idx === 6 ? 'text-muted/40' : 'text-orange'
            }`}
            aria-label={namaHari}
          >
            {namaHari}
          </div>
        ))}
      </div>

      {/* Grid Tanggal Kalender */}
      <div className="grid grid-cols-7 gap-1.5" role="grid" aria-label="Kalender Booking">
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
              className={`relative h-10 sm:h-11 w-full rounded-xl text-xs font-mono font-medium transition-all duration-150 flex flex-col items-center justify-center ${
                !isCurrentMonth
                  ? 'opacity-15 cursor-not-allowed pointer-events-none'
                  : !isAvailable
                  ? 'opacity-25 text-muted/50 cursor-not-allowed bg-transparent'
                  : isSelected
                  ? 'bg-orange text-navy-900 font-bold shadow-md shadow-orange/30 ring-2 ring-orange scale-[1.03] z-10'
                  : 'bg-[#181850] text-cream hover:bg-orange/20 hover:text-orange hover:border-orange cursor-pointer border border-[#2A2A6E]'
              }`}
            >
              <span>{format(day, 'd')}</span>

              {/* Titik Penanda Hari Ini */}
              {isTodayDate && (
                <span
                  className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${
                    isSelected ? 'bg-navy-900' : 'bg-orange animate-pulse'
                  }`}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Legenda Keterangan */}
      <div className="mt-4 pt-3 border-t border-[#2A2A6E]/80 flex items-center justify-between text-[11px] font-mono text-muted">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-orange" />
          <span>Hari Ini</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-orange" />
          <span>Terpilih</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-[#181850] border border-[#2A2A6E] opacity-40" />
          <span>Libur / Tutup</span>
        </span>
      </div>
    </div>
  );
};
