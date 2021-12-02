package com.poo.gdois.service;

import com.poo.gdois.dto.SituacaoImovelDto;

import java.util.List;

public interface SituacaoImovelService {

    List<SituacaoImovelDto> findAll();

    void create(SituacaoImovelDto dto);

}
