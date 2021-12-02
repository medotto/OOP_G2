import * as Types from '../types';

const initialState = {
    filters: {
        withPhotos: (property) => property.imagemImovelDtoList.length > 0,
        withPriceRange: (property, min, max) => property.preco >= min && property.preco <= max,
        withContact: (property, id) => property.proprietario.id === id
    },
    status: {
        withPhotos: false,
        withPriceRange: true,
        withContact: false
    },
    orderBy: { field: "preco", orientation: "asc" },
    priceRange: { min: 1000, max: 2000 }
};

const FilterReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_FILTERS:
            return {
                ...state,
                status: {
                    ...state.status,
                    ...action.payload
                }
            }
        case Types.SET_ORDER:
            return {
                ...state,
                orderBy: action.payload
            }
        case Types.SET_PRICE_RANGE:
            return {
                ...state,
                priceRange: action.payload
            }
        default:
            return { ...state };
    }
};

export default FilterReducer;