import * as Types from '../types';

const initialState = {
    filters: {
        withPhotos: (property) => property.imagemImovelDtoList.length > 0,
        withPriceRange: (property, min, max) => property.preco >= min && property.preco <= max
    },
    status: {
        withPhotos: false,
        withPriceRange: false
    }
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
        default:
            return { ...state };
    }
};

export default FilterReducer;