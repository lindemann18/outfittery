const SERVICE_NAME = 'PreviewFeedbackReasonsService';

/**
 * Constants for Preview Feedback Reasons
 * @returns [{
 *    "id":1, "text":"..."
 *    }, {
 *    "id":2, "text":"..."
 *    }]
 */
function previewFeedbackService() {
  const getReasons = () => ([{
    id: 380482, text: 'components.previewFeedbackReasons.noNeed',
  }, {
    id: 100, text: 'components.previewFeedbackReasons.haveAlready',
  }, {
    id: 1296049, text: 'components.previewFeedbackReasons.tooFancy',
  }, {
    id: 539682, text: 'components.previewFeedbackReasons.tooSimple',
  }, {
    id: 1427266, text: 'components.previewFeedbackReasons.color',
  }, {
    id: 1539154, text: 'components.previewFeedbackReasons.pattern',
  }, {
    id: 1361878, text: 'components.previewFeedbackReasons.notMyStyle',
  }]);

  return { getReasons };
}

export { SERVICE_NAME, previewFeedbackService };
