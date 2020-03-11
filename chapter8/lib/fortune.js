var fortuneCookies = [
  "Conquer and Destroy!",
  "Who is They? And Why Me?",
  "I challenge you to a Pokemon Battle!",
  "Smell ya laters.",
  "Now is not the time nor place.",
  "Try again if it does work the first time.",
];

exports.getFortune = function(){
  var idx = Math.floor(Math.random() * fortuneCookies.length);
  return fortuneCookies[idx];
};
