import * as migration_20251214_114540 from './20251214_114540';
import * as migration_20251217_124951 from './20251217_124951';
import * as migration_20251217_130322 from './20251217_130322';

export const migrations = [
  {
    up: migration_20251214_114540.up,
    down: migration_20251214_114540.down,
    name: '20251214_114540',
  },
  {
    up: migration_20251217_124951.up,
    down: migration_20251217_124951.down,
    name: '20251217_124951',
  },
  {
    up: migration_20251217_130322.up,
    down: migration_20251217_130322.down,
    name: '20251217_130322'
  },
];
