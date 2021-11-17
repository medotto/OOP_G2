package com.poo.gdois.service.impl;

import com.poo.gdois.dto.SituacaoImovelDto;
import com.poo.gdois.entity.SituacaoImovel;
import com.poo.gdois.mapper.Mapper;
import com.poo.gdois.repository.SituacaoImovelRepository;
import com.poo.gdois.service.SituacaoImovelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class SituacaoImovelServiceImpl implements SituacaoImovelService {

    private static final Class<SituacaoImovel> ENTITY_CLASS = SituacaoImovel.class;
    private static final Class<SituacaoImovelDto> DTO_CLASS = SituacaoImovelDto.class;

    @Autowired
    private SituacaoImovelRepository situacaoImovelRepository;

    @Autowired
    private Mapper<SituacaoImovelDto, SituacaoImovel> mapper;

    @Override
    public List<SituacaoImovelDto> findAll() {
        List<SituacaoImovel> situacaoImovelList = situacaoImovelRepository.findAll();
        return mapper.mapToDtoList(situacaoImovelList, DTO_CLASS);
    }

}
