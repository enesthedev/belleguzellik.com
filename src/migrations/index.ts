import * as migration_20251217_143517 from './20251217_143517';
import * as migration_20251217_160439 from './20251217_160439';

export const migrations = [
  {
    up: migration_20251217_143517.up,
    down: migration_20251217_143517.down,
    name: '20251217_143517',
  },
  {
    up: migration_20251217_160439.up,
    down: migration_20251217_160439.down,
    name: '20251217_160439'
  },
];
