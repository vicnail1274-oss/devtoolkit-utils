export interface CronParts {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

/**
 * Parse a standard 5-field cron expression into its components.
 * @throws Error if the expression doesn't have exactly 5 fields
 */
export function parseCron(expression: string): CronParts {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) {
    throw new Error(`Expected 5 fields in cron expression, got ${parts.length}`);
  }
  return {
    minute: parts[0],
    hour: parts[1],
    dayOfMonth: parts[2],
    month: parts[3],
    dayOfWeek: parts[4],
  };
}

/**
 * Generate a human-readable description of a cron expression.
 */
export function describeCron(expression: string): string {
  const { minute, hour, dayOfMonth, month, dayOfWeek } = parseCron(expression);
  const parts: string[] = [];

  // Minute
  if (minute === '*') parts.push('Every minute');
  else if (minute.startsWith('*/')) parts.push(`Every ${minute.slice(2)} minutes`);
  else parts.push(`At minute ${minute}`);

  // Hour
  if (hour !== '*') {
    if (hour.startsWith('*/')) parts.push(`every ${hour.slice(2)} hours`);
    else if (hour.includes('-')) parts.push(`during hours ${hour}`);
    else if (hour.includes(',')) parts.push(`at hours ${hour}`);
    else parts.push(`at ${hour}:00`);
  }

  // Day of month
  if (dayOfMonth !== '*') {
    parts.push(`on day ${dayOfMonth} of the month`);
  }

  // Month
  if (month !== '*') {
    const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    if (month.includes(',')) {
      const months = month.split(',').map(m => monthNames[parseInt(m)] || m);
      parts.push(`in ${months.join(', ')}`);
    } else {
      parts.push(`in ${monthNames[parseInt(month)] || month}`);
    }
  }

  // Day of week
  if (dayOfWeek !== '*') {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    if (dayOfWeek.includes('-')) {
      const [start, end] = dayOfWeek.split('-').map(Number);
      parts.push(`on ${dayNames[start]} through ${dayNames[end]}`);
    } else if (dayOfWeek.includes(',')) {
      const days = dayOfWeek.split(',').map(d => dayNames[parseInt(d)] || d);
      parts.push(`on ${days.join(', ')}`);
    } else {
      parts.push(`on ${dayNames[parseInt(dayOfWeek)] || dayOfWeek}`);
    }
  }

  return parts.join(', ');
}

/**
 * Calculate the next N run times for a cron expression.
 * Simplified implementation supporting basic patterns.
 * @param expression - 5-field cron expression
 * @param count - Number of future runs to calculate (default: 5)
 * @param from - Start date (default: now)
 */
export function nextCronRun(expression: string, count: number = 5, from: Date = new Date()): Date[] {
  const { minute, hour, dayOfMonth, month, dayOfWeek } = parseCron(expression);
  const results: Date[] = [];
  const current = new Date(from);
  current.setSeconds(0, 0);
  current.setMinutes(current.getMinutes() + 1);

  const maxIterations = 525960; // ~1 year of minutes
  let iterations = 0;

  while (results.length < count && iterations < maxIterations) {
    iterations++;
    if (matchesField(current.getMonth() + 1, month) &&
        matchesField(current.getDate(), dayOfMonth) &&
        matchesField(current.getDay(), dayOfWeek) &&
        matchesField(current.getHours(), hour) &&
        matchesField(current.getMinutes(), minute)) {
      results.push(new Date(current));
    }
    current.setMinutes(current.getMinutes() + 1);
  }

  return results;
}

function matchesField(value: number, field: string): boolean {
  if (field === '*') return true;

  for (const part of field.split(',')) {
    if (part.includes('/')) {
      const [range, stepStr] = part.split('/');
      const step = parseInt(stepStr);
      if (range === '*') {
        if (value % step === 0) return true;
      } else {
        const start = parseInt(range);
        if (value >= start && (value - start) % step === 0) return true;
      }
    } else if (part.includes('-')) {
      const [start, end] = part.split('-').map(Number);
      if (value >= start && value <= end) return true;
    } else {
      if (value === parseInt(part)) return true;
    }
  }

  return false;
}
