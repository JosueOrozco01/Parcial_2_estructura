export class NodeRBT {
    private code: number;
    private name: string;
    private price: number;
    private father!: NodeRBT; // NodeRBT* es un apuntador
    private leftChild!: NodeRBT; // "!" significa que el atributo no será inicializado en el constructor ...
    private rightChild!: NodeRBT; // ... pero que sí se inicializará en otra parte
    private color: string;

    constructor(price: number, name: string, code: number,  isLeaf?: boolean) {
        this.price = price;
        this.name = name;
        this.code = code;
        this.color = "RED";
        if (isLeaf)
            this.color = "BLACK";
    }

    public getCoode(): number {
        return this.code;
    }

    public getname(): string {
        return this.name;
    }

    public getPrice(): number {
        return this.price;
    }

    public setFather(newFather: NodeRBT): void {
        this.father = newFather;
    }

    public getFather(): NodeRBT {
        return this.father;
    }

    public setLeftChild(newChild: NodeRBT): void {
        this.leftChild = newChild;
    }

    public getLeftChild(): NodeRBT {
        return this.leftChild;
    }

    public setRightChild(newChild: NodeRBT): void {
        this.rightChild = newChild;
    }

    public getRightChild(): NodeRBT {
        return this.rightChild;
    }

    public setNodeAsRed(): void {
        this.color = "RED";
    }

    public setNodeAsBlack(): void {
        this.color = "BLACK";
    }

    public getColor(): string {
        return this.color;
    }

    public setColor(newColor: string): void {
        if (newColor === "RED" || newColor === "BLACK") {
            this.color = newColor;
        } else {
            console.log("Color invalido")
        }
    }
}
