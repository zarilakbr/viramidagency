/**
 * @file src/features/booking/components/Calendar.tsx
 * Komponen kalender bulanan interaktif dan aksesibel (WCAG AA & Keyboard Navigation).
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Font Judul: Gastilo. Tanpa titik-titik berwarna atau efek menyala.
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
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
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

  const firstAvailableDay = allCalendarDays.find(
    (day) => isSameMonth(day, currentMonth) && isDateAvailable(day, BOOKING_CONFIG, minDate)
  );

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
    <div className="w-full bg-[#074563] p-4 sm:p-5 rounded-2xl border border-[#165A7E] shadow-sm">
      {/* Header Navigasi Bulan */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#165A7E]">
        <div className="flex flex-col">
          <span className="font-heading font-bold text-base text-[#B0EDF9]">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <span className="text-[11px] font-mono text-[#78B9CA]">
            Pilih hari kerja aktif
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={isPrevDisabled}
            onClick={handlePrevMonth}
            aria-label="Bulan Sebelumnya"
            className="p-2 rounded-lg border border-[#165A7E] bg-[#04344C] hover:bg-[#0B567C] hover:border-[#B0EDF9] text-[#B0EDF9] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[#165A7E] disabled:hover:bg-[#04344C] cursor-pointer"
          >
            <Icon name="chevron-left" size={16} />
          </button>
          <button
            type="button"
            disabled={isNextDisabled}
            onClick={handleNextMonth}
            aria-label="Bulan Berikutnya"
            className="p-2 rounded-lg border border-[#165A7E] bg-[#04344C] hover:bg-[#0B567C] hover:border-[#B0EDF9] text-[#B0EDF9] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[#165A7E] disabled:hover:bg-[#04344C] cursor-pointer"
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
              idx === 0 || idx === 6 ? 'text-[#78B9CA]/50' : 'text-[#B0EDF9]'
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
                  ? 'opacity-25 text-[#78B9CA]/40 cursor-not-allowed bg-transparent'
                  : isSelected
                  ? 'bg-[#B0EDF9] text-[#04344C] font-bold shadow-md ring-2 ring-[#B0EDF9] scale-[1.03] z-10'
                  : 'bg-[#04344C] text-[#B0EDF9] hover:bg-[#0B567C] hover:text-[#B0EDF9] hover:border-[#B0EDF9] cursor-pointer border border-[#165A7E]'
              }`}
            >
              <span>{format(day, 'd')}</span>

              {/* Penanda Garis Hari Ini (Bukan Titik Berwarna) */}
              {isTodayDate && (
                <span
                  className={`absolute bottom-1 w-3 h-[2px] rounded-full ${
                    isSelected ? 'bg-[#04344C]' : 'bg-[#B0EDF9]'
                  }`}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Legenda Keterangan Tanpa Titik Berwarna */}
      <div className="mt-4 pt-3 border-t border-[#165A7E] flex items-center justify-between text-[11px] font-mono text-[#78B9CA]">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-[2px] rounded-full bg-[#B0EDF9]" />
          <span>Hari Ini</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#B0EDF9]" />
          <span>Terpilih</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#04344C] border border-[#165A7E] opacity-50" />
          <span>Libur / Tutup</span>
        </span>
      </div>
    </div>
  );
};
