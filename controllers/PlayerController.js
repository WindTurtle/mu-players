let playerList = [];

axios({
  method: "GET",
  url: "https://5e9829e75eabe7001681bbfb.mockapi.io/player",
})
  .then((res) => {
    playerList = res.data;
    renderLayout(playerList);
    console.log(playerList);
  })
  .catch((err) => {
    console.log({ ...err });
  });

const renderLayout = (list) => {
  var content = "";
  for (let i = 0; i < list.length; i++) {
    let playerItems = list[i];
    content += `
    <div class="card-item">
        <div class="item-img">
            <img src="${playerItems.avatar}" alt="">
        </div>
        <div class="item-text">
          <h3 class="name">${playerItems.name}</h3>
          <p class="position">${playerItems.position}</p>
          <div class="nation">
            <img src="${playerItems.nation}" alt="">
          </div>
          <span class="title--ovr">OVR: <span class="ovr">${
            playerItems.ovr
          }</span></span>
          <span class="title--sta">STA: <span class="sta">${
            playerItems.sta
          }</span></span>
          <p class="stars">${createStar(playerItems.rating)}</p>
        </div>
    </div>
    `;
  }
  document.getElementById("listPlayerContent").innerHTML = content;
};

const createStar = (rating) => {
  if (rating > 5) rating = 5;
  let content = "";
  for (let i = 0; i < rating; i++) {
    content += `<i class="fa fa-star text-warning"></i>`;
  }
  for (let i = 0; i < 5 - rating; i++) {
    content += `<i class="far fa-star text-warning"></i>`;
  }
  return content;
};

const addPlayer = () => {
  var id = parseInt(document.getElementById("txtID").value);
  var name = document.getElementById("txtName").value;
  var avatar = document.getElementById("txtAvatar").value;
  var ovr = parseInt(document.getElementById("txtOvr").value);
  var stamina = parseInt(document.getElementById("txtStamina").value);
  var nation = document.getElementById("txtNation").value;
  var position = document.getElementById("txtPosition").value;
  var rating = parseInt(document.getElementById("txtRating").value);

  const newPlayer = new Player(
    id,
    name,
    avatar,
    ovr,
    stamina,
    nation,
    position,
    rating
  );

  axios({
    method: "POST",
    url: "https://5e9829e75eabe7001681bbfb.mockapi.io/player",
    data: newPlayer,
  })
    .then((res) => {
      console.log(res);
      resetField();
    })
    .catch((err) => {
      console.log({ ...err });
    });
};

const resetField = () => {
  document.getElementById("txtID").value = "";
  document.getElementById("txtName").value = "";
  document.getElementById("txtAvatar").value = "";
  document.getElementById("txtOvr").value = "";
  document.getElementById("txtStamina").value = "";
  document.getElementById("txtNation").value = "";
  document.getElementById("txtPosition").value = "";
  document.getElementById("txtRating").value = "";
  document.getElementById("close").click();
  renderLayout(playerList);
};
