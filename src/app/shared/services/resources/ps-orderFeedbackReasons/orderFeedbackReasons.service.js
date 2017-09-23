const SERVICE_NAME = 'OrderFeedbackReasonsService';

/**
 * Constants for Order Feedback Reasons
 * @returns [{
 *    "id":1, "text":"..."
 *    }, {
 *    "id":2, "text":"..."
 *    }]
 */
function orderFeedbackService() {
  const getReasons = () => ([{
    id: 380477, text: 'components.orderFeedbackReasons.tooLarge',
  }, {
    id: 380478, text: 'components.orderFeedbackReasons.tooSmall',
  }, {
    id: 1, text: 'components.orderFeedbackReasons.price',
  }, {
    id: 1296060, text: 'components.orderFeedbackReasons.quality',
  }, {
    id: 100, text: 'components.orderFeedbackReasons.haveAlready',
  }, {
    id: 380482, text: 'components.orderFeedbackReasons.noNeed',
  }, {
    id: 1427266, text: 'components.orderFeedbackReasons.color',
  }, {
    id: 380476, text: 'components.orderFeedbackReasons.brand',
  }, {
    id: 1539154, text: 'components.orderFeedbackReasons.pattern',
  }, {
    id: 1361878, text: 'components.orderFeedbackReasons.notMyStyle',
  }, {
    id: 380483, text: 'components.orderFeedbackReasons.articleDefect',
  }]);

  return { getReasons };
}

export { SERVICE_NAME, orderFeedbackService };
