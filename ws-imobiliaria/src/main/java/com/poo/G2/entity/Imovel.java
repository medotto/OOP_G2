package com.poo.G2.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "IMOVEL")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Imovel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ENDERECO")
    private String endereco;

    @Column(name = "BAIRRO")
    private String bairro;

    @Column(name = "CIDADE")
    private String cidade;

    @Column(name = "PAIS")
    private String pais;

    @Column(name = "PRECO")
    private Double preco;

    @Column(name = "OWNER")
    private String owner;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "ID_SITUACAO", nullable = false)
    private SituacaoImovel situacao;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "ID_PROPRIETARIO", nullable = false)
    private Proprietario proprietario;

    @Column(name = "FL_FINANCIADO")
    private String flFinanciado;

    @Column(name = "FL_PROPRIETARIO")
    private String flProprietario;

    @Column(name = "FL_NEGOCIACAO")
    private String flNegociacao;

    @Column(name = "DT_CADASTRO")
    private LocalDateTime dtCadastro;

    @Column(name = "DT_ALTERACAO")
    private LocalDateTime dtAlteracao;

}