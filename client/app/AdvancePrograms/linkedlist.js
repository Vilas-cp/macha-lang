var code1 =`irlli node = {
    data: khali,
    next: khali,
};

kelsa nodeMadu(data) {
    irlli node = {
        data: data,
        next: khali,
    };
    kodu node;
}

idu idu1 = '90';
idu nodeList = [];
irlli head = nodeMadu(10);
let current = head;

allivaragu (idu i = 0; i < 10; i++) {
    irlli newNode = nodeMadu(20 + 1 + i);
    current.next = newNode;
    current = newNode
}

current = head;
macha.helu("[ ");
allitanka (current.next !== khali) {
    macha.helu(current.data + " ,");
    current = current.next;
}
macha.helu(" ]");`;
export default code1;