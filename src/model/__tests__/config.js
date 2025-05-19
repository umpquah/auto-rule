const config = {
  stageA: {
    title: "Stage A",
    parameters: [
      {
        secondsMultiplier: 60,
        baseAmount: 4,
        treat: "ice cream"
      },
      {
        count: "=range(1, 3)",
      },
      {
        quantity: "= baseAmount * count",
        rewardUnits: "scoops",
      },
    ],
    resolution: {
      announce: "=~ You will get ${count} ${rewardUnits} of ${treat}.",
      action: {
        content: "=~ You may eat your ${treat} before continuing.",
        confirm: "Done",
      },
      clearBeforeNext: true,
      next: "wait",
    },
  },
};

test("test config", () => {

})
