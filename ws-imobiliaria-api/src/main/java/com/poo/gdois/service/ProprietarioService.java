package com.poo.gdois.service;

import com.poo.gdois.dto.ProprietarioDto;

import java.util.List;

public interface ProprietarioService {

    void create(ProprietarioDto dto);

    void update(ProprietarioDto dto);

    ProprietarioDto findOneById(Long id);

    List<ProprietarioDto> findAll();

    void delete(Long id);

}
