package com.poo.gdois.service;

import com.poo.gdois.dto.ImovelDto;

import java.util.List;

public interface ImovelService {

    void create(ImovelDto dto);

    void update(ImovelDto dto);

    List<ImovelDto> findAll();

    ImovelDto findById(Long id);

    void deleteById(Long id);

}
