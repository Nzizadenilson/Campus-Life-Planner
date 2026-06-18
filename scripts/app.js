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
let records = JSON.parse(localStorage.getItem("records")) || [];
let editId = null;

function saveRecords() {
  localStorage.setItem("records", JSON.stringify(records));
}

submit.onclick = function (e) {
  e.preventDefault();

  const now = new Date().toISOString();
  const rec = {
    id: Date.now(),
    eventname: document.getElementById("event").value,
    duedate: document.getElementById("dueDate").value,
    duration: document.getElementById("duration").value,
    tag: document.getElementById("tag").value,
    createdAt: now,
    updatedAt: now,
  };

  if (!window.eventregex(rec.eventname)) return;
  if (!window.duedateregex(rec.duedate)) return;
  if (!window.durationregex(rec.duration)) return;
  if (!window.tagregex(rec.tag)) return;

  const isEditing = editId !== null;

  if (editId === null) {
    records.push(rec);
  } else {
    const index = records.findIndex(function (r) {
      return r.id === editId;
    });

    const oldRecord = records[index];

    rec.id = editId;
    rec.createdAt = oldRecord.createdAt;
    rec.updatedAt = new Date().toISOString();
    records[index] = rec;

    editId = null;

    document.getElementById("submitbtn").textContent = "Add Event";
  }
  saveRecords();
  showrecords(records, tbody);
  updateDashboard();

  document.getElementById("eventForm").reset();
  if (isEditing) {
    alert("Event updated successfully");
  } else {
    alert("Event added successfully");
  }
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
  updateDashboard();
});

window.deleteRecord = function (id) {
  const confirmed = confirm("Are you sure you want to delete this event?");

  if (confirmed) {
    records = records.filter(function (record) {
      return record.id !== id;
    });

    saveRecords();
    showrecords(records, tbody);
    updateDashboard();
  }
};

window.editRecord = function (id) {
  const record = records.find(function (r) {
    return r.id === id;
  });

  editId = id;

  document.getElementById("event").value = record.eventname;
  document.getElementById("dueDate").value = record.duedate;
  document.getElementById("duration").value = record.duration;
  document.getElementById("tag").value = record.tag;
  document.getElementById("submitbtn").textContent = "Update Event";

  showSection("addevent");
};

function updateDashboard() {
  document.getElementById("totalEvents").textContent = records.length;

  let totalDuration = 0;

  records.forEach(function (record) {
    totalDuration += Number(record.duration);
  });

  document.getElementById("totalDuration").textContent = totalDuration;

  const tags = {};

  records.forEach(function (record) {
    if (tags[record.tag]) {
      tags[record.tag]++;
    } else {
      tags[record.tag] = 1;
    }
  });

  let topTag = "-";
  let maxCount = 0;

  for (let tag in tags) {
    if (tags[tag] > maxCount) {
      maxCount = tags[tag];
      topTag = tag;
    }
  }

  document.getElementById("topTag").textContent = topTag;
}

showrecords(records, tbody);
updateDashboard();
