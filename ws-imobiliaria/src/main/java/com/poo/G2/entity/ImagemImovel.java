package com.poo.G2.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "IMAGEM_IMOVEL")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImagemImovel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "BLOB_IMAGEM")
    private byte[] blobImagem;

    @Column(name = "ID_IMOVEL")
    private Long idImovel;

}
