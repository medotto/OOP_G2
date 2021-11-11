package com.poo.G2.service.impl;

import com.poo.G2.dto.ProprietarioDto;
import com.poo.G2.entity.Proprietario;
import com.poo.G2.mapper.Mapper;
import com.poo.G2.repository.ProprietarioRepository;
import com.poo.G2.service.ProprietarioService;
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
