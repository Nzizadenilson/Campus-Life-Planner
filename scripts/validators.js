window.eventregex = function (eventname) {
  const regex = /^\S(?:.*\S)?$/;
  const duplicatewords = /\b(\w+)\s+\1\b/;

  if (!regex.test(eventname)) {
    window.setStatus(
      "Enter an Event name wich doesn't have leading, trailing or multiple spaces",
    );
    return false;
  }

  if (duplicatewords.test(eventname)) {
    window.setStatus("The event name is duplicated");
    return false;
  }

  return true;
};

window.duedateregex = function (duedate) {
  const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

  if (!regex.test(duedate)) {
    window.setStatus("Enter a valid due date in YYYY-MM-DD format", "error");
    return false;
  }

  return true;
};

window.durationregex = function (duration) {
  const regex = /^(0|[1-9]\d*)(\.\d{1,2})?$/;

  if (!regex.test(duration)) {
    window.setStatus(
      "Enter a numeric duration with up to 2 decimal places",
      "error",
    );
    return false;
  }
  return true;
};

window.tagregex = function (tag) {
  const regex = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

  if (!regex.test(tag)) {
    window.setStatus("Enter letters or hyphens or both only");
    return false;
  }
  return true;
};
