module.exports.INVITE_STATUS = Object.freeze({
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
});

module.exports.DEFAULT_LIST = Object.freeze({
  TODO: "to Do",
  DOING: "Doing",
  DONE: "Done",
});

module.exports.PROJECT_ACTIVITY = Object.freeze({
  ADD_MEMBER: function (name) {
    return `${name} has joined the project`;
  },
  ADD_TASK: function (name) {
    return `A new task: '${name}' was created`;
  },
  ASSIGN_TASK: function (user_name, task_name) {
    return `${user_name} was assigned a new task: ${task_name}`;
  },
});
