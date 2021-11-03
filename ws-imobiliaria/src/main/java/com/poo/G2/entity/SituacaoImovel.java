package com.poo.G2.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.envers.Audited;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "SITUACAO_IMOVEL")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Audited
public class SituacaoImovel {

    @Id
    private Long id;

    @Column(name = "SITUACAO")
    private String situacao;

}
