let node = {
    data: null,    next: null,};
function nodeMadu(data) {
    const node = {
        data: data,        next: null,    };
    return node;
}function some(abc) {
    console.log(abc + " Wow Fun");
}some("Hello");
let nodeList = [];
const head = nodeMadu(10);
let current = head;
for (let i = 0; i < 10; i++) {
    const newNode = nodeMadu(20 + 1 + i);
    current.next = newNode;
    current = newNode}current = head;
while (current.next !== null) {
    console.log(current.data);
    current = current.next;
};