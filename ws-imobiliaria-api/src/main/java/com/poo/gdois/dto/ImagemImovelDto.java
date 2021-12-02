package com.poo.gdois.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImagemImovelDto {

    private Long id;

    private Long idImovel;

    private String imagemBase64;

}
