/**
 * Controller para renderizar fases do jogo
 */

import * as fs from 'fs';
import * as path from 'path';

import { Request, Response, NextFunction } from 'express';

import { Phase, Phases } from '../config/phases';
import { logError } from '../utils/logger';

// __dirname em dist/controllers aponta para dist/controllers
// views está em ../../views relativo ao projeto raiz
const VIEWS_DIR = path.resolve(__dirname, '../../views');

export interface PhaseControllerDeps {
  footerpasscode: string;
  footerback: string;
}

export class PhaseController {
  private phases: Phases;
  public footerpasscode: string;
  public footerback: string;

  constructor(phases: Phases, footerpasscode: string, footerback: string) {
    this.phases = phases;
    this.footerpasscode = footerpasscode;
    this.footerback = footerback;
  }

  /**
   * Renderiza uma fase específica
   */
  renderPhase(req: Request, res: Response, _next: NextFunction): void {
    const phaseId = String(req.params.phaseId);
    const phase = this.phases[phaseId];

    if (!phase) {
      logError('phase_not_found', new Error(`Fase não encontrada: ${phaseId}`));
      res.status(404).render('error', { footerback: this.footerback });
      return;
    }

    const viewPath = path.join(VIEWS_DIR, `${phaseId}.ejs`);

    if (!fs.existsSync(viewPath)) {
      logError('phase_view_not_found', new Error(`Arquivo não encontrado: ${viewPath}`));
      res.status(404).render('error', { footerback: this.footerback });
      return;
    }

    res.render(String(phaseId), {
      phase,
      footerpasscode: phase.type === 'passcode' ? this.footerpasscode : undefined,
      footerback: phase.type === 'back' ? this.footerback : undefined
    });
  }

  /**
   * Renderiza página inicial
   */
  renderIndex(req: Request, res: Response): void {
    res.render('index');
  }

  /**
   * Renderiza página de jogo
   */
  renderGame(req: Request, res: Response): void {
    res.render('jogar');
  }

  /**
   * Renderiza página de dica (tips)
   */
  renderTip(req: Request, res: Response, _next: NextFunction): void {
    const tipId = String(req.params.tipId);
    const viewPath = path.join(VIEWS_DIR, `${tipId}.ejs`);

    if (!fs.existsSync(viewPath)) {
      logError('tip_view_not_found', new Error(`Arquivo não encontrado: ${viewPath}`));
      res.status(404).render('error', {
        footerback: this.footerback,
        includefooterback: true
      });
      return;
    }

    res.render(String(tipId), {
      footerback: this.footerback,
      includefooterback: true
    });
  }

  /**
   * Retorna metadata de todas as fases em JSON
   */
  getPhasesList(req: Request, res: Response): void {
    const phasesList = Object.values(this.phases).map((phase: Phase) => ({
      id: phase.id,
      number: phase.number,
      level: phase.level,
      name: phase.name,
      hasImage: !!phase.image,
      missing: phase.missing || false
    }));

    res.json({ total: phasesList.length, phases: phasesList });
  }

  /**
   * Retorna dados de uma fase específica em JSON
   */
  getPhaseData(req: Request, res: Response): void {
    const phaseId = String(req.params.phaseId);
    const phase = this.phases[phaseId];

    if (!phase) {
      res.status(404).json({ error: 'Fase não encontrada' });
      return;
    }

    res.json(phase);
  }
}

export default PhaseController;
export { PhaseController as PhaseControllerClass };
