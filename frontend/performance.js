// calculated the sum of upVotes
const posts = new Array(5000000)
  .fill(0)
  .map((el, i) => ({ id: i, upVotes: Math.floor(Math.random() * 120) }));

let sum = 0;
console.time("reduce");
sum = posts.reduce((s, p) => (s += p.upVotes), 0);
console.timeEnd("reduce");
sum = 0;
console.time("for loop");
for (let i = 0; i < posts.length; i++) {
  sum += posts[i].upVotes;
}
console.timeEnd("for loop");
sum = 0;
console.time("for each");
posts.forEach((element) => {
  sum += element.upVotes;
});
console.timeEnd("for each");
