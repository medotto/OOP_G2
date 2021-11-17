package com.poo.gdois.resource;

import com.poo.gdois.dto.SituacaoImovelDto;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping(path = "/situacoes", produces = MediaType.APPLICATION_JSON_VALUE)
public interface SituacaoImovelController {

    @GetMapping
    ResponseEntity<List<SituacaoImovelDto>> findAll();

}
