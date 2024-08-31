class GenericFunctions {
  static randomNumber() {
    return Math.round(Math.random() * 1000);
  }

  static currentDate() {
    const NOW_DATE = new Date();
    let day = NOW_DATE.getDate();
    let month = NOW_DATE.getMonth() + 1;
    let year = NOW_DATE.getFullYear();
    let currentDate: any = `${year}-${month}-${day}`;
    return currentDate;
  }
  static testCurrentDate() {
    const now = new Date();
    const expectedDate = `${now.getFullYear()}-${String(now.getDate()).padStart(
      2,
      "0"
    )}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    return expectedDate;
  }
}
export default GenericFunctions;
