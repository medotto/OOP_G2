package com.poo.gdois.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "IMOVEL")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Audited
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

    @OneToMany(mappedBy = "idImovel", cascade = CascadeType.REMOVE)
    @NotAudited
    private List<ImagemImovel> imagemImovelList;

    @Column(name = "FL_FINANCIADO")
    private String flFinanciado;

    @Column(name = "FL_PROPRIETARIO")
    private String flProprietario;

    @Column(name = "FL_NEGOCIACAO")
    private String flNegociacao;

    @Column(name = "DT_CADASTRO")
    @NotAudited
    private LocalDateTime dtCadastro;

    @Column(name = "DT_ALTERACAO")
    @NotAudited
    private LocalDateTime dtAlteracao;

    @Column(name = "FL_INATIVO")
    @NotAudited
    private String flInativo;

    @Column(name = "OPERADOR")
    private String operador;

}