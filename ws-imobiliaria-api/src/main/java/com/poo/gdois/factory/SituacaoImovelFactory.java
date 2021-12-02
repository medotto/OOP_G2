package com.poo.gdois.factory;

import com.poo.gdois.dto.SituacaoImovelDto;
import com.poo.gdois.entity.SituacaoImovel;

public class SituacaoImovelFactory {

    public static SituacaoImovelDto createDtoFrom(SituacaoImovel entity) {
        return SituacaoImovelDto.builder()
                .id(entity.getId())
                .situacao(entity.getSituacao())
                .build();
    }

}
