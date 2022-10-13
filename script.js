const timeFrames = [...document.querySelectorAll(".timeframes li")];
// console.log(times);
const Titles = document.querySelectorAll(".heading");
const Times = document.querySelectorAll(".time");
const lastWeeks = document.querySelectorAll(".last-week");

timeFrames.forEach((timeF) => {
  timeF.addEventListener("click", () => {
    getData(timeF.innerText.toLowerCase());
    //   set active style to selected timeframe
    timeF.classList.add("active");
    timeFrames
      .filter((item) => {
        return item != timeF;
      })
      .forEach((item) => {
        item.classList.remove("active");
      });
  });
});

const getData = async (timeF) => {
  const res = await fetch("./data.json");
  const Datas = await res.json();
  Titles.forEach((title, index) => {
    title.innerHTML = Datas[index].title;
  });
  Times.forEach((time, index) => {
    timeF == "daily"
      ? (time.innerHTML = Datas[index].timeframes.daily.current + "hrs")
      : timeF == "weekly"
      ? (time.innerHTML = Datas[index].timeframes.weekly.current + "hrs")
      : (time.innerHTML = Datas[index].timeframes.monthly.current + "hrs");
  });
  lastWeeks.forEach((lastWeek, index) => {
    timeF == "daily"
      ? (lastWeek.innerHTML =
          "Last Week - " + Datas[index].timeframes.daily.previous + "hrs")
      : timeF == "weekly"
      ? (lastWeek.innerHTML =
          "Last Week - " + Datas[index].timeframes.weekly.previous + "hrs")
      : (lastWeek.innerHTML =
          "Last Week - " + Datas[index].timeframes.monthly.previous + "hrs");
  });
};

// initially get the daily data as default
getData("daily");
