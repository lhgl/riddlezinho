/**
 * Controller para renderizar fases do jogo
 */

import * as fs from 'fs';
import * as path from 'path';

import { Phase, Phases } from '../config/phases';

// Caminho base para views (projeto raiz)
// __dirname em dist/controllers aponta para dist/controllers
// views está em ../views relativo ao projeto raiz
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
  renderPhase(req: any, res: any, _next: () => void): void {
    const { phaseId } = req.params;
    const phase = this.phases[phaseId];

    console.log(`[PhaseController] Tentando renderizar: ${phaseId}`);
    console.log(`[PhaseController] VIEWS_DIR: ${VIEWS_DIR}`);
    console.log(`[PhaseController] Phase encontrada:`, phase ? 'sim' : 'não');

    if (!phase) {
      console.error(`[PhaseController] Fase não encontrada: ${phaseId}`);
      return res.status(404).render('error', {
        footerback: this.footerback
      });
    }

    // Verificar se arquivo EJS existe
    const viewPath = path.join(VIEWS_DIR, `${phaseId}.ejs`);
    console.log(`[PhaseController] viewPath: ${viewPath}`);
    console.log(`[PhaseController] viewPath existe: ${fs.existsSync(viewPath)}`);

    if (!fs.existsSync(viewPath)) {
      console.error(`[PhaseController] Arquivo não existe: ${viewPath}`);
      return res.status(404).render('error', {
        footerback: this.footerback
      });
    }

    res.render(phaseId, {
      phase,
      footerpasscode: phase.type === 'passcode' ? this.footerpasscode : undefined,
      footerback: phase.type === 'back' ? this.footerback : undefined
    });
  }

  /**
   * Renderiza página inicial
   */
  renderIndex(req: any, res: any): void {
    res.render('index');
  }

  /**
   * Renderiza página de jogo
   */
  renderGame(req: any, res: any): void {
    res.render('jogar');
  }

  /**
   * Renderiza página de dica (tips)
   */
  renderTip(req: any, res: any, _next: () => void): void {
    const { tipId } = req.params;

    // Verificar se arquivo EJS existe
    const viewPath = path.join(VIEWS_DIR, `${tipId}.ejs`);
    if (!fs.existsSync(viewPath)) {
      console.error(`[PhaseController] Arquivo não existe: ${viewPath}`);
      return res.status(404).render('error', {
        footerback: this.footerback,
        includefooterback: true
      });
    }

    res.render(tipId, {
      footerback: this.footerback,
      includefooterback: true
    });
  }

  /**
   * Retorna metadata de todas as fases em JSON
   */
  getPhasesList(req: any, res: any): void {
    const phasesList = Object.values(this.phases).map((phase: Phase) => ({
      id: phase.id,
      number: phase.number,
      level: phase.level,
      name: phase.name,
      hasImage: !!phase.image,
      missing: phase.missing || false
    }));

    res.json({
      total: phasesList.length,
      phases: phasesList
    });
  }

  /**
   * Retorna dados de uma fase específica em JSON
   */
  getPhaseData(req: any, res: any): void {
    const { phaseId } = req.params;
    const phase = this.phases[phaseId];

    if (!phase) {
      return res.status(404).json({ error: 'Fase não encontrada' });
    }

    res.json(phase);
  }
}

// Exportação para compatibilidade com CommonJS/Jest
export default PhaseController;
export { PhaseController as PhaseControllerClass };
