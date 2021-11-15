package com.poo.G2.factory;

import com.poo.G2.dto.ProprietarioDto;
import com.poo.G2.entity.Proprietario;

public class ProprietarioFactory {

    public static ProprietarioDto createDtoFrom(Proprietario entity) {
        return ProprietarioDto.builder()
                .id(entity.getId())
                .nome(entity.getNome())
                .email(entity.getEmail())
                .telefone(entity.getTelefone())
                .build();
    }

}
