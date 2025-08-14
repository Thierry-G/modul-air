// Modul-Air Tamagoshi Game JS

const tamagoshi = {
    hunger: 50,
    happiness: 80,
    feed() {
        this.hunger = Math.max(0, this.hunger - 10);
    },
    play() {
        this.happiness = Math.min(100, this.happiness + 10);
    }
};

console.log('Tamagoshi game loaded');
