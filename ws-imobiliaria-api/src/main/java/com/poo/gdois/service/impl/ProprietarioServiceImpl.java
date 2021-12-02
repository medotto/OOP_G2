package com.poo.gdois.service.impl;

import com.poo.gdois.dto.ProprietarioDto;
import com.poo.gdois.entity.Proprietario;
import com.poo.gdois.mapper.Mapper;
import com.poo.gdois.repository.ProprietarioRepository;
import com.poo.gdois.service.ProprietarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class ProprietarioServiceImpl implements ProprietarioService {

    private static final Class<Proprietario> ENTITY_CLASS = Proprietario.class;
    private static final Class<ProprietarioDto> DTO_CLASS = ProprietarioDto.class;

    @Autowired
    private ProprietarioRepository proprietarioRepository;

    @Autowired
    private Mapper<ProprietarioDto, Proprietario> mapper;

    @Override
    public void create(ProprietarioDto dto) {
        Proprietario entity = mapper.mapToEntity(dto, ENTITY_CLASS);
        proprietarioRepository.save(entity);
    }

    @Override
    public void update(ProprietarioDto dto) {
        Proprietario entity = mapper.mapToEntity(dto, ENTITY_CLASS);
        proprietarioRepository.save(entity);
    }

    @Override
    public ProprietarioDto findOneById(Long id) {
        Optional<Proprietario> proprietarioOpt = proprietarioRepository.findById(id);
        if(proprietarioOpt.isEmpty()) {
            return null;
        }
        Proprietario proprietario = proprietarioOpt.get();
        return mapper.mapToDto(proprietario, DTO_CLASS);
    }

    @Override
    public List<ProprietarioDto> findAll() {
        var proprietarios = proprietarioRepository.findAll();
        return mapper.mapToDtoList(proprietarios, DTO_CLASS);
    }

    @Override
    public void delete(Long id) {
        try {
            proprietarioRepository.deleteById(id);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Não foi possível excluir o propietário!");
        }
    }

}
