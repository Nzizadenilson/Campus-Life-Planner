window.showrecords = function (records, tbody) {
  tbody.innerHTML = "";

  records.forEach(function (r) {
    tbody.innerHTML += `
      <tr>
        <td>${r.eventname}</td>
        <td>${r.duedate}</td>
        <td>${r.duration}</td>
        <td>${r.tag}</td>
      </tr>
      
    `;
  });
}
