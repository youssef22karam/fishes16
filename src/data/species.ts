import { SPECIES_1A } from './species1a';
import { SPECIES_1B } from './species1b';
import { SPECIES_2A } from './species2a';
import { SPECIES_2B } from './species2b';
import { SPECIES_3A } from './species3a';
import { SPECIES_3B } from './species3b';
import type { Species } from '../engine/types';

export const SPECIES: Species[] = [...SPECIES_1A, ...SPECIES_1B, ...SPECIES_2A, ...SPECIES_2B, ...SPECIES_3A, ...SPECIES_3B].sort((a, b) => a.name.localeCompare(b.name));
export const GROUPS = Array.from(new Set(SPECIES.map((s) => s.group))).sort();
