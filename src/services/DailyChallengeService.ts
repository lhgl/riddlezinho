import { Phase, Phases } from '../config/phases';

export class DailyChallengeService {
  constructor(private readonly phases: Phases) {}

  getDailyPhase(): Phase {
    const phaseIds = Object.keys(this.phases);
    const dayOfYear = this.getDayOfYear(new Date());
    return this.phases[phaseIds[dayOfYear % phaseIds.length]];
  }

  private getDayOfYear(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 0);
    return Math.floor((date.getTime() - start.getTime()) / 86400000);
  }
}
