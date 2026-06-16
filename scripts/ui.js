window.showrecords = function (records, tbody) {
  let html = "";

  records.forEach(function (r) {
    html += `
      <tr>
        <td>${r.eventname}</td>
        <td>${r.duedate}</td>
        <td>${r.duration}</td>
        <td>${r.tag}</td>
        <td>
          <button>Edit</button>
          <button>Delete</button>
        </td>
      </tr>
    `;
  });
  tbody.innerHTML = html;
};
