package com.poo.gdois.factory;

import com.poo.gdois.dto.ProprietarioDto;
import com.poo.gdois.entity.Proprietario;

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
