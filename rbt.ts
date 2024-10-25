import { NodeRBT } from "./node_rbt";

export class RBTree {
    private root: NodeRBT;
    private leaf: NodeRBT;

    constructor() {
        this.leaf = new NodeRBT(0, "Inicial", 0,  true);
        this.root = this.leaf;
    }

    private fixInsert(testNode: NodeRBT): void {
        while (testNode !== this.root && testNode.getFather().getColor() == "RED") {
            // si el padre de testNode está en el hijo izquierdo del abuelo de testNode
            if (testNode.getFather() === testNode.getFather().getFather().getLeftChild()) {
                // significa que el tío es el hijo derecho del abuelo de testNode
                let uncle: NodeRBT = testNode.getFather().getFather().getRightChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    // comprobamos si testNode es hijo izquierdo
                    if (testNode === testNode.getFather().getRightChild()) {
                        testNode = testNode.getFather();
                        this.leftRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.rightRotate(testNode.getFather().getFather());
                }
            } else {
                // significa que el tío es el hijo izquierdo del abuelo de testNode
                let uncle: NodeRBT = testNode.getFather().getFather().getLeftChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    // comprobamos si testNode es hijo izquierdo
                    if (testNode === testNode.getFather().getLeftChild()) {
                        testNode = testNode.getFather();
                        this.rightRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.leftRotate(testNode.getFather().getFather());
                }
            }
        }
        this.root.setNodeAsBlack();
    }

    private leftRotate(x: NodeRBT): void {
        let y: NodeRBT = x.getRightChild();
        x.setRightChild(y.getLeftChild());
        if (y.getLeftChild() != this.leaf)
            y.getLeftChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() == this.leaf)
            this.root = y;
        else if (x === x.getFather().getLeftChild())
            x.getFather().setLeftChild(y);
        else
            x.getFather().setRightChild(y);
        y.setLeftChild(x);
        x.setFather(y);
    }

    private rightRotate(x: NodeRBT): void {
        let y: NodeRBT = x.getLeftChild();
        x.setLeftChild(y.getRightChild());
        if (y.getRightChild() != this.leaf)
            y.getRightChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() == this.leaf)
            this.root = y;
        else if (x === x.getFather().getRightChild())
            x.getFather().setRightChild(y);
        else
            x.getFather().setLeftChild(y);
        y.setRightChild(x);
        x.setFather(y);
    }

    private inOrder(nodo: NodeRBT): void {
        if (nodo.getLeftChild() !== this.leaf)
            this.inOrder(nodo.getLeftChild());
        console.log(nodo.getPrice(), nodo.getCoode(), nodo.getname());
        if (nodo?.getRightChild() !== this.leaf)
            this.inOrder(nodo.getRightChild());
    }

    public printAll1(): void {
        this.inOrder(this.root);
    }

    private preorder(node: NodeRBT): void {
        if (node === this.leaf) return;
        console.log(node.getPrice(), node.getCoode(), node.getname()); 
        this.preorder(node.getLeftChild()); 
        this.preorder(node.getRightChild()); 
    }

    public printAll2(): void {
        this.preorder(this.root)
    }

    private postorder(node: NodeRBT): void {
        if (node === this.leaf) return;
        this.postorder(node.getLeftChild()); 
        this.postorder(node.getRightChild()); 
        console.log(node.getPrice(), node.getCoode(), node.getname());
    }

    public printAll3(): void {
        this.postorder(this.root)
    }

    public insert(code: number, name: string, price: number): void {
        // Inserción normal de BST
        let newNode: NodeRBT = new NodeRBT(code, name, price);
        let parent: NodeRBT = this.leaf;
        let current: NodeRBT = this.root;
        // Los RBT por la propiedad 5 inserta un nodo hoja a los hijos izquierdo y derecho
        newNode.setLeftChild(this.leaf);
        newNode.setRightChild(this.leaf);
        // Continua inserción normal de BST
        while (current !== this.leaf) {
            parent = current;
            if (newNode.getPrice() < current.getPrice()) {
                current = current.getLeftChild();
            } else {
                current = current.getRightChild();
            }
        }
        newNode.setFather(parent);
        if (parent === this.leaf) {
            this.root = newNode;
        } else if (newNode.getPrice() < parent.getPrice()) {
            parent.setLeftChild(newNode);
        } else {
            parent.setRightChild(newNode);
        }

        // Propiedades del RBT
        if (newNode.getFather() === this.leaf) {
            newNode.setNodeAsBlack()
            return;
        }
        if (newNode.getFather().getFather() == this.leaf)
            return;
        // corregir inserción
        this.fixInsert(newNode);
    }

    public searchRecursivee(dataToSearch: number,node: NodeRBT = this.root): number {
        if (node === this.leaf) {
            return -1;  
        }
        if (node.getPrice() === dataToSearch) {
            return node.getPrice();  
        }
        return dataToSearch < node.getPrice() ? this.searchRecursivee( dataToSearch,node.getLeftChild()) : this.searchRecursivee( dataToSearch,node.getRightChild());
    }

    public searchRecursivee2(dataToSearch: number,node: NodeRBT = this.root): number {
        if (node === null) return -1;  
        
        return node.getPrice() === dataToSearch ? node.getPrice(): dataToSearch < node.getPrice() ? 
        this.searchRecursivee2( dataToSearch,node.getLeftChild()) : 
        this.searchRecursivee2( dataToSearch,node.getRightChild());
    }

    public delete(dataToDelete: number): void {
    let nodeToDelete = this.findNode(dataToDelete, this.root);

    if (nodeToDelete === null) {
        console.log("El número no se encontró.");
        return;
    }

    this.deleteNode(nodeToDelete);
}

    private findNode(data: number, current: NodeRBT | null): NodeRBT | null {
        if (current === this.leaf || current === null) return null;

        if (data === current.getPrice()) return current;
        if (data < current.getPrice()) return this.findNode(data, current.getLeftChild());
        else return this.findNode(data, current.getRightChild());
    }

    private deleteNode(node: NodeRBT): void {
        let y = node;
        let originalColor = y.getColor();
        let x: NodeRBT;

        if (node.getLeftChild() === this.leaf) {
            x = node.getRightChild();
            this.transplant(node, node.getRightChild());
        } else if (node.getRightChild() === this.leaf) {
            x = node.getLeftChild();
            this.transplant(node, node.getLeftChild());
        } else {
            y = this.minimum(node.getRightChild());
            originalColor = y.getColor();
            x = y.getRightChild();
            if (y.getFather() === node) {
                x.setFather(y);
            } else {
                this.transplant(y, y.getRightChild());
                y.setRightChild(node.getRightChild());
                y.getRightChild().setFather(y);
            }
            this.transplant(node, y);
            y.setLeftChild(node.getLeftChild());
            y.getLeftChild().setFather(y);
            y.setNodeAsBlack();
        }

        if (originalColor === "BLACK") {
            this.fixDelete(x);
        }
    }

    private transplant(u: NodeRBT, v: NodeRBT): void {
        if (u.getFather() === this.leaf) {
            this.root = v;
        } else if (u === u.getFather().getLeftChild()) {
            u.getFather().setLeftChild(v);
        } else {
            u.getFather().setRightChild(v);
        }
        v.setFather(u.getFather());
    }

    private minimum(node: NodeRBT): NodeRBT {
        while (node.getLeftChild() !== this.leaf) {
            node = node.getLeftChild();
        }
        return node;
    }

    private fixDelete(x: NodeRBT): void {
        while (x !== this.root && x.getColor() === "RED") {
            if (x === x.getFather().getLeftChild()) {
                let w = x.getFather().getRightChild();
                if (w.getColor() === "RED") {
                    w.setNodeAsBlack();
                    x.getFather().setNodeAsRed();
                    this.leftRotate(x.getFather());
                    w = x.getFather().getRightChild();
                }
                if (w.getLeftChild().getColor() === "RED" && w.getRightChild().getColor() === "RED") {
                    w.setNodeAsRed();
                    x = x.getFather();
                } else {
                    if (w.getRightChild().getColor() === "RED") {
                        w.getLeftChild().setNodeAsBlack();
                        w.setNodeAsRed();
                        this.rightRotate(w);
                        w = x.getFather().getRightChild();
                    }
                    w.setColor(x.getFather().getColor());
                    x.getFather().setNodeAsBlack();
                    w.getRightChild().setNodeAsBlack();
                    this.leftRotate(x.getFather());
                    x = this.root;
                }
            } else {
                let w = x.getFather().getLeftChild();
                if (w.getColor() === "RED") {
                    w.setNodeAsBlack();
                    x.getFather().setNodeAsRed();
                    this.rightRotate(x.getFather());
                    w = x.getFather().getLeftChild();
                }
                if (w.getRightChild().getColor() === "RED" && w.getLeftChild().getColor() === "RED") {
                    w.setNodeAsRed();
                    x = x.getFather();
                } else {
                    if (w.getLeftChild().getColor() === "RED") {
                        w.getRightChild().setNodeAsBlack();
                        w.setNodeAsRed();
                        this.leftRotate(w);
                        w = x.getFather().getLeftChild();
                    }
                    w.setColor(x.getFather().getColor());
                    x.getFather().setNodeAsBlack();
                    w.getLeftChild().setNodeAsBlack();
                    this.rightRotate(x.getFather());
                    x = this.root;
                }
            }
        }
        x.setNodeAsBlack();
    }

    public findProductWithMinPrice(node: NodeRBT = this.root): void {
        if (node === this.leaf) {
            console.log("No hay productos."); // Indica que no hay productos
            return;
        }
        while (node.getLeftChild() !== this.leaf) {
            node = node.getLeftChild();
        }
        console.log(`Precio más bajo: ${node.getPrice()}, Nombre: ${node.getname()}, Código: ${node.getCoode()}`);
    }

    
    public findProductWithMaxPrice(node: NodeRBT = this.root): number {
        if (node === this.leaf) {
            return -1; // Indica que no hay productos
        }
        while (node.getRightChild() !== this.leaf) {
            node = node.getRightChild();
        }
        console.log(`Precio más alto: ${node.getPrice()}, Nombre: ${node.getname()}, Código: ${node.getCoode()}`);
        return node.getPrice();
    }
    
    public findProductsInRange(minPrice: number, maxPrice: number, node: NodeRBT = this.root): void {
        if (node === this.leaf) {
            return; 
        }
    
        if (node.getPrice() >= minPrice && node.getPrice() <= maxPrice) {
            console.log(`Precio: ${node.getPrice()}, Nombre: ${node.getname()}, Código: ${node.getCoode()}`); 
        } else {
            console.log(`Nodo fuera de rango: Precio: ${node.getPrice()}`); 
        }
    

        this.findProductsInRange(minPrice, maxPrice, node.getLeftChild());

        this.findProductsInRange(minPrice, maxPrice, node.getRightChild());
    }
    


    
    
}



const myRBTree: RBTree = new RBTree();
myRBTree.insert(55, "Josue", 122);
myRBTree.insert(45, "Fernando", 11);
myRBTree.insert(12, "Orozco", 454);
myRBTree.insert(85, "Fernando", 465);
myRBTree.insert(44, "Orozco", 789);


console.log("Impresion de todo");
myRBTree.printAll1();
console.log("")

console.log("imprimir menor")
myRBTree.findProductWithMinPrice();
console.log("imprimir mayor")
myRBTree.findProductWithMaxPrice();
console.log("imprimir en rango")
myRBTree.findProductsInRange(12, 45);
console.log("eliminar")
myRBTree.delete(12)

console.log("Impresion de todo");
myRBTree.printAll1();
