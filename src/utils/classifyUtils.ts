const classifyUtils = {
  getClassifyOfObject: (chatId, classifies) => {
    return classifies.find((ele) =>
      ele.conversationIds.find((id) => id === chatId),
    );
  },
};

export default classifyUtils;
