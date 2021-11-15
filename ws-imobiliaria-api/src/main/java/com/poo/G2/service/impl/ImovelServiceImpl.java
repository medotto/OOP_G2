package com.poo.G2.service.impl;

import com.poo.G2.dto.ImovelDto;
import com.poo.G2.entity.ImagemImovel;
import com.poo.G2.entity.Imovel;
import com.poo.G2.factory.ImagemImovelFactory;
import com.poo.G2.factory.ImovelFactory;
import com.poo.G2.mapper.Mapper;
import com.poo.G2.repository.ImagemImovelRepository;
import com.poo.G2.repository.ImovelRepository;
import com.poo.G2.service.ImovelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ImovelServiceImpl implements ImovelService {

    private static final Class<Imovel> ENTITY_CLASS = Imovel.class;
    private static final Class<ImovelDto> DTO_CLASS = ImovelDto.class;

    @Autowired
    private ImovelRepository imovelRepository;

    @Autowired
    private ImagemImovelRepository imagemImovelRepository;

    @Autowired
    private Mapper<ImovelDto, Imovel> mapper;

    @Override
    public void create(ImovelDto dto) {
        Imovel entity = ImovelFactory.createEntityFrom(dto);

        entity.setDtCadastro(LocalDateTime.now());
        entity = imovelRepository.save(entity);

        final long idImovel = entity.getId();
        if(Objects.nonNull(entity.getImagemImovelList())) {
            entity.getImagemImovelList().forEach(imagem -> imagem.setIdImovel(idImovel));
            imagemImovelRepository.saveAll(entity.getImagemImovelList());
        }
    }

    @Override
    public void update(ImovelDto dto) {
        Imovel entity = ImovelFactory.createEntityFrom(dto);

        entity.setDtAlteracao(LocalDateTime.now());
        imovelRepository.save(entity);
    }

    @Override
    public List<ImovelDto> findAll() {
        var imoveis = imovelRepository.findAll();
        if(!imoveis.isEmpty()) {
            return imoveis.stream()
                    .map(ImovelFactory::createDtoFrom)
                    .collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    @Override
    public ImovelDto findById(Long id) {
        Optional<Imovel> imovelOpt = imovelRepository.findById(id);
        if(imovelOpt.isPresent()) {
            Imovel entity = imovelOpt.get();
            return ImovelFactory.createDtoFrom(entity);
        }
        return null;
    }

}
