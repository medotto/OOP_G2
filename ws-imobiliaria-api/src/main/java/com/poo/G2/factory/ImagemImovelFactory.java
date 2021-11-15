package com.poo.G2.factory;

import com.poo.G2.dto.ImagemImovelDto;
import com.poo.G2.entity.ImagemImovel;

import java.util.Base64;

public class ImagemImovelFactory {

    public static ImagemImovel createEntityFrom(ImagemImovelDto dto) {
        byte[] imagem = Base64.getDecoder().decode(dto.getImagemBase64().getBytes());
        return ImagemImovel.builder()
                .id(dto.getId())
                .idImovel(dto.getIdImovel())
                .blobImagem(imagem)
                .build();
    }

    public static ImagemImovelDto createDtoFrom(ImagemImovel entity) {
        String imagem = Base64.getEncoder().encodeToString(entity.getBlobImagem());
        return ImagemImovelDto.builder()
                .id(entity.getId())
                .idImovel(entity.getIdImovel())
                .imagemBase64(imagem)
                .build();
    }

}
