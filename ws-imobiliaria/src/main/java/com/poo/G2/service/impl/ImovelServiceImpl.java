package com.poo.G2.service.impl;

import com.poo.G2.dto.ImovelDto;
import com.poo.G2.entity.Imovel;
import com.poo.G2.factory.ImagemImovelFactory;
import com.poo.G2.mapper.Mapper;
import com.poo.G2.repository.ImagemImovelRepository;
import com.poo.G2.repository.ImovelRepository;
import com.poo.G2.service.ImovelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
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
    public ImovelDto create(ImovelDto dto) {
        Imovel entity = mapper.mapToEntity(dto, ENTITY_CLASS);

        entity.setDtCadastro(LocalDateTime.now());
        entity = imovelRepository.save(entity);

        long idImovel = entity.getId();
        var imagens = dto.getImagens()
                .stream()
                .map(img -> ImagemImovelFactory.createFrom(img, idImovel))
                .collect(Collectors.toList());
        imagemImovelRepository.saveAll(imagens);

        return mapper.mapToDto(entity, DTO_CLASS);
    }

    @Override
    public List<ImovelDto> findAll() {
        var imoveis = imovelRepository.findAll();
        return mapper.mapToDtoList(imoveis, DTO_CLASS);
    }

    @Override
    public ImovelDto findById(Long id) {
        Optional<Imovel> imovelOpt = imovelRepository.findById(id);
        return imovelOpt
                .map(imovel -> mapper.mapToDto(imovel, DTO_CLASS))
                .orElse(null);
    }

    private String bytesToBase64(byte[] bytes) {
        return Base64.getEncoder().encodeToString(bytes);
    }

}
