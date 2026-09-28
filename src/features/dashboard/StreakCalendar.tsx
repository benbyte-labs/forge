import { useStore } from '../../app/store';
import { addDays, today } from '../../engine/dates';
import { useT } from '../../i18n';

const DAYS = 35;

/** A five-week heat strip of the days that were completed. */
export function StreakCalendar() {
  const t = useT();
  const days = useStore((s) => s.state.days);

  const completed = new Set(
    Object.values(days)
      .map((d) => d.completedOn)
      .filter((d): d is string => !!d),
  );

  const cells = Array.from({ length: DAYS }, (_, i) => addDays(today(), i - (DAYS - 1)));

  return (
    <div className="calendar" role="img" aria-label={t('dash.calendar')}>
      {cells.map((date) => (
        <span key={date} className="calendar__cell" data-on={completed.has(date)} title={date} />
      ))}
    </div>
  );
}
