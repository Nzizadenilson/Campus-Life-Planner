function exportJSON(records) {
  const dataStr = JSON.stringify(records, null, 2);

  const downloadfile = new Blob([dataStr], { type: "application/json" });

  const url = URL.createObjectURL(downloadfile);

  const a = document.createElement("a");
  a.href = url;
  a.download = "campus-data.json";

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

function importJSON(file, callback) {
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (event) {
    try {
      const data = JSON.parse(event.target.result);

      if (!Array.isArray(data)) {
        alert("Invalid JSON format");
        return;
      }

      callback(data);
    } catch (err) {
      alert("Invalid JSON file");
    }
  };

  reader.readAsText(file);
}
