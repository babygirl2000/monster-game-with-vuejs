function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      rounds: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBar() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBar() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    specialAttack() {
      return this.rounds % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // a draw
        this.winner = "draw";
      } else if (value <= 0) {
        //player lost
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // a draw
        this.winner = "draw";
      } else if (value <= 0) {
        //monster lost
        this.winner = "player";
      }
    },
  },

  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.rounds = 0;
      this.logMessages = [];
    },
    attackMonster() {
      this.rounds++;
      // math.random() * (max - min) + min,
      // outputs a number between 5 and 12
      const attackValue = randomNum(5, 12);
      this.monsterHealth -= attackValue;
      //adding log messages
      this.addLog("player", "attack", attackValue);
      // the monster attacks the player after 1 second
      setTimeout(this.attackPlayer, 1000);
    },
    attackPlayer() {
      const attackValue = randomNum(8, 15);
      this.playerHealth -= attackValue;
      this.addLog("monster", "attack", attackValue);
    },
    specialAttackMonster() {
      this.rounds++;
      const attackValue = randomNum(10, 25);
      this.monsterHealth -= attackValue;
      this.addLog("player", "special-attack", attackValue);
      setTimeout(this.attackPlayer, 1000);
    },
    healPlayer() {
      this.rounds++;
      const heal = randomNum(8, 20);
      if (this.playerHealth + this.heal > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += heal;
      }
      this.addLog("player", "heal", heal);
      setTimeout(this.attackPlayer, 1000);
    },
    surrender() {
      this.winner = "monster";
    },
    addLog(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
}).mount("#game");
