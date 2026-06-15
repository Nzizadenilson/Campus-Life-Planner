const submit = document.getElementById("submitbtn");
const tbody = document.getElementById("tbody");
let records = [];

submit.onclick = function (e) {
  e.preventDefault();

  const rec = {
    id: Date.now(),
    eventname: document.getElementById("event").value,
    deadline: document.getElementById("dueDate").value,
    duration: document.getElementById("duration").value,
    tag: document.getElementById("tag").value,
  };

  records.push(rec);
  showrecords();
};

function showrecords() {
  tbody.innerHTML = "";

  records.forEach(function (r) {
    tbody.innerHTML += `
      <tr>
        <td>${r.eventname}</td>
        <td>${r.deadline}</td>
        <td>${r.duration}</td>
        <td>${r.tag}</td>
      </tr>
      
    `;
  });
}
