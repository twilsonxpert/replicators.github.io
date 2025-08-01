let game = {
  replicators: {
    self: 1,
    workers: {
      count: 0,
      automateCost: {
        cost: 10000,
        resource: "iron",
      },
    },
  },
  resources: {
    iron: 0,
  },
  automation: {
    workers: false,
  },
};
function gather(resource) {
  game.resources[resource]++;
  drawUI();
}
function buildWorker() {
  if (game.resources.iron >= 10) {
    game.resources.iron -= 10;
    game.replicators.workers.count++;
    drawUI();
  }
}
function buyAutomate(type) {
  const rep = game.replicators[type];
  const res = game.resources[rep.automateCost.resource];
  if (res >= rep.automateCost.cost) {
    game.resources[rep.automateCost.resource] -= rep.automateCost.cost;
    game.automation[type] = true;
    drawUI();
  }
}
function gameloop() {
  updateResources();
  drawUI();
}
function updateResources() {
  game.resources.iron += game.replicators.workers.count;
  if (game.automation.workers && game.replicators.workers.count >= 10) {
    const buy = Math.floor(game.replicators.workers.count / 10);
    game.replicators.workers.count += buy;
    game.resources.iron -= buy * 10;
  }
}
function drawUI() {
  document.getElementById("iron").innerText = "Iron: " + game.resources.iron;
  document.getElementById("workernum").innerText =
    "Workers: " + game.replicators.workers.count;
  if (game.resources.iron >= 10) {
    document.getElementById("buildWorker").style = "";
    document.getElementById("buildWorker").removeAttribute("disabled");
  } else {
    document.getElementById("buildWorker").setAttribute("disabled", "");
  }
  if (
    game.resources.iron >= 10000 &&
    !game.automation.workers &&
    game.replicators.workers.count >= 10
  ) {
    document.getElementById("automateWorkers").style = "";
    document.getElementById("automateWorkers").removeAttribute("disabled");
  } else if (game.automation.workers) {
    document.getElementById("iron").style = "display: none";
    document.getElementById("gatheriron").style = "display: none";
    document.getElementById("buildWorker").style = "display: none";
    document.getElementById("automateWorkers").style = "display: none";
  } else {
    document.getElementById("automateWorkers").setAttribute("disabled", "");
  }
}
var timer = setInterval(gameloop, 1000);
