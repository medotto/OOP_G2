package com.poo.gdois.service;

import com.poo.gdois.dto.ProprietarioDto;

import java.util.List;

public interface ProprietarioService {

    ProprietarioDto create(ProprietarioDto dto);

    List<ProprietarioDto> findAll();

}
