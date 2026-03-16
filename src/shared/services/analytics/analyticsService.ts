type EventName =
  | 'GAME_START'
  | 'GAME_END'
  | 'GAME_PAUSE'
  | 'GAME_RESUME'
  | 'QUESTION_ANSWER'
  | 'LEVEL_COMPLETE'
  | 'ACHIEVEMENT_UNLOCK'
  | 'PAGE_VIEW'
  | 'BUTTON_CLICK';

interface EventData {
  [key: string]: any;
}

class AnalyticsService {
  private enabled: boolean = true;
  private queue: Array<{ event: EventName; data: EventData; timestamp: number }> = [];

  /**
   * Track an event
   */
  track(event: EventName, data: EventData = {}) {
    if (!this.enabled) return;

    const eventData = {
      event,
      data: {
        ...data,
        url: window.location.href,
        userAgent: navigator.userAgent,
      },
      timestamp: Date.now(),
    };

    // Add to queue
    this.queue.push(eventData);

    // Log to console in development
    if (import.meta.env.DEV) {
      console.log('📊 Analytics:', event, data);
    }

    // Send to backend (batch)
    this.flush();
  }

  /**
   * Track page view
   */
  pageView(pageName: string, data: EventData = {}) {
    this.track('PAGE_VIEW', {
      page: pageName,
      ...data,
    });
  }

  /**
   * Track game start
   */
  gameStart(gameId: string, data: EventData = {}) {
    this.track('GAME_START', {
      gameId,
      ...data,
    });
  }

  /**
   * Track game end
   */
  gameEnd(gameId: string, score: number, data: EventData = {}) {
    this.track('GAME_END', {
      gameId,
      score,
      ...data,
    });
  }

  /**
   * Track question answer
   */
  questionAnswer(gameId: string, questionId: string, isCorrect: boolean, data: EventData = {}) {
    this.track('QUESTION_ANSWER', {
      gameId,
      questionId,
      isCorrect,
      ...data,
    });
  }

  /**
   * Flush events to backend
   */
  private async flush() {
    if (this.queue.length === 0) return;

    // Batch send every 10 events or 5 seconds
    if (this.queue.length >= 10) {
      const events = [...this.queue];
      this.queue = [];

      try {
        // TODO: Send to backend
        // await apiClient.post('/analytics/events', { events });
      } catch (error) {
        console.error('Failed to send analytics:', error);
        // Re-add to queue
        this.queue.unshift(...events);
      }
    }
  }

  /**
   * Enable/disable analytics
   */
  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }
}

export const analytics = new AnalyticsService();
export default analytics;
