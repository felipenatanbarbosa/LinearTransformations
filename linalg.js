class LinearAlgebra {

    transpose(a) {
        let c;
        
        if(a instanceof Vector) { 
            c = new Vector(a.dim)
            c.cols = a.rows
            c.rows = a.cols
    
            for(let i = 1; i <= c.dim; i++) {
                c.set(i, a.get(i))
            }
        }
    
        else if(a instanceof Matrix) {
            c = new Matrix(a.cols, a.rows)
            for(let i = 1; i <= c.rows; i++) {
                for(let j = 1; j <= c.cols; j++) {
                    c.set(i, j, a.get(j, i))
                }
            }
        } else {
            throw new Error("O parametro deve ser um objeto da classe matrix ou da classe vector")
        }
    
        return c
    
    }
    
    sum(a,b) {

        if(!(a instanceof Matrix) || !(b instanceof Matrix)) {
            throw new Error("Os parametros devem ser da classe matrix ou vector")
        }

        if(a.rows != b.rows || a.cols != b.cols) {
            throw new Error("As matrizes nao possuem a mesma dimensao")
        }

        let c
        if(a instanceof Vector && b instanceof Vector) {
            c = new Vector(a.dim)
            c.rows = a.rows
            c.cols = a.cols

            for(let i = 1; i <= a.rows; i++){ 
                c.set(i, a.get(i) + b.get(i))
            }
        } else if(a instanceof Matrix && b instanceof Matrix) {
            c = new Matrix(a.rows,a.cols)

            for(let i = 1; i <= a.rows; i++) {
                for(let j = 1; j <= a.cols;j++){
                    c.set(i, j, a.get(i, j) + b.get(i, j))
                }
            }   
        }
        return c

    }

    times(a,b) {
        if(!(b instanceof Matrix)) {
            throw new Error("Os parametros devem ser da classe matrix ou vector")
        }

        let c

        if(typeof(a) == "number") {
            console.log("A = NUMERO")
            if(b instanceof Vector) {
                c = new Vector(b.dim)
                c.rows = b.rows
                c.cols = b.cols

                for(let i = 1; i <= b.rows; i++){
                    c.set(i, a * b.get(i))
                }
            } else if (b instanceof Matrix) {
                c = new Matrix(b.rows, b.cols);

                for (let i = 1 ;i <= b.rows; i++){
                    for (let j = 1; j <= b.cols; j++){
                        c.set(i, j, a * b.get(i, j))
                    }
                }
            }
        } else {
            if(a.rows != b.rows || a.cols != b.cols){
                throw new Error("As matrizes nao possuem a mesma dimensao")
            }
            if(a instanceof Vector && b instanceof Vector){
                c = new Vector(a.dim)
                c.rows = a.rows
                c.cols = a.cols

                for(let i = 1; i <= a.rows; i++){
                    c.set(i, a.get(i) * b.get(i))
                }
            }
            else if(a instanceof Matrix && b instanceof Matrix){
                c = new Matrix(a.rows, a.cols)
                for(let i = 1; i <= a.rows; i++){
                    for(let j = 1; j <= a.cols; j++){
                        c.set(i, j, a.get(i, j) * b.get(i,j))
                    }
                }
            }
        }
        return c
    }
    dot(a,b) {
        if(!(a instanceof Matrix) || !(b instanceof Matrix)) {
            throw new Error("Os parametros devem ser da classe matrix ou vector")
        }

        if(a.cols != b.rows){
            throw new Error("A quantidade de linhas de A não são iguais a quantidade colunas de B")
        }

        let c

        if(a instanceof Vector && b instanceof Vector) {
            c = 0

            for(let i = 1; i <= a.dim; i++){
                c = c + a.get(i) * b.get(i)
            }
        } else {
            c = new Matrix(a.rows, b.cols)
            for(let i = 1; i <= a.rows; i++) {
                for(let j = 1; j <= b.cols; j++) {
                    for(let k = 1; k <= a.cols; k++) {
                        c.set(i, j, c.get(i, j) + a.get(i,k) * b.get(k,j))
                    }
                }
            }
        }
        return c
    }

    solve(a) {
        
        if(! a instanceof Matrix) {
            throw new Error("deve perterncer a classe Matrix.")
        }
        if(a.cols != a.rows + 1) {
            throw new Error("a matriz deve estar extendida.")
        }

        //let numPivot, mult, n
        // let c = new Matrix(a.rows, a.cols, a.values.slice())

        // for(var j = 1; j <= a.rows; j++) {
        //     for(var i = j + 1; i <= c.cols; j++) {
        //         numPivot = c.get(j, i)
        //         m = c.get(i, j)
        //         n = -1 / numPivot
        //     }
        // }

        //FUNCIONANDO INICIO

        // var c = new Matrix(a.rows, a.cols)

        // for(let i = 1; i <= a.rows; i++) {
        //     for(let j = 1; j <= a.cols; j++) {
        //         c.set(i, j, a.get(i, j))
        //     }
        // }

        // for(var i = 2; i < c.rows; i++) {
        //     //mult = c[i, 1] / c[1, 1]
        //     mult = c.get(i, 1) / c.get(1,1)

        //     for(var j = 1; j <= c.rows; j++) {
        //         //c[i, j] = c[i, j] - mult * c[1, j]
        //         c.set(i, j, c.get(i, j) - mult * c.get(1, j))
        //     }
            
        // }

        //FUNCIONANDO END

        // mult = 0

        // for(var i = 2; i < c.rows; i++) {
        //     mult = 1
        //     for(var j = 1; j <= c.rows; j++) {
        //         //c.set(1,2, 3)
        //         if(i > j && c.get(i, j) != 0) {
        //             //c.set(1,1, 2)
        //             // mult = c[i, j] / c[i - 1, j]
        //             mult = c.get(i, j) / c.get(i - 1, j)
                    
        //             // c[i, j] = c[i, j] - mult * c[i - 1, j]
        //             c.set(i, j, c.get(i, j) - mult * c.get(i - 1, j))
                
        //         }
        //     }
        // }

        let c = new Matrix(a.rows, a.cols)
        // let numPivot, m, n

        for(var i = 1; i <= a.rows; i++) {      //passar a matriz para C
            for(var j = 1; j <= a.cols; j++) {
                c.set(i, j, a.get(i, j))
            }
        }

        for(var j = 1; j <= c.cols -2; j++) { //1 zerar os termos da primeira 
            for(var i = j + 1; i <= c.rows; i++) { //linha [1, 2, 3, 0, -3, -6, 0, -6, -12]
                // let numPivot = c.get(j, j)
                let m = c.get(i, j)

                let n = -m / c.get(j, j)


                this.lineSwap(c, n, j, i)
            }
        }

        for(var j = c.cols - 1; j >= 2; j--) { //2 triangular superior
            for(var i = j - 1; i >= 1; i--) { // [1, 0, -1, 0, -3, -6, 0, -6, -12]
                let numPivot = c.get(j, j)
                let m = c.get(i, j)

                let n = -m / numPivot


                this.lineSwap(c, n, j, i)
            }
        }

        for(var j = 1; j <= c.cols - 1; j++) { //3
            let n = 1 / c.get(j, j)
            
            //TO-DO CALCULO LINHA INVERSA 
            this.calculoInverso(c, n, j)
        }

        let res = []

        for(var i = 1; i <= c.rows; i++) {
            res[i -1] = Math.round(c.get(i, c.cols))
        }

        return res

    }

    gauss(a) {
        if(a.cols < a.rows) {
            throw new Error("A matriz não é compatível com o sistema gaussiano.")
        }

        if(!a instanceof Matrix) {
            throw new Error("o objeto instanciado deve ser instancia de Matrix.")
        }

        let c = new Matrix(a.rows, a.cols)

        let multIndex, m

        for(var i = 1; i <= a.rows; i++) {      
            for(var j = 1; j <= a.cols; j++) {
                c.set(i, j, a.get(i, j))
            }
        }

        for(var j = 1; j <= c.cols - 1; j++) {
            for(var i = j + 1; i <= c.rows; i++) {
                multIndex = - c.get(i, j) / c.get(j, j)

                // let numPivot = c.get(j, j)
                let m = c.get(i, j)
                let n = -m / c.get(j, j)

                this.lineSwap(c, n, j, i)

            }
        }

        return c
    }

    lineSwap(a, mult, jAux, iAux) {
        for(var j = 1; j <= a.cols; j++) {
            a.set(iAux, j, (a.get(iAux, j) + (a.get(jAux, j) * mult)))
        }
    }

    calculoInverso(a, mult, iAux) {
        for(var j = 1; j <= a.cols; j++) {
            a.set(iAux, j, Math.round(mult * a.get(iAux, j)))
            if(a.get(iAux, j) == -0) {
                a.set(iAux, j, 0)
            }
        }
    }


    // lConst(a, k, i) {
    //     for (let j = 1; j <= a.cols; j++) {
    //         a.set(i, j, Math.round(k * a.get(i, j)))
    //         if(a.get(i, j)== -0){
    //             a.set(i,j,0)
    //         }
    //     }


    // }

    

}
