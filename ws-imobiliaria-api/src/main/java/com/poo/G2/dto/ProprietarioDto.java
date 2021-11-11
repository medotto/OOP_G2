package com.poo.G2.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProprietarioDto {

    private Long id;

    @NotBlank(message = "O campo 'nome' é requerido.")
    private String nome;

    @NotBlank(message = "O campo 'email' é requerido")
    @Email(message = "O campo 'email' está com um formato inválido.")
    private String email;

    @NotBlank(message = "O campo 'telefone' é requerido.")
    @Size(min = 11, max = 11, message = "O campo 'telefone' deve ter 11 dígitos.")
    private String telefone;

}
