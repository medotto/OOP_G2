package com.poo.gdois.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.envers.Audited;

import javax.persistence.*;

@Entity
@Table(name = "SITUACAO_IMOVEL")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Audited
public class SituacaoImovel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "SITUACAO")
    private String situacao;

}
