// Knight ou Sorcerer - Guerreiro ou mago
// LittleMonster ou BigMonster

class Character {

    _life = 1; //Tanto o life quando o maxLife começam com valores "1" pois zerado os personagens estariam mortos xD.
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name) {
        this.name = name;
    }

    get life() {
        return this._life;
    }
    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife; //Por padrão, após levar um ataque que faça o personagem ir a 0 ou  abaixo de 0, o life fica setado para o minimo que é o próprio 0.
    }
}

//Classe com caracteristicas do guerreiro
class Knight extends Character {
    constructor(name) {
        super(name);
        this.life = 100;
        this.maxLife = this.life;
        this.attack = 10;
        this.defense = 8;
    }
}

//Classe com caracteristicas do mago
class Sorcerer extends Character {
    constructor(name) {
        super(name);
        this.life = 80;
        this.maxLife = this.life;
        this.attack = 15;
        this.defense = 3;
    }
}

//Classe com caracteristicas do little monster
class LittleMonster extends Character {
    constructor() {
        super('Little Monster');
        this.life = 40;
        this.maxLife = this.life;
        this.attack = 4;
        this.defense = 4;
    }
}

//Classe com caracteristicas do big monster
class BigMonster extends Character {
    constructor() {
        super('Big Monster');
        this.life = 120;
        this.maxLife = this.life;
        this.attack = 16;
        this.defense = 6;
    }
}

// --------------------------------------------------------------------------------------

//Classe cenário
class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) { //Nesse constructor precisamos passar os 4 valores: Os 2 lutadores e os seus respectivos elementos.
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;
    }

    start() {
        this.update();
        //TODO: Evento do botão de atacar.

        this.fighter1El.querySelector('.attackbutton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));

        this.fighter2El.querySelector('.attackbutton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
    }

    update() {
        //fighter 1
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100; //Calculo para a barra de vida do personagem.
        this.fighter1El.querySelector('.lifebar .bar').style.width = `${f1Pct}%`; //Pega o elemento, adiciona no seu estilo o 100% na largura, preenchendo assim toda a barra de vida.

        //fighter 2
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.lifebar .bar').style.width = `${f2Pct}%`;
    }

    doAttack(attacking, attacked) {
        if(attacking.life <= 0 || attacked.life <= 0){ //Condicional para identificar se um dos atacados chegou a 0 de hp, chegando no indice 0 o personagem está morto.
            this.log.addMessage(`Está morto`);
            return;
        }

        let attackFactor = (Math.random() * 2).toFixed(2); //Fator aletório para a força de ataque, utilizando o Math.random() * 2 permitimos que os valores aletórios seja no máximo o dobro do parametro padrão.
        let defenseFactor = (Math.random() * 2).toFixed(2);

        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor;

        if(actualAttack > actualDefense) { //Condicional para caso o  índice de ataque atual seja maior que o índice de defesa o atacado receba dano.
            attacked.life -= actualAttack; //Reduz a vida do atacado.
            this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`);
        } else {
            this.log.addMessage(`${attacked.name} conseguiu defender.`);
        }

        this.update(); //Atualiza o placar.
    }
}

class Log {
    list = [];

    constructor(listEl) {
        this.listEl = listEl;
    }

    addMessage(msg) {
        this.list.push(msg); //Adiciona na lista.
        this.render(); //Renderiza na lista.
    }

    render() { //Função para renderizar, transformar a lista em elementos visuais.
        this.listEl.innerHTML = ''; //Tudo que estiver na lista será limpo.

        for(let i in this.list) {
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`
        }
    }
}