function filterRecords(records, searchedword) {
  if (!searchedword) {
    return records;
  }

  let regex;

  try {
    regex = new RegExp(searchedword, "i");
  } catch (error) {
    searchedword = searchedword.toLowerCase();

    return records.filter(function (item) {
      return (
        item.eventname.toLowerCase().includes(searchedword) ||
        item.tag.toLowerCase().includes(searchedword)
      );
    });
  }
  return records.filter(function (item) {
    return regex.test(item.eventname) || regex.test(item.tag);
  });
}

window.filterRecords = filterRecords;
