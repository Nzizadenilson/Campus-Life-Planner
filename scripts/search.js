function filterRecords(records, searchedword) {
  if (!searchedword) {
    window.currentRegex = null;
    return records;
  }

  var regex;

  try {
    regex = new RegExp(searchedword, "i");
  } catch (error) {
    searchedword = searchedword.toLowerCase();
    window.currentRegex = null;

    return records.filter(function (item) {
      return (
        item.eventname.toLowerCase().includes(searchedword) ||
        item.tag.toLowerCase().includes(searchedword)
      );
    });
  }
  
  window.currentRegex = regex;

  return records.filter(function (item) {
    return regex.test(item.eventname) || regex.test(item.tag);
  });
}

window.filterRecords = filterRecords;