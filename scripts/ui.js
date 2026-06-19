window.showrecords = function (records, tbody) {
  function highlight(text, regex) {
    if (!regex) {
      return text;
    }

    return text.replace(regex, function (match) {
      return "<mark>" + match + "</mark>";
    });
  }

  var regex = window.currentRegex;

  var html = "";

  records.forEach(function (r) {
    html += `
      <tr>
        <td>${highlight(r.eventname, regex)}</td>
        <td>${r.duedate}</td>
        <td>${getDuration(r.duration)}</td>
        <td>${highlight(r.tag, regex)}</td>
        <td>${r.createdAt ? new Date(r.createdAt).toLocaleString() : "-"}</td>
        <td>${r.updatedAt ? new Date(r.updatedAt).toLocaleString() : "-"}</td>
        <td>
          <button onclick="editRecord(${r.id})">Edit</button>
          <button onclick="deleteRecord(${r.id})">Delete</button>
        </td>
      </tr>
    `;
  });
  tbody.innerHTML = html;
};