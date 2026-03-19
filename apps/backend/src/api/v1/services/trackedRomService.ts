import type {
  CreateTrackedRomInput,
  TrackedRom,
  UpdateTrackedRomInput,
} from '../../../../../../pokemon-collection/src/types/Tracked';
import { trackedRomRepo } from '../repositories/trackedRomRepo';

export type ServiceResult<T> =
  | { isValid: true; data: T }
  | { isValid: false; errorMessages: string[] };

const normalize = (s: string) => s.trim().toLowerCase();

export const trackedRomService = {
  async listByUser(userId: string): Promise<TrackedRom[]> {
    return trackedRomRepo.listByUser(userId);
  },

  async add(input: CreateTrackedRomInput): Promise<ServiceResult<TrackedRom>> {
    const errors: string[] = [];

    if (!input.userId.trim()) errors.push('userId is required.');
    if (!input.title.trim()) errors.push('title is required.');
    if (input.hoursPlayed < 0) errors.push('hoursPlayed cannot be negative.');

    if (errors.length) return { isValid: false, errorMessages: errors };

    const existing = await trackedRomRepo.listByUser(input.userId);
    const alreadyTracked = existing.some(
      (r) => normalize(r.title) === normalize(input.title),
    );

    if (alreadyTracked) {
      return {
        isValid: false,
        errorMessages: ['That ROM is already tracked.'],
      };
    }

    const created = await trackedRomRepo.create({
      ...input,
      title: input.title.trim(),
    });

    return { isValid: true, data: created };
  },

  async update(
    id: string,
    patch: UpdateTrackedRomInput,
  ): Promise<ServiceResult<TrackedRom>> {
    const errors: string[] = [];

    if (!id.trim()) errors.push('id is required.');
    if (patch.title !== undefined && !patch.title.trim())
      errors.push('title cannot be empty.');
    if (patch.hoursPlayed !== undefined && patch.hoursPlayed < 0)
      errors.push('hoursPlayed cannot be negative.');

    if (errors.length) return { isValid: false, errorMessages: errors };

    const updated = await trackedRomRepo.update(id, patch);
    if (!updated) {
      return { isValid: false, errorMessages: ['Tracked ROM not found.'] };
    }

    return { isValid: true, data: updated };
  },

  async remove(id: string): Promise<ServiceResult<{ removed: true }>> {
    if (!id.trim())
      return { isValid: false, errorMessages: ['id is required.'] };

    const ok = await trackedRomRepo.remove(id);
    if (!ok)
      return { isValid: false, errorMessages: ['Tracked ROM not found.'] };

    return { isValid: true, data: { removed: true } };
  },
};
