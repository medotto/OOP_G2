package com.poo.G2.factory;

import com.poo.G2.dto.ImagemImovelDto;
import com.poo.G2.dto.ImovelDto;
import com.poo.G2.entity.ImagemImovel;
import com.poo.G2.entity.Imovel;
import com.poo.G2.entity.Proprietario;
import com.poo.G2.entity.SituacaoImovel;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class ImovelFactory {

    public static Imovel createEntityFrom(ImovelDto dto) {
        List<ImagemImovel> imagens = null;
        if(Objects.nonNull(dto.getImagemImovelDtoList()) && !dto.getImagemImovelDtoList().isEmpty()) {
            imagens = dto.getImagemImovelDtoList().stream()
                    .map(ImagemImovelFactory::createEntityFrom)
                    .collect(Collectors.toList());
        }
        return Imovel.builder()
                .id(dto.getId())
                .endereco(dto.getEndereco())
                .bairro(dto.getBairro())
                .cidade(dto.getCidade())
                .pais(dto.getPais())
                .preco(dto.getPreco())
                .owner(dto.getOwner())
                .situacao(
                        SituacaoImovel.builder()
                                .id(dto.getSituacao().getId())
                                .build()
                )
                .proprietario(
                        Proprietario.builder()
                                .id(dto.getProprietario().getId())
                                .build()
                )
                .imagemImovelList(imagens)
                .flFinanciado(dto.getFlFinanciado())
                .flProprietario(dto.getFlProprietario())
                .flNegociacao(dto.getFlNegociacao())
                .build();
    }

    public static ImovelDto createDtoFrom(Imovel entity) {
        List<ImagemImovelDto> imagens = null;
        if(Objects.nonNull(entity.getImagemImovelList())) {
            imagens = entity.getImagemImovelList().stream()
                    .map(ImagemImovelFactory::createDtoFrom)
                    .collect(Collectors.toList());
        }
        return ImovelDto.builder()
                .id(entity.getId())
                .endereco(entity.getEndereco())
                .bairro(entity.getBairro())
                .cidade(entity.getCidade())
                .pais(entity.getPais())
                .preco(entity.getPreco())
                .owner(entity.getOwner())
                .situacao(SituacaoImovelFactory.createDtoFrom(entity.getSituacao()))
                .proprietario(ProprietarioFactory.createDtoFrom(entity.getProprietario()))
                .imagemImovelDtoList(imagens)
                .flFinanciado(entity.getFlFinanciado())
                .flProprietario(entity.getFlProprietario())
                .flNegociacao(entity.getFlNegociacao())
                .build();
    }

}
