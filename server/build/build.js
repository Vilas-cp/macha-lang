let node = {
    data: null,    next: null,};
function nodeMadu(data) {
    const node = {
        data: data,        next: null,    };
    return node;
}function some(abc) {
    console.log(abc + " Wow Fun");
}some(node.next);
let nodeList = [];
const head = nodeMadu(10);
let current = head;
for (let i = 0; i < 10; i++) {
    const newNode = nodeMadu(10 + 1 + i);
    current.next = newNode;
    current = newNode}current = head;
while (current.next !== null) {
    if (current.data < 15) {
        console.log("Chiku Number " + current.data);
    }    else {
        console.log("Dodu Number " + current.data);
    }    current = current.next;
};