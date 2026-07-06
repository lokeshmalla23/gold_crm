/**
 * Reusable Tailwind class constants for dynamic / conditional JSX usage.
 *
 * Use these when you need to compose classes programmatically — e.g. active/
 * inactive toggle states — where CSS @layer components can't help.
 *
 * Usage:
 *   import { cls } from '../styles/classes';
 *   <button className={cls.btnPrimary}>Save</button>
 *   <div className={`${cls.card} ${cls.cardPadded}`}>...</div>
 */

// ─── Cards ────────────────────────────────────────────────────────────────────
export const card         = 'bg-white rounded-xl border border-gray-200';
export const cardSm       = 'bg-white rounded-xl border border-gray-200 p-4';
export const cardMd       = 'bg-white rounded-xl border border-gray-200 p-5';
export const cardLg       = 'bg-white rounded-xl border border-gray-200 p-6';
export const cardActive   = 'border-amber-300 shadow-sm shadow-amber-100';
export const cardHeader   = 'flex items-center justify-between p-4 border-b border-gray-100';

// ─── Inputs ───────────────────────────────────────────────────────────────────
export const input        = 'w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none text-sm transition-colors';
export const inputIcon    = 'w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none text-sm transition-colors';
export const inputSm      = 'px-2.5 py-1.5 rounded-lg border border-gray-200 focus:border-amber-400 focus:ring-1 focus:ring-amber-200 outline-none text-sm transition-colors';
export const inputRight   = 'px-2 py-1 border border-gray-200 rounded-lg text-sm text-right font-medium focus:border-amber-400 focus:ring-1 focus:ring-amber-200 outline-none';

// ─── Buttons ──────────────────────────────────────────────────────────────────
export const btnPrimary     = 'px-4 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-semibold rounded-xl shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed';
export const btnPrimaryFull = 'w-full py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold rounded-xl shadow-md shadow-amber-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all text-sm tracking-wide';
export const btnSecondary   = 'px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all';
export const btnDanger      = 'px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-bold shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all';
export const btnGhost       = 'p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors';
export const btnIcon        = 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-amber-50 hover:border-amber-300 text-sm text-gray-600 transition-colors';
export const btnDangerGhost = 'p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 border border-gray-200 hover:border-red-200 transition-colors';

// ─── Payment / Tab toggle buttons ─────────────────────────────────────────────
export const paymentBtn = {
  active:   'p-2.5 rounded-xl border-2 border-amber-500 bg-amber-50 text-amber-700 text-sm font-semibold flex items-center gap-2 justify-center shadow-sm shadow-amber-100 transition-all',
  inactive: 'p-2.5 rounded-xl border-2 border-gray-200 text-gray-600 text-sm font-semibold flex items-center gap-2 justify-center hover:border-gray-300 hover:bg-gray-50 transition-all',
};

export const tabBtn = {
  active:   'px-4 py-2 text-sm font-semibold text-amber-700 border-b-2 border-amber-500 bg-amber-50 rounded-t-lg transition-all',
  inactive: 'px-4 py-2 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 transition-all',
};

export const emiMonthBtn = {
  active:   'py-2 rounded-lg text-xs font-bold border-2 border-amber-500 bg-amber-50 text-amber-700 transition-all',
  inactive: 'py-2 rounded-lg text-xs font-bold border-2 border-gray-200 text-gray-600 hover:border-gray-300 transition-all',
};

// ─── Labels / Text ────────────────────────────────────────────────────────────
export const sectionLabel = 'text-xs font-bold text-gray-600 uppercase tracking-wide';
export const pageTitle    = 'text-xl font-bold text-gray-900';
export const fieldLabel   = 'text-xs font-semibold text-gray-700 block mb-1';
export const mutedText    = 'text-xs text-gray-500';
export const bodyText     = 'text-sm text-gray-700';

// ─── Modal ────────────────────────────────────────────────────────────────────
export const modalOverlay = 'fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4';
export const modalBox     = 'bg-white rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in';
export const modalHeader  = 'flex items-center justify-between p-5 border-b border-gray-100';
export const modalBody    = 'p-5 space-y-4';

// ─── Tables ───────────────────────────────────────────────────────────────────
export const tableHeader = 'bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide';
export const tableCell   = 'px-4 py-3 text-sm';
export const tableRow    = 'border-b border-gray-100 last:border-0 hover:bg-amber-50/30 transition-colors';
export const tableFooter = 'bg-gray-50 border-t border-gray-200';

// ─── Badges ───────────────────────────────────────────────────────────────────
export const badge       = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold';
export const badgeColor  = {
  green:  'bg-emerald-100 text-emerald-700',
  amber:  'bg-amber-100 text-amber-700',
  red:    'bg-red-100 text-red-700',
  gray:   'bg-gray-100 text-gray-600',
  blue:   'bg-blue-100 text-blue-700',
  purple: 'bg-purple-100 text-purple-700',
};

// ─── Icon containers ──────────────────────────────────────────────────────────
export const iconBox = {
  sm:  'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
  md:  'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
  lg:  'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
};
export const iconColor = {
  amber:   'bg-amber-100 text-amber-600',
  emerald: 'bg-emerald-100 text-emerald-600',
  red:     'bg-red-100 text-red-600',
  blue:    'bg-blue-100 text-blue-600',
  purple:  'bg-purple-100 text-purple-600',
  gray:    'bg-gray-100 text-gray-600',
};

// ─── Avatar ───────────────────────────────────────────────────────────────────
export const avatar = {
  sm: 'w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 select-none',
  md: 'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 select-none',
  lg: 'w-12 h-12 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0 select-none',
};

// ─── Toggle switch ────────────────────────────────────────────────────────────
export const toggleTrack = (on) => `relative w-9 h-5 rounded-full transition-colors cursor-pointer flex-shrink-0 ${on ? 'bg-amber-500' : 'bg-gray-300'}`;
export const toggleThumb = (on) => `absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-4' : 'translate-x-0.5'}`;

// ─── Highlight panels ─────────────────────────────────────────────────────────
export const panel = {
  amber:   'bg-amber-50 border border-amber-200 rounded-xl p-3',
  emerald: 'bg-emerald-50 border border-emerald-200 rounded-xl p-3',
  red:     'bg-red-50 border border-red-200 rounded-xl p-3',
  gray:    'bg-gray-50 border border-gray-200 rounded-xl p-3',
};

// ─── Status-to-badge mapping (for invoices, orders, etc.) ─────────────────────
export const statusBadge = (status = '') => {
  const map = {
    paid:      `${badge} ${badgeColor.green}`,
    active:    `${badge} ${badgeColor.green}`,
    approved:  `${badge} ${badgeColor.green}`,
    completed: `${badge} ${badgeColor.green}`,
    pending:   `${badge} ${badgeColor.amber}`,
    partial:   `${badge} ${badgeColor.amber}`,
    draft:     `${badge} ${badgeColor.gray}`,
    hold:      `${badge} ${badgeColor.gray}`,
    cancelled: `${badge} ${badgeColor.red}`,
    overdue:   `${badge} ${badgeColor.red}`,
    expired:   `${badge} ${badgeColor.red}`,
  };
  return map[status.toLowerCase()] ?? `${badge} ${badgeColor.gray}`;
};
