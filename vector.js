class Vector extends Matrix{
    constructor(dim, elements) {
        super(dim, 1, elements)
        this.dim = dim

        if(values == undefined){
            this.values = [];

            for (let i = 0; i < this.dim; i++){
                this.values.push(0);
            }

        } else if(values.length == this.dim){
            this.values = values;
        } else {
            throw "a quantidade de elementos nao corresponde ao tamanho do array."
        }
    }


    
    get(i) {
        if(this.rows > this.cols) {
            return super.get(i, 1)
        } else {
            return super.get(1, i)
        }
    }

    set(i, value) {
        if(this.rows > this.cols) {
            super.set(i, 1, value)
        } else {
            super.set(1, i, value)
        }
    }

}