// Compact, bounded diagnostic extraction. The full log is always recoverable.
const errorPattern = /error|fail|exception|fatal|panic|traceback|not found|cannot|unable to|assertion|ENOENT|EACCES/i;
export function collector() {
  let pending = '';
  let count = 0;
  const errors = [], tail = [];
  const line = s => {
    count++;
    const cleaned = s.replace(/\x1b\[[0-9;]*m/g, '').slice(0, 1400);
    if (errorPattern.test(cleaned) && errors.length < 30) errors.push(`L${count}: ${cleaned}`);
    tail.push(cleaned);
    if (tail.length > 12) tail.shift();
  };
  return {
    push(data) {
      pending += data.toString();
      let idx;
      while ((idx = pending.indexOf('\n')) !== -1) {
        line(pending.slice(0, idx).replace(/\r$/, ''));
        pending = pending.slice(idx + 1);
      }
      if (pending.length > 65536) { line(pending.slice(0, 65536)); pending = pending.slice(65536); }
    },
    result() {
      if (pending) line(pending);
      return { count, errors, tail };
    }
  };
}
export function summary({code,signal,ms,bytes,log,stats}) {
  const ok = code === 0 && signal == null;
  const selected = ok ? stats.tail.slice(-3) : (stats.errors.length ? stats.errors : stats.tail);
  return [
    `Status: ${ok ? 'PASS' : 'FAIL'}`,
    `Exit: ${signal ? `signal ${signal}` : code}`,
    `Duration: ${ms} ms`,
    `Output bytes: ${bytes}`,
    `Output lines: ${stats.count}`,
    `Full log: ${log}`,
    ...(selected.length ? ['Relevant output:', ...selected.map(x => '  ' + x)] : []),
    'Note: diagnostic selection is heuristic. Read the full log when uncertain.'
  ].join('\n') + '\n';
}
