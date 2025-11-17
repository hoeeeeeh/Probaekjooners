function solution(nodeinfo) {
    nodeinfo = nodeinfo
        .map((value, idx) => [...value, idx + 1])
        .sort((a, b) => a[1] === b[1] ? a[0] - b[0] : b[1] - a[1]);

    const nodes = nodeinfo.map(([x, y, idx]) => new Node(x, y, idx));
    const tree = new Tree();
    
    for (const node of nodes) {
        tree.append(node);
    }

    function preOrder(parent, preOrderList) {
        if(parent === null) {
            return;
        }
        
        preOrderList.push(parent.idx);
        
        if(parent.leftChild !== null) {
            preOrder(parent.leftChild, preOrderList);
        }
    
        if(parent.rightChild !== null) {
            preOrder(parent.rightChild, preOrderList);
        }
        
        return preOrderList;
    }
    
    function postOrder(parent, postOrderList) {
        function doPostOrder(parent, postOrderList) {
            if(parent === null) {
                return;
            }

            postOrderList.push(parent.idx);

            if(parent.rightChild !== null) {
                doPostOrder(parent.rightChild, postOrderList);
            }

            if(parent.leftChild !== null) {
                doPostOrder(parent.leftChild, postOrderList);
            }
            
            return postOrderList;
        }
        
        return doPostOrder(parent, postOrderList).reverse();
    }
    
    return [preOrder(tree.root, []), postOrder(tree.root, [])];
}

class Tree {
    root = null;
    
    append(child) {
        if(this.root === null) {
            this.root = child;
            return true;
        }
        
        let cur = this.root;
        while(cur !== null) {
            cur = cur.append(child);
        }
    }
}

class Node {
    idx = -1;
    leftChild = null;
    rightChild = null;

    constructor(x, y, idx) {
        this.idx = idx;
        this.x = x;
        this.y = y;
    }

    append(child) {
        if (child.x < this.x) {
            if(this.leftChild === null) {
                this.leftChild = child;
                return null;
            }
            return this.leftChild;
        } else {
            if(this.rightChild === null) {
                this.rightChild = child;
                return null;
            }
            return this.rightChild;
        }
    }
}
