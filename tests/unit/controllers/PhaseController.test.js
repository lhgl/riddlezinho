/**
 * Testes para PhaseController
 */

const PhaseControllerModule = require('../../../src/controllers/PhaseController');
const PhaseController = PhaseControllerModule.PhaseControllerClass || PhaseControllerModule.default || PhaseControllerModule;
const fs = require('fs');
const path = require('path');

describe('PhaseController', () => {
  let phaseController;
  let mockReq, mockRes, next;

  const mockPhases = {
    fasezero: {
      id: 'fasezero',
      number: 0,
      level: 0,
      name: 'Fase Zero',
      type: 'passcode'
    },
    coracao: {
      id: 'coracao',
      number: 1,
      level: 1,
      name: 'Fase 1',
      type: 'passcode',
      image: '/images/test.jpg'
    },
    missing: {
      id: 'missing',
      number: 999,
      level: 2,
      name: 'Missing Phase',
      type: 'passcode',
      missing: true
    }
  };

  const mockFooterPasscode = '<footer>Passcode</footer>';
  const mockFooterBack = '<footer>Back</footer>';

  beforeEach(() => {
    phaseController = new PhaseController(mockPhases, mockFooterPasscode, mockFooterBack);

    mockReq = {
      params: {}
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      render: jest.fn()
    };
    next = jest.fn();
  });

  describe('renderPhase', () => {
    it('deve renderizar fase existente', () => {
      mockReq.params.phaseId = 'fasezero';

      // Mock fs.existsSync para retornar true
      const existsSyncSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(true);

      phaseController.renderPhase(mockReq, mockRes, next);

      expect(mockRes.render).toHaveBeenCalledWith('fasezero', {
        phase: mockPhases.fasezero,
        footerpasscode: mockFooterPasscode,
        footerback: undefined
      });

      existsSyncSpy.mockRestore();
    });

    it('deve retornar 404 para fase inexistente', () => {
      mockReq.params.phaseId = 'nonexistent';

      phaseController.renderPhase(mockReq, mockRes, next);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.render).toHaveBeenCalledWith('error', {
        footerback: mockFooterBack
      });
    });

    it('deve retornar 404 se arquivo EJS nao existe', () => {
      mockReq.params.phaseId = 'fasezero';

      const existsSyncSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(false);

      phaseController.renderPhase(mockReq, mockRes, next);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.render).toHaveBeenCalledWith('error', {
        footerback: mockFooterBack
      });

      existsSyncSpy.mockRestore();
    });

    it('deve incluir footerpasscode para fase tipo passcode', () => {
      mockReq.params.phaseId = 'coracao';

      const existsSyncSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(true);

      phaseController.renderPhase(mockReq, mockRes, next);

      expect(mockRes.render).toHaveBeenCalledWith('coracao', {
        phase: mockPhases.coracao,
        footerpasscode: mockFooterPasscode,
        footerback: undefined
      });

      existsSyncSpy.mockRestore();
    });

    it('deve incluir footerback para fase tipo back', () => {
      const backPhase = {
        id: 'backphase',
        number: 50,
        level: 2,
        name: 'Back Phase',
        type: 'back'
      };
      const phasesWithBack = { ...mockPhases, backphase: backPhase };
      const controller = new PhaseController(phasesWithBack, mockFooterPasscode, mockFooterBack);

      mockReq.params.phaseId = 'backphase';
      const existsSyncSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(true);

      controller.renderPhase(mockReq, mockRes, next);

      expect(mockRes.render).toHaveBeenCalledWith('backphase', {
        phase: backPhase,
        footerpasscode: undefined,
        footerback: mockFooterBack
      });

      existsSyncSpy.mockRestore();
    });
  });

  describe('renderIndex', () => {
    it('deve renderizar index', () => {
      phaseController.renderIndex(mockReq, mockRes);

      expect(mockRes.render).toHaveBeenCalledWith('index');
    });
  });

  describe('renderGame', () => {
    it('deve renderizar jogar', () => {
      phaseController.renderGame(mockReq, mockRes);

      expect(mockRes.render).toHaveBeenCalledWith('jogar');
    });
  });

  describe('renderTip', () => {
    it('deve renderizar dica', () => {
      mockReq.params.tipId = 'dica1';

      const existsSyncSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(true);

      phaseController.renderTip(mockReq, mockRes, next);

      expect(mockRes.render).toHaveBeenCalledWith('dica1', {
        footerback: mockFooterBack,
        includefooterback: true
      });

      existsSyncSpy.mockRestore();
    });

    it('deve retornar 404 se arquivo de dica nao existe', () => {
      mockReq.params.tipId = 'nonexistent';

      const existsSyncSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(false);

      phaseController.renderTip(mockReq, mockRes, next);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.render).toHaveBeenCalledWith('error', {
        footerback: mockFooterBack,
        includefooterback: true
      });

      existsSyncSpy.mockRestore();
    });
  });

  describe('getPhasesList', () => {
    it('deve retornar lista de fases em JSON', () => {
      phaseController.getPhasesList(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        total: 3,
        phases: expect.arrayContaining([
          expect.objectContaining({ id: 'fasezero' }),
          expect.objectContaining({ id: 'coracao' }),
          expect.objectContaining({ id: 'missing' })
        ])
      });
    });

    it('deve incluir hasImage para cada fase', () => {
      phaseController.getPhasesList(mockReq, mockRes);

      const callArgs = mockRes.json.mock.calls[0][0];
      const phases = callArgs.phases;

      phases.forEach(phase => {
        expect(phase).toHaveProperty('hasImage');
        expect(typeof phase.hasImage).toBe('boolean');
      });
    });

    it('deve incluir missing para cada fase', () => {
      phaseController.getPhasesList(mockReq, mockRes);

      const callArgs = mockRes.json.mock.calls[0][0];
      const phases = callArgs.phases;

      phases.forEach(phase => {
        expect(phase).toHaveProperty('missing');
      });
    });
  });

  describe('getPhaseData', () => {
    it('deve retornar dados de uma fase', () => {
      mockReq.params.phaseId = 'coracao';

      phaseController.getPhaseData(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(mockPhases.coracao);
    });

    it('deve retornar 404 para fase inexistente', () => {
      mockReq.params.phaseId = 'nonexistent';

      phaseController.getPhaseData(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Fase não encontrada' });
    });
  });

  describe('constructor', () => {
    it('deve armazenar phases', () => {
      expect(phaseController.phases).toBe(mockPhases);
    });

    it('deve armazenar footerpasscode', () => {
      expect(phaseController.footerpasscode).toBe(mockFooterPasscode);
    });

    it('deve armazenar footerback', () => {
      expect(phaseController.footerback).toBe(mockFooterBack);
    });
  });
});
