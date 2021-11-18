package com.poo.gdois.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImovelDto {

    private Long id;

    @NotBlank(message = "O campo 'endereco' é requerido.")
    private String endereco;

    @NotBlank(message = "O campo 'bairro' é requerido.")
    private String bairro;

    @NotBlank(message = "O campo 'cidade' é requerido.")
    private String cidade;

    @NotBlank(message = "O campo 'pais' é requerido.")
    private String pais;

    @NotNull(message = "O campo 'preco' é requerido.")
    @PositiveOrZero(message = "O campo 'preco' precisa ter valor positivo ou zero.")
    private Double preco;

    @NotBlank(message = "O campo 'owner' é requerido.")
    private String owner;

    @NotNull(message = "O campo 'situacao' é requerido.")
    private SituacaoImovelDto situacao;

    @NotNull(message = "O campo 'proprietario' é requerido.")
    private ProprietarioDto proprietario;

    @NotBlank(message = "O campo 'flFinanciado' é requerido.")
    private String flFinanciado;

    @NotBlank(message = "O campo 'flProprietario' é requerido.")
    private String flProprietario;

    @NotBlank(message = "O campo 'flNegociacao' é requerido.")
    private String flNegociacao;

    private List<ImagemImovelDto> imagemImovelDtoList;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime dtCadastro;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime dtAlteracao;

    private String flInativo;

}
