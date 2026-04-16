addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#138cdc",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

      upgrades: {

            11: {
                title: "P1 - Too Slow",
                description: "Gain 1 extra point per second.",
                cost: new Decimal(1),
                unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
               
            },
            12: {
                title: "P2 - Better Generation",
                description: "Double point gain.",
                cost: new Decimal(3),
                unlocked() { return hasUpgrade('p', 11) }, // The upgrade is only visible when this is true
               
            },
            13: {
                title: "P3 - Generic Enough?",
                description: "Prestige points boost points.",
                cost: new Decimal(6),
                unlocked() { return hasUpgrade('p', 12) }, // The upgrade is only visible when this is true
                effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let ret = player.p.points.add(1).pow(0.5)
                    if (ret.gte("1e400")) ret = ret.sqrt().times("1e200")
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            },
            14: {
                title: "P4 - Upgraded Base",
                description: "Prestige upgrades bought add to point gain.",
                cost: new Decimal(20),
                unlocked() { return hasUpgrade('p', 13) }, // The upgrade is only visible when this is true
                effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let ret = player.p.upgrades.length
                    return new Decimal(ret).pow(0.7);
                },
                effectDisplay() { return format(this.effect())+"" }, // Add formatting to the effect
            },
             15: {
                title: "P5 - Even Better Generation",
                description: "Triple point gain.",
                cost: new Decimal(50),
                unlocked() { return hasUpgrade('p', 14) }, // The upgrade is only visible when this is true
               
            },
        },
})
addLayer("a", {
    name: "addition", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#db5050",
    requires: new Decimal(3000), // Can be a function that takes requirement increases into account
    resource: "addition", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for addition", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

      effect() {
        let eff = player.a.points.add(1).pow(1.7).minus(1)
        return eff
      },
      effectDescription() {
        return "adding " +format(tmp.a.effect) + " to base point gain"
      },
})