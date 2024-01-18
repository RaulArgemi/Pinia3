import { groupBy } from "lodash";
import { defineStore } from "pinia";

export const useCartStore = defineStore("CartStore", {
    state: () => {
        return {
            items: [],
        };
    },
    actions: {
        addProducts(count, product) {
            count = parseInt(count);
            for (let i = 0; i < count; i++) {
                this.items.push({ ...product });
            }
        },

        setItemCount(articulo, cantidad) {
            const indice = this.items.findIndex((i) => i.nombre === articulo.nombre);

            if (indice !== -1) {
                const nuevaCantidad = parseInt(cantidad);

                if (nuevaCantidad > 0) {
                    const cantidadActual = this.items.filter((i) => i.nombre === articulo.nombre).length;
                    const diferencia = nuevaCantidad - cantidadActual;

                    if (diferencia > 0) {
                        for (let i = 0; i < diferencia; i++) {
                            this.items.push({ ...articulo });
                        }
                    } else if (diferencia < 0) {
                        for (let i = 0; i < Math.abs(diferencia); i++) {
                            const indiceArticulo = this.items.findIndex((i) => i.nombre === articulo.nombre);
                            this.items.splice(indiceArticulo, 1);
                        }
                    }
                } else {
                    this.items = this.items.filter((i) => i.nombre !== articulo.nombre);
                }
            }
        },

        removeItem(item) {
            this.items = this.items.filter((i) => i.name !== item);
        },
    },
    getters: {
        count: (state) => state.items.length,
        isEmpty: (state) => state.count === 0,
        grouped: (state) => groupBy(state.items, (item) => item.name),
        groupCount: (state) => (name) => state.grouped[name].length,
        total: (state) =>
            state.items.reduce(
                (accumulator, item) => accumulator + item.price,
                0
            ),
    },
});
