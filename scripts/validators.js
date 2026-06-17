window.eventregex = function (eventname) {
  const regex = /^\S(?:.*\S)?$/;
  const duplicatewords = /\b(\w+)\s+\1\b/;

  if (!regex.test(eventname)) {
    window.alert(
      "Enter an Event name wich doesn't have leading, trailing or multiple spaces",
    );
    return false;
  }

  if (duplicatewords.test(eventname)) {
    window.alert("The event name is duplicated");
    return false;
  }

  return true;
};

window.duedateregex = function (duedate) {
  const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

  return regex.test(duedate);
};

window.durationregex = function (duration) {
  const regex = /^(0|[1-9]\d*)(\.\d{1,2})?$/;

  if (!regex.test(duration)) {
    window.alert("Enter numeric values only with 2 decimal numbers or less");
    return false;
  }
  return true;
};
window.tagregex = function (tag) {
  const regex = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

  if (!regex.test(tag)) {
    window.alert("Enter letters or hyphens or both only");
    return false;
  }
  return true;
};