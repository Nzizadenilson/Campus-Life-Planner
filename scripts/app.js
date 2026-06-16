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

  if (!eventregex(rec.eventname)) return;
  if (!duedateregex(rec.duedate)) return;
  if (!durationregex(rec.duration)) return;
  if (!tagregex(rec.tag)) return;

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
