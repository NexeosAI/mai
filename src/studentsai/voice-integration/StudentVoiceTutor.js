/**
 * File: StudentVoiceTutor.js
 * Purpose: Voice tutor integration for StudentsAI
 * Location: src/studentsai/voice-integration/
 */

class StudentVoiceTutor {
  constructor({
    workshopEngine,
    speechToTextService = null,
    analyticsTracker = null,
  }) {
    if (!workshopEngine) {
      throw new Error('StudentVoiceTutor requires a workshopEngine instance');
    }

    this.workshop = workshopEngine;
    this.speechToTextService = speechToTextService;
    this.analytics = analyticsTracker;
  }

  async handleStudentVoiceRequest(audioInput, options = {}) {
    const transcript = await this.transcribeAudio(audioInput, options);
    const workshopResponse = transcript
      ? await this.forwardToWorkshop(transcript, options.context)
      : null;
    const guidance = await this.generateVoiceGuidance({
      transcript,
      workshopResponse,
      options,
    });

    await this.trackInteraction({
      transcript,
      workshopResponse,
      guidance,
      metadata: options.metadata || null,
    });

    return {
      transcript,
      workshopResponse,
      guidance,
    };
  }

  async transcribeAudio(audioInput, options = {}) {
    if (!audioInput) {
      return '';
    }

    if (!this.speechToTextService?.transcribe) {
      return '';
    }

    return this.speechToTextService.transcribe(audioInput, options);
  }

  async forwardToWorkshop(transcript, context = {}) {
    if (!transcript) {
      return null;
    }

    if (typeof this.workshop?.handleStudentRequest !== 'function') {
      return null;
    }

    return this.workshop.handleStudentRequest(transcript, context);
  }

  async generateVoiceGuidance({
    transcript,
    workshopResponse,
    options = {},
  }) {
    if (workshopResponse?.voiceMessage) {
      return workshopResponse.voiceMessage;
    }

    return this.provideStudentGuidance({
      transcript,
      workshopResponse,
      options,
    });
  }

  async provideStudentGuidance() {
    return 'Keep going, you\'re doing great!';
  }

  async trackInteraction({
    transcript,
    workshopResponse,
    guidance,
    metadata = null,
  }) {
    if (typeof this.analytics?.trackVoiceInteraction !== 'function') {
      return;
    }

    await this.analytics.trackVoiceInteraction({
      transcript,
      workshopResponse,
      guidance,
      metadata,
    });
  }
}

export default StudentVoiceTutor;
