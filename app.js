let autos = require('./autos');
let unaPersona = {
    nombre: 'Juan',
    capacidadDePagoEnCuotas: 20000,
    capacidadDePagoTotal: 100000
    }

const concesionaria = {
    autos : autos,
    buscarAuto : function(patenteBuscar){
        let autoEncontrado = this.autos.find( auto => auto.patente === patenteBuscar);
        return autoEncontrado || null;
    },
    venderAuto : function(patenteBuscar){
        let autoVendido = this.buscarAuto(patenteBuscar);
        autoVendido.vendido = true;
    },
    autosParaLaVenta : function(){
        return this.autos.filter(auto => auto.vendido !== true)
    },
    autosNuevos : function(){
        let autosNuevos = this.autosParaLaVenta();
        return autosNuevos.filter(auto => auto.km < 100);
    },
    listaDeVentas : function(){
        let listaPreciosVenta = [];
        this.autos.forEach(auto => {
            if(auto.vendido){
                listaPreciosVenta.push(auto.precio);
            }
        });
        return listaPreciosVenta;
    },
    totalDeVentas: function(){
        let valorTotalVentas = this.listaDeVentas();
        if(valorTotalVentas.length > 0){
            return valorTotalVentas.reduce((acum, next) => acum + next);
        }
        return 0;
    },
    puedeComprar : function(auto, persona){
        if((auto.precio > persona.capacidadDePagoTotal) || (persona.capacidadDePagoEnCuotas < (auto.precio/auto.cuotas))){
            return false
        }
        return true
    },
    autosQuePuedeComprar : function(persona){
        let autosPuedeComprar = [];
        let autosParaVenta = this.autosParaLaVenta();
        autosParaVenta.forEach(auto => {
            if(this.puedeComprar(auto, persona)){
                autosPuedeComprar.push(auto)
            }
            
        });
        return autosPuedeComprar;
    }
}
// console.log(concesionaria.buscarAuto('APL123'));
// console.log(concesionaria.venderAuto('APL123'));
// console.log('autosParaLaVenta',concesionaria.autosParaLaVenta());
// console.log('autosNuevos',concesionaria.autosNuevos());
// console.log('listaDeVentas',concesionaria.listaDeVentas());
// console.log('totalDeVentas',concesionaria.totalDeVentas());
// console.log('puedeComprar',concesionaria.puedeComprar(autos[1], unaPersona));
console.log('autosQuePuedeComprar',concesionaria.autosQuePuedeComprar(unaPersona));
// console.log('autos Completo',concesionaria.autos);
