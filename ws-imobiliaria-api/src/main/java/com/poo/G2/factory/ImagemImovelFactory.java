package com.poo.G2.factory;

import com.poo.G2.entity.ImagemImovel;

import java.util.Base64;

public class ImagemImovelFactory {

    public static ImagemImovel createFrom(String imagemBase64, Long idImovel) {
        byte[] imagem = Base64.getDecoder().decode(imagemBase64.getBytes());
        return ImagemImovel.builder()
                .idImovel(idImovel)
                .blobImagem(imagem)
                .build();
    }

}
