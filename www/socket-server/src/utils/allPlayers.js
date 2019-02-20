// define a Queue constructor to be used in our AllPlayers class

function Queue() {
  const storage = [];
  this.empty = () => !storage.length;
  this.enqueue = player => storage.push(player);
  this.dequeue = () => storage.shift();
  this.kick = (socketId) => {
    const players = storage.length;
    for (let i = 0; i < players; i += 1) {
      if (players[i].socketId === socketId) {
        return storage.splice(i, 1);
      }
    }
    return 'disconnected player not in queue';
  };
  this.front = () => {
    if (!this.empty()) {
      return 'the queue is empty';
    }
    return storage[0];
  };
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
    return this.queue.enqueue(player);
  }

  deQ() {
    return this.queue.dequeue();
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

  get playerOne() {
    return this.players[1];
  }

  get playerTwo() {
    return this.players[2];
  }

  get currentPlayers() {
    return this.players;
  }

  set addPlayer(newPlayer) {
    const p1 = this.playerOne;
    const p2 = this.playerTwo;
    if (!p1) {
      this.players[1] = newPlayer;
      return this.currentPlayers;
    }
    if (!p2) {
      this.players[2] = newPlayer;
      return this.currentPlayers;
    }
    this.enQ(newPlayer);
    return 'player spots full, new player added to the queue';
  }

  set removePlayer(player) {
    const { playerNumber } = player;
    this.players[playerNumber] = null;
  }

  set recyclePlayer(player) {
    this.removePlayer = player;
    this.cyclePQ();
    this.addPlayer = player;
    return this.currentPlayers;
  }

  cyclePQ() {
    if (!this.qEmpty()) {
      const p1 = this.playerOne;
      const p2 = this.playerTwo;
      if (!p1 || !p2) {
        this.addPlayer = this.deQ();
      }
    }
  }

  removeDisconnector(disconnectorSocketId) {
    // get the current players
    const p1 = this.playerOne;
    const p2 = this.playerTwo;

    // remove the disconnector if she was a player
    if (p1.socketId === disconnectorSocketId) {
      this.removePlayer = 1;
    }
    if (p2.socketId === disconnectorSocketId) {
      this.removePlayer = 2;
    }

    // remove the disconnector from the queue
    this.kick(disconnectorSocketId);
  }

  bothPlayersReady() {
    return this.playerOne && this.playerTwo;
  }
}

module.exports = AllPlayers;
