package com.poo.G2.service;

import com.poo.G2.dto.ProprietarioDto;

import java.util.List;

public interface ProprietarioService {

    ProprietarioDto create(ProprietarioDto dto);

    List<ProprietarioDto> findAll();

}
