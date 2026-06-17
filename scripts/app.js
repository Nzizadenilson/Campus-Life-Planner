const sections = document.querySelectorAll("section");

function showSection(id) {
  sections.forEach(function (sec) {
    sec.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
}
showSection("about");

const submit = document.getElementById("submitbtn");
const tbody = document.getElementById("tbody");
let records = [];

submit.onclick = function (e) {
  e.preventDefault();

  const rec = {
    id: Date.now(),
    eventname: document.getElementById("event").value,
    duedate: document.getElementById("dueDate").value,
    duration: document.getElementById("duration").value,
    tag: document.getElementById("tag").value,
  };

  if (!window.eventregex(rec.eventname)) return;
  if (!window.duedateregex(rec.duedate)) return;
  if (!window.durationregex(rec.duration)) return;
  if (!window.tagregex(rec.tag)) return;

  records.push(rec);
  showrecords(records, tbody);

  document.getElementById("eventForm").reset();
  alert("Event added successfully");
};
const searchInput = document.getElementById("search");
searchInput.addEventListener("input", function () {
  const searchedword = searchInput.value;

  const filtered = filterRecords(records, searchedword);

  showrecords(filtered, tbody);
});

const sortSelect = document.getElementById("sort");
sortSelect.addEventListener("change", function () {
  const value = sortSelect.value;
  let sorted = [...records];

  if (value === "event") {
    sorted.sort(function (a, b) {
      return a.eventname.localeCompare(b.eventname);
    });
  }

  if (value === "date") {
    sorted.sort(function (a, b) {
      return new Date(a.duedate) - new Date(b.duedate);
    });
  }

  if (value === "duration") {
    sorted.sort(function (a, b) {
      return Number(a.duration) - Number(b.duration);
    });
  }

  showrecords(sorted, tbody);
});
