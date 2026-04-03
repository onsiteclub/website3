type TradeId = 'default' | 'wood' | 'drywall' | 'electrical' | 'plumbing' | 'concrete';

export interface ToolItem {
  key: string;
  emoji: string;
}

export const STARTER_KITS: Record<TradeId, ToolItem[]> = {
  default: [
    { key: 'tape_measure', emoji: '📏' },
    { key: 'utility_knife', emoji: '🔪' },
    { key: 'tool_belt', emoji: '🧰' },
    { key: 'pencils', emoji: '✏️' },
    { key: 'chalk_line', emoji: '🪢' },
  ],
  wood: [
    { key: 'speed_square', emoji: '📐' },
    { key: 'framing_hammer', emoji: '🔨' },
    { key: 'circular_saw', emoji: '⚙️' },
    { key: 'tape_measure', emoji: '📏' },
    { key: 'nail_puller', emoji: '🔧' },
  ],
  drywall: [
    { key: 'taping_knives', emoji: '🔪' },
    { key: 'mud_pan', emoji: '🪣' },
    { key: 'drywall_saw', emoji: '🪚' },
    { key: 't_square', emoji: '📐' },
    { key: 'sanding_sponge', emoji: '🧽' },
  ],
  electrical: [
    { key: 'wire_strippers', emoji: '✂️' },
    { key: 'voltage_tester', emoji: '⚡' },
    { key: 'lineman_pliers', emoji: '🔧' },
    { key: 'fish_tape', emoji: '🎣' },
    { key: 'conduit_bender', emoji: '🔩' },
  ],
  plumbing: [
    { key: 'pipe_wrench', emoji: '🔧' },
    { key: 'tubing_cutter', emoji: '✂️' },
    { key: 'teflon_tape', emoji: '🩹' },
    { key: 'pex_crimper', emoji: '🔩' },
    { key: 'basin_wrench', emoji: '🔧' },
  ],
  concrete: [
    { key: 'bull_float', emoji: '🏗️' },
    { key: 'finishing_trowel', emoji: '🔨' },
    { key: 'edger', emoji: '📏' },
    { key: 'concrete_vibrator', emoji: '⚙️' },
    { key: 'knee_boards', emoji: '🛡️' },
  ],
};
