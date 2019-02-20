// define a Queue constructor to be used in our AllPlayers class

function Queue() {
  const storage = [];
  // check if queue is empty
  this.empty = () => !storage.length;

  // add player
  this.enqueue = player => storage.push(player);

  // remove player
  this.dequeue = () => storage.shift();

  // number of players in queue
  this.count = () => storage.length;

  // replica queue with only players usernames
  this.players = () => storage.map(player => player.username);

  // remove player from queue wherever he is
  this.kick = (socketId) => {
    const players = storage.length;
    for (let i = 0; i < players; i += 1) {
      if (storage[i].socketId === socketId) {
        return storage.splice(i, 1);
      }
    }
    return 'disconnected player not in queue';
  };

  // show next in line
  this.front = () => {
    if (this.empty()) {
      return 'the queue is empty';
    }
    return storage[0];
  };

  // print all players in queue to console
  this.print = () => storage.forEach(player => console.log(player));
}


// define the Game class that has tools for gameplay

class AllPlayers {
  constructor() {
    // track current players

    this.players = {
      1: null,
      2: null,
    };

    // track players waiting
    this.queue = new Queue();
  }

  // methods for the queue

  qEmpty() {
    return this.queue.empty();
  }

  enQ(player) {
    // reset playerNumbers of previous players
    player.playerNumber = null;

    const { username, sessionId, socketId } = player;
    if (username && sessionId && socketId) {
      return this.queue.enqueue(player);
    }
    return 'username, sessionId, socketId are required';
  }

  deQ() {
    return this.queue.dequeue();
  }

  qCount() {
    return this.queue.count();
  }

  current() {
    return this.queue.players();
  }

  kick(disconnectorSocketId) {
    return this.queue.kick(disconnectorSocketId);
  }

  front() {
    return this.queue.front();
  }

  printQ() {
    this.queue.print();
  }

  // methods for players

  get getP1() {
    return this.players[1];
  }

  get getP2() {
    return this.players[2];
  }

  get currentPlayers() {
    return this.players;
  }

  set setP1(player) {
    this.players[1] = player;
  }

  set setP2(player) {
    this.players[2] = player;
  }

  set removePlayer(player) {
    const { playerNumber } = player;
    if (playerNumber === 1) {
      this.setP1 = null;
    }
    if (playerNumber === 2) {
      this.setP2 = null;
    }
  }

  addPlayersFromQ() {
    const p1 = this.getP1;
    const p2 = this.getP2;
    if (!p1 && !this.qEmpty()) {
      const player = this.deQ();
      player.playerNumber = 1;
      this.setP1 = player;
    }
    if (!p2 && !this.qEmpty()) {
      const player = this.deQ();
      player.playerNumber = 2;
      this.setP2 = player;
    }
  }

  cycle(loser) {
    if (!loser.playerNumber) {
      return 'loser object must have property playerNumber';
    }
    if (loser.playerNumber > 2 || loser.playerNumber < 1) {
      return 'playerNumber MUST be 1 or 2';
    }
    const { playerNumber } = loser;
    let player;
    if (playerNumber === 1) {
      player = this.getP1;
    }
    if (playerNumber === 2) {
      player = this.getP2;
    }
    this.removePlayer = loser;
    this.enQ(player);
    this.addPlayersFromQ();
  }

  removeDisconnector(disconnector) {
    const { socketId } = disconnector;
    // get the current players
    const p1 = this.getP1;
    const p2 = this.getP2;

    // remove the disconnector if she was a player
    if (p1.socketId === socketId) {
      this.removePlayer = p1;
    }
    if (p2.socketId === socketId) {
      this.removePlayer = p2;
    }
    this.kick(socketId);
  }

  bothPlayersReady() {
    const p1 = this.getP1;
    const p2 = this.getP2;
    if (p1 && p2) {
      return true;
    }
    return false;
  }
}

module.exports = AllPlayers;
