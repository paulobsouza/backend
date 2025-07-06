let db = {
  alimentos: [],
  metaDiaria: null,
};
let currentId = 1;

class Alimento {
  constructor(id, nome, carboidratos, proteinas, gorduras) {
    this.id = id;
    this.nome = nome;
    this.carboidratos = parseFloat(carboidratos);
    this.proteinas = parseFloat(proteinas);
    this.gorduras = parseFloat(gorduras);
  }

  calcularCalorias() {
    return this.carboidratos * 4 + this.proteinas * 4 + this.gorduras * 9;
  }
}

const AlimentoModel = {
  getState: () => {
    const caloriasConsumidas = db.alimentos.reduce((total, alimento) => {
      const instanciaAlimento = new Alimento(
        alimento.id,
        alimento.nome,
        alimento.carboidratos,
        alimento.proteinas,
        alimento.gorduras
      );
      return total + instanciaAlimento.calcularCalorias();
    }, 0);

    const alimentosComCalorias = db.alimentos.map((a) => {
      const instanciaAlimento = new Alimento(
        a.id,
        a.nome,
        a.carboidratos,
        a.proteinas,
        a.gorduras
      );
      return { ...a, calorias: instanciaAlimento.calcularCalorias() };
    });

    return {
      alimentos: alimentosComCalorias,
      metaDiaria: db.metaDiaria,
      resumo: {
        consumidas: caloriasConsumidas,
        restantes: db.metaDiaria ? db.metaDiaria.total - caloriasConsumidas : 0,
      },
    };
  },

  createAlimento: (data) => {
    const novoAlimento = new Alimento(
      currentId++,
      data.nome,
      data.carboidratos,
      data.proteinas,
      data.gorduras
    );
    db.alimentos.push(novoAlimento);
    return novoAlimento;
  },

  deleteAlimento: (id) => {
    const index = db.alimentos.findIndex((a) => a.id === id);
    if (index === -1) return false;
    db.alimentos.splice(index, 1);
    return true;
  },

  setMetaDiaria: (peso, objetivo) => {
    peso = parseFloat(peso);
    let macros = { carboidratos: 0, proteinas: 0, gorduras: 0 };

    const nomeObjetivo =
      objetivo === "ganho-massa" ? "Ganho de Massa" : "Perda de Peso";

    if (objetivo === "ganho-massa") {
      macros.carboidratos = 4 * peso;
      macros.proteinas = 2 * peso;
      macros.gorduras = 1 * peso;
    } else if (objetivo === "perda-peso") {
      macros.carboidratos = 3.5 * peso;
      macros.proteinas = 2.5 * peso;
      macros.gorduras = 0.5 * peso;
    } else {
      return null;
    }

    const totalCalorias =
      macros.carboidratos * 4 + macros.proteinas * 4 + macros.gorduras * 9;

    db.metaDiaria = {
      total: totalCalorias,
      objetivo: nomeObjetivo,
      macros: macros,
    };

    return db.metaDiaria;
  },
};

module.exports = AlimentoModel;
