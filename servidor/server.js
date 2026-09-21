const express = require("express");
const patrimonios = require("../inventario.json");

const Criarpatrimonio = (req, res) => {
    if(req.body){
        patrimonios.push(req.body);
        res.send("Patrimônio atualizado, em Processamento");
    }else{
        res.send("Erro ao cadastrar o patrimônio");
    }
}

const Listarpatrimonio = (req, res) => {
    res.send(patrimonios);
}

const Buscarpatrimonio = (req, res) => {
    const id = req.params.id;
    let status = 0;
    let retorno;

    patrimonios.forEach((patrimonio) => {
        if(patrimonio.id == id){
            retorno = patrimonio;
            status = 1;
        }
    });

    if(status == 1){
        res.send(retorno);
    }else {
        res.status(404).send("Patrimonio nao encontrado");
    }
}

const Atualizarpatrimonio = (req, res) => {
    const id = req.params.id;
    const dados = req.body;
    let status = 0;

    patrimonios.forEach((patrimonio) => {
        if(patrimonio.id == id) {
            status = 1;
            patrimonio.item = dados.item;
            patrimonio.local = dados.local;
            patrimonio.dataRegistro = dados.dataRegistro;
            patrimonio.valor = dados.valor;
            patrimonio.patrimonio = dados.patrimonio;
        }
    });

    if(status == 1){
        res.send("Patrimonio atualizado com sucesso !");
    }else {
        res.status(404).send("Patrimonio não encontrado");
    }
}



const Excluirpatrimonio = (req, res) => {
    const id = req.params.id;
    let status = 0;

    patrimonios.forEach((patrimonio, indice) => {
        if(patrimonio.id == id){
            status = 1;
            patrimonios.splice(indice, 1);
        }
    });

    if(status == 1){
        res.send("Patrimônio excluido com sucesso");
    }else{
        res.status(404).send("Patrimônio não encontrado");
    }
}

const PORT = 3000;
const app = express();
app.use(express.urlencoded({}));

app.post("/", Criarpatrimonio);
app.get("/", Listarpatrimonio);
app.get("/:id", Buscarpatrimonio);
app.put("/:id", Atualizarpatrimonio);
app.delete("/:id", Excluirpatrimonio);

app.listen(PORT, () => {
    console.log(`Servidor http://127.0.0.1:${PORT}`);
});