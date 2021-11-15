package com.poo.G2.factory;

import com.poo.G2.dto.SituacaoImovelDto;
import com.poo.G2.entity.SituacaoImovel;

public class SituacaoImovelFactory {

    public static SituacaoImovelDto createDtoFrom(SituacaoImovel entity) {
        return SituacaoImovelDto.builder()
                .id(entity.getId())
                .situacao(entity.getSituacao())
                .build();
    }

}
