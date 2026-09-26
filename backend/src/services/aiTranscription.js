import fs from 'fs';
import path from 'path';
import os from 'os';
import Groq from 'groq-sdk';
import config from '../config/env.js';
import crypto from 'crypto';

const groq = new Groq({
  apiKey: config.groqApiKey,
});

/**
 * Transcribes a raw webm audio buffer using Groq Whisper AI.
 * @param {Buffer} audioBuffer - Base64 decoded buffer from client
 * @param {string} langHint - Optional language hint
 * @returns {Promise<string>}
 */
export const transcribeAudioChunk = async (audioBuffer, langHint = 'en') => {
  if (!config.groqApiKey) {
    console.warn('[Transcription] No Groq API Key found.');
    return '';
  }

  // Groq SDK requires a valid File stream, so we write the chunk to a temp file
  const tmpDir = os.tmpdir();
  const tmpFilePath = path.join(tmpDir, `chunk_${crypto.randomBytes(4).toString('hex')}.webm`);
  
  try {
    fs.writeFileSync(tmpFilePath, audioBuffer);

    // Call Groq Whisper API
    const response = await groq.audio.transcriptions.create({
      file: fs.createReadStream(tmpFilePath),
      model: 'whisper-large-v3', // Whisper large v3 handles all languages perfectly
      prompt: 'Medical consultation dialogue.', // Context helps the AI recognize medical terms
      response_format: 'json',
    });

    return response.text || '';
  } catch (error) {
    console.error('[Transcription] Groq API error:', error.message);
    return '';
  } finally {
    // Clean up temp file
    try {
      if (fs.existsSync(tmpFilePath)) {
        fs.unlinkSync(tmpFilePath);
      }
    } catch (e) {}
  }
};
