package com.poo.G2.service;

import com.poo.G2.dto.ImovelDto;

import java.util.List;

public interface ImovelService {

    void create(ImovelDto dto);

    void update(ImovelDto dto);

    List<ImovelDto> findAll();

    ImovelDto findById(Long id);

}
