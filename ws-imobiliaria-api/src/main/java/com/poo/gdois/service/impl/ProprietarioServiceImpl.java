package com.poo.gdois.service.impl;

import com.poo.gdois.dto.ProprietarioDto;
import com.poo.gdois.entity.Proprietario;
import com.poo.gdois.mapper.Mapper;
import com.poo.gdois.repository.ProprietarioRepository;
import com.poo.gdois.service.ProprietarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProprietarioServiceImpl implements ProprietarioService {

    private static final Class<Proprietario> ENTITY_CLASS = Proprietario.class;
    private static final Class<ProprietarioDto> DTO_CLASS = ProprietarioDto.class;

    @Autowired
    private ProprietarioRepository proprietarioRepository;

    @Autowired
    private Mapper<ProprietarioDto, Proprietario> mapper;

    @Override
    public ProprietarioDto create(ProprietarioDto dto) {
        Proprietario entity = mapper.mapToEntity(dto, ENTITY_CLASS);
        entity = proprietarioRepository.save(entity);
        return mapper.mapToDto(entity, DTO_CLASS);
    }

    @Override
    public List<ProprietarioDto> findAll() {
        var proprietarios = proprietarioRepository.findAll();
        return mapper.mapToDtoList(proprietarios, DTO_CLASS);
    }

}
